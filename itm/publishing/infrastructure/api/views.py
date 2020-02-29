import json

from django.views.decorators.http import require_POST
from django.http import Http404, HttpResponse, HttpResponseForbidden

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import NotFound, PermissionDenied

from itm.documents import Scholarship
from itm.publishing import application as app
from itm.publishing.infrastructure import repository
from itm.shared.domain.errors import EntityNotFoundError
from itm.publishing.domain.scholarship import ScholarshipError


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


@require_POST
def deny(request, scholarship_id):
    data = json.loads(request.body)

    if 'reason' not in data:
        return HttpResponseForbidden('Denial reason required')

    command = app.DenyScholarship(
        repository.ScholarshipRepository(Scholarship),
        scholarship_id,
        reason=data['reason'],
    )

    try:
        command.execute()
    except EntityNotFoundError:
        raise Http404
    except ScholarshipError as error:
        return HttpResponseForbidden(error.code)
    else:
        return HttpResponse()
