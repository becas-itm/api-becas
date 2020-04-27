from pydantic import BaseModel
from itm.publishing.domain.scholarship import Scholarship


class ApproveScholarship:
    def __init__(self, repository, id):
        self.repository = repository
        self.id = id

    def execute(self):
        return self.repository \
            .get_by_id(self.id) \
            .approve()


class DenyScholarship:
    def __init__(self, repository, id, reason):
        self.repository = repository
        self.id = id
        self.reason = reason

    def execute(self):
        return self.repository \
            .get_by_id(self.id) \
            .deny(self.reason)


class CreateScholarshipRequest(BaseModel):
    name: str = None
    description: str = None
    deadline: str = None
    academicLevel: str = None
    fundingType: str = None
    country: str = None
    language: str = None


class CreateScholarship:
    def __init__(self, fields):
        self.fields = fields

    def execute(self):
        return Scholarship.create(self.fields)


class EditDraft:
    def __init__(self, repository, id, fields):
        self.repository = repository
        self.id = id
        self.fields = fields

    def execute(self):
        return self.repository \
            .get_by_id(self.id) \
            .edit_draft(self.fields)
