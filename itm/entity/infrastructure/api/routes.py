from pydantic import BaseModel
from fastapi import APIRouter

from itm.entity.application import CreateEntity
from itm.shared.http import BadRequest
from itm.entity.domain.errors import EntityError

router = APIRouter()


class CreateEntityRequest(BaseModel):
    name: str = None
    website: str = None


@router.post('/')
def create(item: CreateEntityRequest):
    command = CreateEntity(item)

    try:
        entity = command.execute()
    except EntityError as error:
        raise BadRequest(error.code)
    else:
        return entity
