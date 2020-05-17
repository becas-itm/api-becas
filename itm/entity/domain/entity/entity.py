from slugify import slugify

from itm.shared.domain.string import StringValueObject


class EntityName(StringValueObject):
    MAX_CHARACTERS = 100

    @property
    def code(self):
        return slugify(self.value)
