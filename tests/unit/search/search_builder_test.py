import pytest

from itm.search.search import SearchBuilder


@pytest.fixture
def search():
    return SearchBuilder()


def test_returns_a_dictionary(search):
    assert isinstance(search.build(), dict)


def test_empty_search(search):
    assert search.build() == {'query': {}}
