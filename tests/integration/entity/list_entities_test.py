import pytest

from itm.documents import Entity


@pytest.fixture(autouse=True)
def scholarships_index():
    Entity.init()


def test_list_all_entities(api):
    def init_entities():
        entities = [{
            'name': 'foo',
            'code': 'foo',
            'website': 'http://foo.com',
        }, {
            'name': 'bar',
            'code': 'bar',
            'website': 'http://foo.com',
        }]

        for entity in entities:
            Entity.create(entity)

    init_entities()
    response = api.get('/api/entities/')

    assert len(response.json()) == 2
