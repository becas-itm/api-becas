from itm.shared.domain.errors import EntityNotFoundError

from ..entity import EntityName, EntityWebsite
from ..entity.errors import DuplicateNameError
from ..entity.events import EntityUpdated


class EntityService:
    def __init__(self, document):
        self.document = document

    def create(self, name=None, website=None):
        name = EntityName(name)
        website = EntityWebsite(website)

        self._check_unique_code(name)

        item = self.document.create({
            'code': name.code,
            'name': name.value,
            'website': website.value,
        })

        return {
            'code': item.code,
            'name': item.name,
            'website': item.website,
        }

    def update(self, entity_code=None, name=None, website=None):
        name = EntityName(name)
        website = EntityWebsite(website)

        if entity_code != name.code:
            self._check_unique_code(name)

        old_entity = self.document.get(entity_code, ignore=404)

        if not old_entity:
            raise EntityNotFoundError

        return EntityUpdated.fire(entity_code, name.code, name.value, website)

    def _check_unique_code(self, name):
        if self.document.exists(name.code):
            raise DuplicateNameError(name.value)
