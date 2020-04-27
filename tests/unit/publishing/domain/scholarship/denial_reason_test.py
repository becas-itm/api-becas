import pytest

from itm.publishing.domain.scholarship import DenialReason


def test_reason_should_be_a_string():
    invalid_reason = False
    with pytest.raises(TypeError):
        DenialReason(invalid_reason)


def test_reason_should_not_be_empty():
    empty_string = ''
    with pytest.raises(ValueError):
        DenialReason(empty_string)


def test_max_characters():
    assert DenialReason.MAX_CHARACTERS == 120


def test_reason_longer_than_max_characters_should_throw():
    reason = '_' * (DenialReason.MAX_CHARACTERS + 1)
    with pytest.raises(ValueError) as exception:
        DenialReason(reason)

    assert f'up to {DenialReason.MAX_CHARACTERS}' in str(exception)


def test_factory_method_should_return_an_instance():
    reason = DenialReason('foo')
    assert isinstance(reason, DenialReason)


def test_reason_should_be_stored():
    assert DenialReason('foo').value == 'foo'
    assert DenialReason('bar').value == 'bar'
