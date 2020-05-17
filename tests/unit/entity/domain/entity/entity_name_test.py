import pytest

from itm.entity.domain.entity import EntityName


def test_name_should_be_a_string():
    invalid_name = False
    with pytest.raises(TypeError):
        EntityName(invalid_name)


def test_name_should_not_be_empty():
    empty_string = ''
    with pytest.raises(ValueError):
        EntityName(empty_string)


def test_max_characters():
    assert EntityName.MAX_CHARACTERS == 100


def test_name_longer_than_max_characters_should_throw():
    name = '_' * (EntityName.MAX_CHARACTERS + 1)
    with pytest.raises(ValueError) as exception:
        EntityName(name)

    assert f'up to {EntityName.MAX_CHARACTERS}' in str(exception)


@pytest.mark.parametrize('name,code', [
    ['foo bar', 'foo-bar'],
    ['foo.bar', 'foo-bar'],
    ['  FOO    bAr  ', 'foo-bar'],
])
def test_entity_code_should_be_slugify(name, code):
    assert EntityName(name).code == code
