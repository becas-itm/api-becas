from itm.documents import Scholarship
from itm.publishing.domain.scholarship import State, \
    FillStatus, \
    PendingEdited, \
    ScholarshipApproved, \
    ScholarshipDenied, \
    ScholarshipCreated

from itm.shared.utils.countries import get_country_name


class UpdateDraft:
    @staticmethod
    def handle(event: PendingEdited):
        scholarship = Scholarship.get(event.scholarship_id)

        fields = event.fields.copy()
        fields['fillStatus'] = UpdateDraft._fill_status(event.is_complete)
        fields['country'] = UpdateDraft._country(fields.pop('country'))

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
        fields['country'] = UpdateDraft._country(fields.pop('country'))
        fields['createdAt'] = event.timestamp
        Scholarship.create(fields)


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
