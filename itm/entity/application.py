class CreateEntity:
    def __init__(self, entity_service, fields):
        self.entity_service = entity_service
        self.fields = fields

    def execute(self):
        return self.entity_service.create(self.fields.name, self.fields.website)


class UpdateEntity:
    def __init__(self, entity_service, fields):
        self.entity_service = entity_service
        self.fields = fields

    def execute(self):
        return self.entity_service \
            .update(self.fields.entity_code, self.fields.name, self.fields.website)
