from django.views.decorators.http import require_GET
from django.http import JsonResponse, HttpResponseForbidden

from itm.shared.utils import SimplePaginator
from itm.publishing.domain.scholarship import State

from .search import SearchBuilder
from .service import SearchService


@require_GET
def search(request):
    try:
        page = int(request.GET.get('page', 1))
        assert(page >= 1)
    except (ValueError, AssertionError):
        return HttpResponseForbidden('Invalid page')

    paginator = SimplePaginator(page)

    builder = SearchBuilder() \
        .select(['name', 'description', 'deadline', 'spider.name', 'entity.fullName']) \
        .size(paginator.per_page) \
        .skip(paginator.skip) \
        .with_state(State.PUBLISHED.value)

    if 'q' in request.GET:
        builder.add_term(request.GET['q'])

    return JsonResponse(paginator.paginate(SearchService.execute(builder)))
