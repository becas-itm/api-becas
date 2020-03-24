from itm.documents import Scholarship
from itm.publishing.domain.scholarship import State, \
    FillStatus, \
    PendingEdited, \
    ScholarshipApproved, \
    ScholarshipDenied

from itm.shared.utils.countries import get_country_name


class UpdateDraft:
    @classmethod
    def handle(cls, event: PendingEdited):
        scholarship = Scholarship.get(event.scholarship_id)

        fields = event.fields.copy()
        fields['fillStatus'] = UpdateDraft._fill_status(event.is_complete)
        fields['country'] = UpdateDraft._country(fields.pop('country'))

        scholarship.update(refresh=True, **fields)

    @classmethod
    def _fill_status(cls, is_complete):
        return FillStatus.COMPLETE.value if is_complete else FillStatus.INCOMPLETE.value

    @classmethod
    def _country(cls, code):
        return {
            'code': code,
            'name': get_country_name(code),
        }


class PublishScholarshipOnApproved:
    @classmethod
    def handle(cls, event: ScholarshipApproved):
        scholarship = Scholarship.get(event.scholarship_id)

        scholarship.update(
            refresh=True,
            state=State.PUBLISHED.value,
            approval={'approvedAt': event.timestamp},
        )


class ArchiveScholarshipOnDenied:
    @classmethod
    def handle(cls, event: ScholarshipDenied):
        scholarship = Scholarship.get(event.scholarship_id)

        scholarship.update(
            refresh=True,
            state=State.DENIED.value,
            denial={
                'reason': event.reason,
                'deniedAt': event.timestamp,
            },
        )
