import pytest

from itm.publishing.domain.archive import Id, State, StateError, Scholarship, ScholarshipArchived


@pytest.fixture
def make_scholarship():
    def create_scholarship(id=None, state=State.PUBLISHED):
        return Scholarship(
            id=Id.from_string(id) if id else Id.generate(),
            state=state,
        )

    return create_scholarship


def test_archive_scholarship(make_scholarship):
    scholarship = make_scholarship()
    scholarship.archive()


def test_archive_should_throw_when_already_archived(make_scholarship):
    scholarship = make_scholarship(state=State.ARCHIVED)
    with pytest.raises(StateError):
        scholarship.archive()


def test_archive_should_fire_event(make_scholarship):
    scholarship = make_scholarship()
    event = scholarship.archive()
    assert isinstance(event, ScholarshipArchived)
