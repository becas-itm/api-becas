import enum
import uuid
import datetime

from .errors import IncompleteError, StateError, ExpiredError
from .events import ScholarshipApproved, ScholarshipDenied, PendingEdited, ScholarshipCreated


class Scholarship:
    def __init__(
        self,
        id,
        name,
        description=None,
        state=None,
        deadline=None,
        academic_level=None,
        country=None,
        funding_type=None,
        language=None,
    ):
        self.id = id
        self.name = name
        self.description = description
        self.state = state
        self.deadline = deadline
        self.academic_level = academic_level
        self.country = country
        self.funding_type = funding_type
        self.language = language

    def approve(self):
        self._check_for_approval()
        self.state = State.PUBLISHED
        return ScholarshipApproved.fire(self.id.value)

    def _check_for_approval(self):
        if not self.is_complete:
            raise IncompleteError(self.id)

        if not self.is_pending:
            raise StateError(self.id)

        if self.has_passed:
            raise ExpiredError(self.id)

    @property
    def is_complete(self):
        fields = [self.description, self.academic_level,
                  self.country, self.funding_type, self.language]
        for field in fields:
            if field is None:
                return False

        return True

    @property
    def is_pending(self):
        return self.state == State.PENDING

    @property
    def has_passed(self):
        return self.deadline and self.deadline.has_passed()

    def deny(self, reason):
        if not self.is_pending:
            raise StateError(self.id)

        self.state = State.DENIED
        return ScholarshipDenied.fire(self.id.value, DenialReason(reason).value)

    @classmethod
    def create(cls, data):
        scholarship = cls(
            Id.generate(),
            name=Name(data.name) if data.name else None,
            description=Description(data.description) if data.description else None,
            state=State.PENDING,
            deadline=Date.from_string(data.deadline) if data.deadline else None,
            academic_level=AcademicLevel(data.academicLevel) if data.academicLevel else None,
            country=Country(data.country) if data.country else None,
            funding_type=FundingType(data.fundingType) if data.fundingType else None,
            language=Language(data.language) if data.language else None,
        )

        if scholarship.has_passed:
            raise ExpiredError(scholarship.id)

        fields = {
            'id': scholarship.id.value,
            'state': scholarship.state.value,
        }

        if scholarship.name:
            fields['name'] = scholarship.name.value

        if scholarship.description:
            fields['description'] = scholarship.description.value

        if scholarship.deadline:
            fields['deadline'] = scholarship.deadline.value

        if scholarship.academic_level:
            fields['academicLevel'] = scholarship.academic_level.value

        if scholarship.funding_type:
            fields['fundingType'] = scholarship.funding_type.value

        if scholarship.country:
            fields['country'] = scholarship.country.value

        if scholarship.language:
            fields['language'] = scholarship.language.value

        return ScholarshipCreated.fire(fields, scholarship.is_complete)

    def edit_draft(self, fields):
        if self.state != State.PENDING:
            raise StateError(self.id)

        if 'name' in fields:
            self.name = Name(fields['name'])

        if 'description' in fields:
            self.description = Description(fields['description'])

        if 'deadline' in fields:
            self.deadline = Date.from_string(fields['deadline'])

        if 'academicLevel' in fields:
            self.academic_level = AcademicLevel(fields['academicLevel'])

        if 'country' in fields:
            self.country = Country(fields['country'])

        if 'fundingType' in fields:
            self.funding_type = FundingType(fields['fundingType'])

        if 'language' in fields:
            self.language = Language(fields['language'])

        return PendingEdited.fire(scholarship_id=self.id.value,
                                  is_complete=self.is_complete,
                                  fields=fields)

    @classmethod
    def from_document(cls, doc):
        return cls(
            Id.from_string(doc['id'] if 'id' in doc else doc.id),
            name=Name(doc['name']),
            description=Description(doc['description']) if 'description' in doc else None,
            state=State(doc['state']),
            deadline=Date(doc['deadline'].date()) if 'deadline' in doc else None,
            academic_level=AcademicLevel(doc['academicLevel']) if 'academicLevel' in doc else None,
            country=Country(doc['country']['code']) if 'country' in doc else None,
            funding_type=FundingType(doc['fundingType']) if 'fundingType' in doc else None,
            language=Language(doc['language']) if 'language' in doc else None,
        )


@enum.unique
class State(str, enum.Enum):
    PENDING = 'PENDING'

    PUBLISHED = 'PUBLISHED'

    DENIED = 'DENIED'

    ARCHIVED = 'ARCHIVED'


class Id:
    UUID_VERSION = 4

    def __init__(self, value: uuid.UUID):
        if value.version != Id.UUID_VERSION:
            raise TypeError(f'{value!r} is not a valid {Id.__name__}')

        self._value = value

    @property
    def value(self):
        return str(self._value)

    @classmethod
    def generate(cls):
        return cls(uuid.uuid4())

    @classmethod
    def from_string(cls, string: str):
        return cls(uuid.UUID(string, version=cls.UUID_VERSION))


class StringValueObject:
    def __init__(self, value: str):
        self._set_value(value)

    @property
    def value(self):
        return self._value

    def _set_value(self, value: str):
        if not isinstance(value, str):
            raise TypeError(f'{value!r} is not a valid {self.__class__.__name__}')

        if value == '':
            raise ValueError(f'{self.__class__.__name__} must not be empty')

        if len(value) > self.MAX_CHARACTERS:
            raise ValueError(f'{self.__class__.__name__} must contain up to '
                             f'{self.MAX_CHARACTERS} characters')

        self._value = value


class Name(StringValueObject):
    MAX_CHARACTERS = 250


class Description(StringValueObject):
    MAX_CHARACTERS = 500


class Date:
    def __init__(self, date: datetime.date):
        self._date = date

    @property
    def value(self):
        return self._date

    def has_passed(self, current_date=datetime.date.today):
        return (current_date() - self._date).days > 0

    @classmethod
    def from_string(cls, string: str):
        if not isinstance(string, str):
            raise TypeError(f'{string!r} is not a valid {cls.__name__}')

        # Parse string with datetime in order to support partial ISO format
        date = datetime.datetime.fromisoformat(string).date()

        return cls(date)


class DenialReason(StringValueObject):
    MAX_CHARACTERS = 120


@enum.unique
class AcademicLevel(str, enum.Enum):
    UNDERGRADUATE = 'UNDERGRADUATE'

    POSTGRADUATE = 'POSTGRADUATE'

    OTHERS = 'OTHERS'

    BOTH = 'BOTH'


class Country(StringValueObject):
    MAX_CHARACTERS = 3


@enum.unique
class FundingType(str, enum.Enum):
    COMPLETE = 'COMPLETE'

    PARTIAL = 'PARTIAL'


@enum.unique
class FillStatus(str, enum.Enum):
    COMPLETE = 'COMPLETE'

    INCOMPLETE = 'INCOMPLETE'


class Language(StringValueObject):
    MAX_CHARACTERS = 2
