from itm.publishing.domain.scholarship import IncompleteError, StateError, ExpiredError


def test_incomplete_error():
    exception = IncompleteError('foo')
    assert exception.scholarship_id == 'foo'
    assert exception.code == 'SCHOLARSHIP_INCOMPLETE'


def test_state_error():
    exception = StateError('bar')
    assert exception.scholarship_id == 'bar'
    assert exception.code == 'SCHOLARSHIP_STATE'


def test_expired_error():
    exception = ExpiredError('baz')
    assert exception.scholarship_id == 'baz'
    assert exception.code == 'SCHOLARSHIP_EXPIRED'
