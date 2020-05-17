from itm.entity.domain.service import EntityService


class CreateEntity:
    def __init__(self, fields):
        self.fields = fields

    def execute(self):
        return EntityService.create(self.fields)
