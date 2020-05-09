from ..scholarship import State, StateError

from .events import ScholarshipArchived, ScholarshipRestored


class Scholarship:
    def __init__(self, id, state):
        self.id = id
        self.state = state

    def archive(self):
        if self.state == State.ARCHIVED:
            raise StateError(self.id)

        return ScholarshipArchived.fire(self.id.value)

    def restore(self):
        if self.state == State.PUBLISHED or self.state == State.PENDING:
            raise StateError(self.id)

        return ScholarshipRestored.fire(self.id.value)
