from pydantic import BaseModel
from fastapi import APIRouter, Query, status

from itm.documents import Scholarship

from itm.publishing.domain.scholarship import State, ScholarshipError
from itm.publishing.infrastructure.repository import ScholarshipRepository
from itm.publishing.application import ApproveScholarship, DenyScholarship, EditDraft, \
    CreateScholarship, CreateScholarshipRequest, ArchiveScholarship, RestoreScholarship

from itm.search.search import SearchBuilder
from itm.search.service import SearchService

from itm.shared.utils import SimplePaginator
from itm.shared.http import NotFound, Forbidden, BadRequest
from itm.shared.domain.errors import EntityNotFoundError

from ..projections import UpdateDraft, PublishScholarshipOnApproved, ArchiveScholarshipOnDenied,\
    StoreScholarshipOnCreated, UpdateScholarshipOnArchived, UpdateScholarshipOnRestored

router = APIRouter()


@router.get('/')
def search(page: int = Query(1, ge=1), state: str = State.PENDING.value):
    paginator = SimplePaginator(page)

    builder = SearchBuilder() \
        .size(paginator.per_page) \
        .skip(paginator.skip) \
        .with_state(state) \
        .select([
            'name',
            'deadline',
            'entity.name',
            'entity.fullName',
            'fillStatus',
            'archive.archivedAt',
            'denial.deniedAt',
            'denial.reason',
        ])

    return paginator.paginate(SearchService.execute(builder))


@router.get('/{scholarship_id}/')
def pending_detail(scholarship_id):
    scholarship = Scholarship.get(
        id=scholarship_id,
        ignore=NotFound.code,
        _source=[
            'name',
            'description',
            'deadline',
            'fundingType',
            'state',
            'academicLevel',
            'entity.fullName',
            'entity.name',
            'country.name',
            'country.code',
            'sourceDetails.url',
            'sourceDetails.id',
            'fillStatus',
            'language',
        ],
    )

    if not scholarship:
        raise NotFound

    if scholarship['state'] != State.PENDING.value:
        raise Forbidden
    else:
        del scholarship['state']

    return scholarship.serialize()


@router.post('/{scholarship_id}/approve/', status_code=status.HTTP_204_NO_CONTENT)
def approve(scholarship_id):
    command = ApproveScholarship(
        ScholarshipRepository(Scholarship),
        scholarship_id,
    )

    try:
        event = command.execute()
    except EntityNotFoundError:
        raise NotFound
    except ScholarshipError as error:
        raise Forbidden(error.code)
    else:
        PublishScholarshipOnApproved.handle(event)


class DenyItem(BaseModel):
    reason: str


@router.post('/{scholarship_id}/deny/', status_code=status.HTTP_204_NO_CONTENT)
def deny(scholarship_id, data: DenyItem):
    command = DenyScholarship(
        ScholarshipRepository(Scholarship),
        scholarship_id,
        data.reason,
    )

    try:
        event = command.execute()
    except EntityNotFoundError:
        raise NotFound
    except ScholarshipError as error:
        raise Forbidden(error.code)
    else:
        ArchiveScholarshipOnDenied.handle(event)


@router.post('/')
def create(item: CreateScholarshipRequest):
    command = CreateScholarship(item)

    try:
        event = command.execute()
    except ScholarshipError as error:
        raise BadRequest(error.code)
    else:
        scholarship_id = StoreScholarshipOnCreated.handle(event)
        return {'id': scholarship_id}


class UpdateItem(BaseModel):
    name: str = None
    description: str = None
    deadline: str = None
    academicLevel: str = None
    fundingType: str = None
    country: str = None
    language: str = None


@router.put('/{scholarship_id}/', status_code=status.HTTP_204_NO_CONTENT)
def edit(scholarship_id, data: UpdateItem):
    if data.fundingType == '*':
        del data.fundingType

    if data.academicLevel == '*':
        del data.academicLevel

    if data.country == '*':
        del data.country

    command = EditDraft(
        ScholarshipRepository(Scholarship),
        scholarship_id,
        data.dict(),
    )

    try:
        event = command.execute()
    except EntityNotFoundError:
        raise NotFound
    except ScholarshipError as error:
        raise Forbidden(error.code)
    else:
        UpdateDraft.handle(event)


@router.post('/{scholarship_id}/archive/', status_code=status.HTTP_204_NO_CONTENT)
def archive(scholarship_id):
    command = ArchiveScholarship(
        ScholarshipRepository(Scholarship),
        scholarship_id,
    )

    try:
        event = command.execute()
    except EntityNotFoundError:
        raise NotFound
    except ScholarshipError as error:
        raise Forbidden(error.code)
    else:
        UpdateScholarshipOnArchived.handle(event)


@router.post('/{scholarship_id}/restore/', status_code=status.HTTP_204_NO_CONTENT)
def restore(scholarship_id):
    command = RestoreScholarship(
        ScholarshipRepository(Scholarship),
        scholarship_id,
    )

    try:
        event = command.execute()
    except EntityNotFoundError:
        raise NotFound
    except ScholarshipError as error:
        raise Forbidden(error.code)
    else:
        UpdateScholarshipOnRestored.handle(event)
