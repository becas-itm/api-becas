import pytest

from itm.publishing.domain.scholarship import Name


def test_name_should_be_a_string():
    invalid_name = False
    with pytest.raises(TypeError):
        Name(invalid_name)


def test_name_should_not_be_empty():
    empty_string = ''
    with pytest.raises(ValueError):
        Name(empty_string)


def test_max_characters():
    assert Name.MAX_CHARACTERS == 250


def test_name_longer_than_max_characters_should_throw():
    name = '_' * (Name.MAX_CHARACTERS + 1)
    with pytest.raises(ValueError) as exception:
        Name(name)

    assert f'up to {Name.MAX_CHARACTERS}' in str(exception)


def test_factory_method_should_return_an_instance():
    name = Name('foo')
    assert isinstance(name, Name)


def test_name_should_be_stored():
    assert Name('foo').value == 'foo'
    assert Name('bar').value == 'bar'
