from pydantic import BaseModel
from fastapi import APIRouter

from itm.entity.application import CreateEntity
from itm.shared.http import BadRequest

from itm.documents import Entity
from itm.entity.domain.service import EntityService
from itm.entity.domain.entity.errors import EntityError

router = APIRouter()


class CreateEntityRequest(BaseModel):
    name: str = None
    website: str = None


@router.post('/')
def create(item: CreateEntityRequest):
    command = CreateEntity(EntityService(Entity), item)

    try:
        entity = command.execute()
    except EntityError as error:
        raise BadRequest(error.code)
    else:
        return entity
