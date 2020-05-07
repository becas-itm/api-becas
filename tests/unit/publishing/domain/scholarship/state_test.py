from itm.publishing.domain.scholarship import State


def test_pending_value():
    assert State.PENDING.value == 'PENDING'


def test_published_value():
    assert State.PUBLISHED.value == 'PUBLISHED'


def test_denied_value():
    assert State.DENIED.value == 'DENIED'


def test_archived_value():
    assert State.ARCHIVED.value == 'ARCHIVED'
