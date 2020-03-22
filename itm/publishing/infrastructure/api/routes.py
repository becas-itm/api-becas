from fastapi import APIRouter
from pydantic import BaseModel

from itm.documents import Scholarship

from itm.publishing.domain.scholarship import State, ScholarshipError
from itm.publishing.infrastructure.repository import ScholarshipRepository
from itm.publishing.application import ApproveScholarship, DenyScholarship

from itm.search.search import SearchBuilder
from itm.search.service import SearchService

from itm.shared.utils import SimplePaginator
from itm.shared.http import NotFound, Forbidden
from itm.shared.domain.errors import EntityNotFoundError

router = APIRouter()


@router.get('/')
def list_pendings(page: int = 1):
    assert(page >= 1)

    paginator = SimplePaginator(page)

    builder = SearchBuilder() \
        .size(paginator._per_page) \
        .skip(paginator.skip) \
        .with_state(State.PENDING.value) \
        .select(['name', 'deadline', 'spider.name', 'entity.fullName', 'fillStatus'])

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
            'spider.name',
            'country.name',
            'country.code',
            'sourceDetails.url',
            'sourceDetails.id',
            'fillStatus',
        ],
    )

    if not scholarship:
        raise NotFound

    if scholarship['state'] != State.PENDING.value:
        raise Forbidden
    else:
        del scholarship['state']

    return scholarship.serialize()


@router.post('/{scholarship_id}/approve/')
def approve(scholarship_id):
    command = ApproveScholarship(
        ScholarshipRepository(Scholarship),
        scholarship_id,
    )

    try:
        command.execute()
    except EntityNotFoundError:
        raise NotFound
    except ScholarshipError as error:
        raise Forbidden(error.code)


class DenyItem(BaseModel):
    reason: str


@router.post('/{scholarship_id}/deny/')
def deny(scholarship_id, data: DenyItem):
    command = DenyScholarship(
        ScholarshipRepository(Scholarship),
        scholarship_id,
        data.reason,
    )

    try:
        command.execute()
    except EntityNotFoundError:
        raise NotFound
    except ScholarshipError as error:
        raise Forbidden(error.code)
