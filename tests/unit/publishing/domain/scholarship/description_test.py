import pytest

from itm.publishing.domain.scholarship import Description


def test_description_should_be_a_string():
    invalid_description = None
    with pytest.raises(TypeError):
        Description(invalid_description)


def test_description_should_not_be_empty():
    empty_string = ''
    with pytest.raises(ValueError):
        Description(empty_string)


def test_max_characters():
    assert Description.MAX_CHARACTERS == 500


def test_description_longer_than_max_characters_should_throw():
    description = '_' * (Description.MAX_CHARACTERS + 1)
    with pytest.raises(ValueError) as exception:
        Description(description)

    assert f'up to {Description.MAX_CHARACTERS}' in str(exception)


def test_factory_method_should_return_an_instance():
    description = Description('foo')
    assert isinstance(description, Description)


def test_description_should_be_stored():
    assert Description('foo').value == 'foo'
    assert Description('bar').value == 'bar'
