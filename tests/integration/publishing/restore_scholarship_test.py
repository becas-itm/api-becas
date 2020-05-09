import pytest

from itm.documents import Scholarship
from itm.publishing.domain.archive import Id, State


@pytest.fixture(autouse=True)
def scholarships_index():
    Scholarship.init()


def test_restore_scholarship_when_is_pending_should_be_possible(api):
    id = Id.generate()
    Scholarship.create({
        'id': id.value,
        'name': 'foo',
        'createdAt': '2020-01-01',
        'state': State.ARCHIVED.value,
    })
    response = api.post(f'/api/publishing/scholarships/{id.value}/restore/')
    assert response.status_code == 204


def test_restore_scholarship_when_is_denied_should_be_possible(api):
    id = Id.generate()
    Scholarship.create({
        'id': id.value,
        'name': 'foo',
        'createdAt': '2020-01-01',
        'state': State.DENIED.value,
    })
    response = api.post(f'/api/publishing/scholarships/{id.value}/restore/')
    assert response.status_code == 204


def test_restore_scholarship_when_is_pending_should_not_be_possible(api):
    id = Id.generate()
    Scholarship.create({
        'id': id.value,
        'name': 'foo',
        'createdAt': '2020-01-01',
        'state': State.PENDING.value,
    })
    response = api.post(f'/api/publishing/scholarships/{id.value}/restore/')
    assert response.status_code == 403


def test_restore_scholarship_when_is_published_should_not_be_possible(api):
    id = Id.generate()
    Scholarship.create({
        'id': id.value,
        'name': 'foo',
        'createdAt': '2020-01-01',
        'state': State.PUBLISHED.value,
    })
    response = api.post(f'/api/publishing/scholarships/{id.value}/restore/')
    assert response.status_code == 403
