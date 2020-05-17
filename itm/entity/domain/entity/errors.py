from itm.shared.domain.errors import DomainError


class EntityError(DomainError):
    def __init__(self, entity_name):
        self.entity_name = entity_name
        self.code = self.CODE


class DuplicateNameError(EntityError):
    CODE = 'DUPLICATE_NAME'
