from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import NotFound, PermissionDenied

from itm.documents import Scholarship

from itm.publishing import application as app
from itm.publishing.infrastructure import repository
from itm.publishing.domain.scholarship import ScholarshipError, State

from itm.shared.utils import SimplePaginator
from itm.shared.domain.errors import EntityNotFoundError

from itm.search.search import SearchBuilder
from itm.search.service import SearchService


@api_view(['POST'])
def approve(request, scholarship_id):
    command = app.ApproveScholarship(
        repository.ScholarshipRepository(Scholarship),
        scholarship_id,
    )

    try:
        command.execute()
    except EntityNotFoundError:
        raise NotFound
    except ScholarshipError as error:
        raise PermissionDenied(error.code)
    else:
        return Response()


@api_view(['POST'])
def deny(request, scholarship_id):
    if 'reason' not in request.data:
        raise PermissionDenied('Denial reason required')

    command = app.DenyScholarship(
        repository.ScholarshipRepository(Scholarship),
        scholarship_id,
        reason=request.data['reason'],
    )

    try:
        command.execute()
    except EntityNotFoundError:
        raise NotFound
    except ScholarshipError as error:
        raise PermissionDenied(error.code)
    else:
        return Response()


@api_view(['GET'])
def list_pendings(request):
    try:
        page = int(request.query_params.get('page', 1))
        assert(page >= 1)
    except (ValueError, AssertionError):
        raise PermissionDenied('Invalid page number')

    paginator = SimplePaginator(page)

    builder = SearchBuilder() \
        .select(['name', 'deadline', 'spider.name', 'entity.fullName', 'fillStatus']) \
        .size(paginator.per_page) \
        .skip(paginator.skip) \
        .with_state(State.PENDING.value)

    return Response(paginator.paginate(SearchService.execute(builder)))
