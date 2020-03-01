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
