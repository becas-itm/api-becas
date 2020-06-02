from pydantic import BaseModel
from fastapi import APIRouter

from itm.entity.application import CreateEntity, UpdateEntity
from itm.shared.http import BadRequest, NotFound
from itm.shared.domain.errors import EntityNotFoundError
from itm.publishing.infrastructure.projections import UpdateScholarshipsOnEntityEdited
from itm.documents import Entity
from itm.entity.domain.service import EntityService
from itm.entity.domain.entity.errors import EntityError

from ..projections import UpdateEntityOnEdit

router = APIRouter()


@router.get('/')
def list_entities():
    def format_entity(entity):
        return {
            'name': entity.name,
            'code': entity.code,
            'website': entity.website,
        }

    entities = Entity.search() \
        .query() \
        .source(['name', 'code', 'website']) \
        .scan()
    return list(map(format_entity, entities))


class EntityRequest(BaseModel):
    name: str = None
    website: str = None


@router.post('/')
def create(item: EntityRequest):
    command = CreateEntity(EntityService(Entity), item)

    try:
        entity = command.execute()
    except EntityError as error:
        raise BadRequest(error.code)
    else:
        return entity


class EditEntityRequest(BaseModel):
    name: str = None
    website: str = None
    entity_code: str = ''


@router.put('/{entity_code}/')
def edit_entity(entity_code, item: EditEntityRequest):
    item.entity_code = entity_code
    command = UpdateEntity(EntityService(Entity), item)

    try:
        event = command.execute()
    except EntityError as error:
        raise BadRequest(error.code)
    except EntityNotFoundError:
        raise NotFound
    else:
        new_entity = UpdateEntityOnEdit.handle(event)
        UpdateScholarshipsOnEntityEdited.handle(event)

        return new_entity
