from itm.documents import Scholarship
from itm.publishing.domain.scholarship import State, \
    FillStatus, \
    PendingEdited, \
    ScholarshipApproved, \
    ScholarshipDenied, \
    ScholarshipCreated

from itm.publishing.domain.archive import ScholarshipArchived

from itm.shared.utils.countries import get_country_name


class UpdateDraft:
    @staticmethod
    def handle(event: PendingEdited):
        scholarship = Scholarship.get(event.scholarship_id)

        fields = event.fields.copy()
        fields['fillStatus'] = UpdateDraft._fill_status(event.is_complete)
        fields['country'] = UpdateDraft._country(fields.pop('country'))

        if 'steps' in fields:
            if 'sourceDetails' in fields:
                fields['sourceDetails']['steps'] = fields.pop('steps')
            else:
                fields['sourceDetails'] = {'steps': fields.pop('steps')}

        scholarship.update(refresh=True, **fields)

    @staticmethod
    def _fill_status(is_complete):
        return FillStatus.COMPLETE.value if is_complete else FillStatus.INCOMPLETE.value

    @staticmethod
    def _country(code):
        return {
            'code': code,
            'name': get_country_name(code),
        }


class PublishScholarshipOnApproved:
    @staticmethod
    def handle(event: ScholarshipApproved):
        scholarship = Scholarship.get(event.scholarship_id)

        scholarship.update(
            refresh=True,
            state=State.PUBLISHED.value,
            approval={'approvedAt': event.timestamp},
        )


class StoreScholarshipOnCreated:
    @staticmethod
    def handle(event: ScholarshipCreated):
        fields = event.fields.copy()
        fields['entity'] = {
            'name': 'itm',
            'fullName': 'Instituto Tecnológico Metropolitano',
        }
        fields['country'] = UpdateDraft._country(fields.pop('country'))
        fields['fillStatus'] = UpdateDraft._fill_status(event.is_complete)
        fields['createdAt'] = event.timestamp
        Scholarship.create(fields)
        return fields['id']


class ArchiveScholarshipOnDenied:
    @staticmethod
    def handle(event: ScholarshipDenied):
        scholarship = Scholarship.get(event.scholarship_id)

        scholarship.update(
            refresh=True,
            state=State.DENIED.value,
            denial={
                'reason': event.reason,
                'deniedAt': event.timestamp,
            },
        )


class UpdateScholarshipOnArchived:
    @staticmethod
    def handle(event: ScholarshipArchived):
        scholarship = Scholarship.get(event.scholarship_id)

        scholarship.update(
            refresh=True,
            state=State.ARCHIVED.value,
            archive={'archivedAt': event.timestamp},
        )


class UpdateScholarshipOnRestored:
    @staticmethod
    def handle(event: ScholarshipArchived):
        scholarship = Scholarship.get(event.scholarship_id)

        scholarship.update(
            refresh=True,
            state=State.PENDING.value,
            archive={'archivedAt': None},
            denial={
                'reason': None,
                'deniedAt': None,
            },
        )
