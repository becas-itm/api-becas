from typing import List

from fastapi import Query, APIRouter

from itm.documents import Scholarship
from itm.publishing.domain.scholarship import State, AcademicLevel, FundingType

from itm.shared.utils import SimplePaginator
from itm.shared.http import NotFound, Forbidden

from .search import SearchBuilder
from .service import SearchService


router = APIRouter()


@router.get('/')
def index(page: int = Query(1, ge=1),
          term: str = '',
          country: str = '',
          language: str = '',
          academicLevel: List[AcademicLevel] = Query([]),
          fundingType: List[FundingType] = Query([]),
          ):
    paginator = SimplePaginator(page)

    builder = SearchBuilder() \
        .add_term(term) \
        .with_country(country) \
        .with_language(language) \
        .with_state(State.PUBLISHED.value) \
        .size(paginator.per_page) \
        .skip(paginator.skip) \
        .select(['name', 'description', 'deadline', 'entity.fullName', 'entity.code'])

    if len(academicLevel) > 0:
        builder.with_academic_level(academicLevel)

    if len(fundingType) > 0:
        builder.with_funding_type(fundingType)

    return paginator.paginate(SearchService.execute(builder))


@router.get('/{scholarship_id}/')
def show(scholarship_id):
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
            'entity.code',
            'entity.fullName',
            'country.name',
            'country.code',
            'sourceDetails.url',
            'sourceDetails.steps',
        ],
    )

    if not scholarship:
        raise NotFound

    if scholarship['state'] != State.PUBLISHED.value:
        raise Forbidden
    else:
        del scholarship['state']

    return scholarship.serialize()
