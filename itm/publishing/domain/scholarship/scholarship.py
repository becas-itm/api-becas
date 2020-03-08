import enum
import uuid
import datetime

from .events import ScholarshipApproved, ScholarshipDenied
from .errors import IncompleteError, StateError, ExpiredError


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
    ):
        self.id = id
        self.name = name
        self.description = description
        self.state = state
        self.deadline = deadline
        self.academic_level = academic_level
        self.country = country
        self.funding_type = funding_type

    def approve(self):
        self._check_for_approval()
        self.state = State.PUBLISHED
        return ScholarshipApproved.fire(self.id)

    def _check_for_approval(self):
        if not self.is_complete:
            raise IncompleteError(self.id)

        if not self.is_pending:
            raise StateError(self.id)

        if self.has_passed:
            raise ExpiredError(self.id)

    @property
    def is_complete(self):
        fields = [self.description, self.academic_level, self.country, self.funding_type]
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
        return ScholarshipDenied.fire(self.id, DenialReason(reason))

    @classmethod
    def from_document(cls, document):
        return Scholarship(
            Id.from_string(document.id),
            name=Name(document.name),
            description=Description(document.description) if 'description' in document else None,
            state=State(document.state),
            deadline=Date(document.deadline.date()) if 'deadline' in document else None,
            academic_level=AcademicLevel(
                document.academicLevel) if 'academicLevel' in document else None,
            country=Country(document.country.code) if 'country' in document else None,
            funding_type=FundingType(document.fundingType) if 'fundingType' in document else None,
        )


@enum.unique
class State(enum.Enum):
    PENDING = 'PENDING'

    PUBLISHED = 'PUBLISHED'

    DENIED = 'DENIED'


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
class AcademicLevel(enum.Enum):
    UNDERGRADUATE = 'UNDERGRADUATE'

    POSTGRADUATE = 'POSTGRADUATE'

    OTHERS = 'OTHERS'


class Country(StringValueObject):
    MAX_CHARACTERS = 3


@enum.unique
class FundingType(enum.Enum):
    COMPLETE = 'COMPLETE'

    PARTIAL = 'PARTIAL'
