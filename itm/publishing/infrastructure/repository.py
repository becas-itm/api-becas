from itm.publishing.domain import scholarship

from itm.publishing.domain.archive import Scholarship as ScholarshipArchive

from itm.shared.domain.errors import EntityNotFoundError


class ScholarshipRepository:
    def __init__(self, document):
        self.document = document

    def get_by_id(self, scholarship_id):
        document = self.document.get(
            id=scholarship_id,
            ignore=404,
            _source=[
                'name',
                'description',
                'state',
                'deadline',
                'academicLevel',
                'country.code',
                'fundingType',
                'language',
            ],
        )

        if not document:
            raise EntityNotFoundError

        return scholarship.Scholarship.from_document(document)

    def get_by_id_for_archive(self, scholarship_id):
        document = self.document.get(
            id=scholarship_id,
            ignore=404,
            _source=['state'],
        )

        if not document:
            raise EntityNotFoundError

        return ScholarshipArchive(
            scholarship.Id.from_string(scholarship_id),
            scholarship.State(document.state),
        )
