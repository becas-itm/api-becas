from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import PermissionDenied

from itm.shared.utils import SimplePaginator
from itm.publishing.domain.scholarship import State

from .search import SearchBuilder
from .service import SearchService


@api_view(['GET'])
def search(request):
    try:
        page = int(request.query_params.get('page', 1))
        assert(page >= 1)
    except (ValueError, AssertionError):
        raise PermissionDenied('Invalid page number')

    paginator = SimplePaginator(page)

    builder = SearchBuilder() \
        .select(['name', 'description', 'deadline', 'spider.name', 'entity.fullName']) \
        .size(paginator.per_page) \
        .skip(paginator.skip) \
        .with_state(State.PUBLISHED.value)

    if 'term' in request.query_params:
        builder.add_term(request.query_params['term'])

    return Response(paginator.paginate(SearchService.execute(builder)))
