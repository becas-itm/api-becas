import pytest

from itm.documents import Entity


@pytest.fixture(autouse=True)
def scholarships_index():
    Entity.init()


def test_create_entity(api):
    entity = {
        'name': 'entity name',
        'website': 'http://entity-name.com',
    }
    response = api.post('/api/entities/', json=entity)
    assert response.status_code == 200
    assert response.json() == {
        'name': entity['name'],
        'website': entity['website'],
        'code': 'entity-name',
    }


def test_create_duplicate_entity_should_throw(api):
    entity = {
        'name': 'entity name',
        'website': 'http://entity-name.com',
    }
    api.post('/api/entities/', json=entity)

    response = api.post('/api/entities/', json=entity)
    assert response.status_code == 400


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
