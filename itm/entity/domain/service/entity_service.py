from ..entity import EntityName, EntityWebsite
from ..entity.errors import DuplicateNameError


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

    def _check_unique_code(self, name):
        if self.document.exists(name.code):
            raise DuplicateNameError(name.value)
