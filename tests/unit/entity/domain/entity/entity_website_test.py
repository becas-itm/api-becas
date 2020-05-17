import pytest

from itm.entity.domain.entity import EntityWebsite


def test_website_should_be_a_string():
    invalid_website = False
    with pytest.raises(TypeError):
        EntityWebsite(invalid_website)


def test_website_should_not_be_empty():
    empty_string = ''
    with pytest.raises(ValueError):
        EntityWebsite(empty_string)


def test_website_should_a_valid_url():
    with pytest.raises(ValueError):
        EntityWebsite('foo')


def test_valid_url_should_be_stored():
    url = 'http://www.itm.edu.co'
    website = EntityWebsite(url)
    assert website.value == url
