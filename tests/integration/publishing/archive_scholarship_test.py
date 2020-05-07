import pytest

from itm.documents import Scholarship
from itm.publishing.domain.archive import Id, State


@pytest.fixture(autouse=True)
def scholarships_index():
    Scholarship.init()


def test_archive_scholarship(api):
    id = Id.generate()
    Scholarship.create({
        'id': id.value,
        'name': 'foo',
        'createdAt': '2020-01-01',
        'state': State.PUBLISHED.value,
    })
    response = api.post(f'/api/publishing/scholarships/{id.value}/archive/')
    assert response.status_code == 204
