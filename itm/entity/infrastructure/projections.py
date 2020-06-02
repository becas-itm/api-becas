from itm.entity.domain.entity import EntityUpdated
from itm.documents import Entity


class UpdateEntityOnEdit:
    @staticmethod
    def handle(event: EntityUpdated):
        Entity.get(event.old_code).delete()

        item = Entity.update_entity({
            'code': event.code,
            'name': event.name,
            'website': event.website.value,
        })

        return {
            'code': item.code,
            'name': item.name,
            'website': item.website,
        }
