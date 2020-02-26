from django.views.decorators.http import require_GET
from django.http import JsonResponse


@require_GET
def search(request):
    return JsonResponse({})
