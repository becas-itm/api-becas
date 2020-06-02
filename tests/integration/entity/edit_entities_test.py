import pytest

from itm.documents import Entity, Scholarship
from itm.publishing.domain.scholarship import State
from itm.entity.domain.entity.errors import DuplicateNameError


@pytest.fixture(autouse=True)
def prepare_data(api):
    Entity.init()
    Scholarship.init()

    Scholarship.create({
        'id': 'foo',
        'name': 'foo',
        'createdAt': '2020-01-01',
        'state': State.ARCHIVED.value,
        'entity': {
            'name': 'foo',
            'fullName': 'Foo',
        },
    })

    Scholarship.create({
        'id': 'bar',
        'name': 'bar',
        'createdAt': '2020-01-01',
        'state': State.ARCHIVED.value,
        'entity': {
            'name': 'bar',
            'fullName': 'Bar',
        },
    })

    api.post('/api/entities/', json={
        'name': 'Foo',
        'code': 'foo',
        'website': 'http://foo.com',
    })

    api.post('/api/entities/', json={
        'name': 'Bar',
        'code': 'bar',
        'website': 'http://bar.com',
    })


def test_entity_cant_be_edited(api):
    edited_entity = {
        'name': 'newfoo',
        'website': 'http://new_foo.com',
    }

    foo_scholarship = Scholarship.get('foo')
    assert foo_scholarship.entity.name == 'foo'

    response = api.put('/api/entities/foo/', json=edited_entity)
    assert response.status_code == 200

    assert Scholarship.get('foo').entity.name == 'newfoo'

    # Other entities should not change
    assert Scholarship.get('bar').entity.name == 'bar'


def test_entity_cant_repeat(api):
    edited_entity = {
        'name': 'Bar',
        'website': 'http://bar.com',
    }

    response = api.put('/api/entities/foo/', json=edited_entity)
    assert response.status_code == 400
    assert response.json() == {
        'detail': DuplicateNameError.CODE,
    }


def test_entity_should_be_exist(api):
    edited_entity = {
        'name': 'jimmypronodejsreact',
        'website': 'http://jimmypronodejsreact.com',
    }

    response = api.put('/api/entities/jimmypronodejsreact/', json=edited_entity)
    assert response.status_code == 404


def test_same_name_can_be_edited(api):
    edited_entity = {
        'name': 'Bar',
        'website': 'http://foobar.com',
    }

    response = api.put('/api/entities/bar/', json=edited_entity)
    assert response.status_code == 200
