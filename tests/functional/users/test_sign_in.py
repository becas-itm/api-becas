import pytest

from fastapi.testclient import TestClient
from fastapi import status

from app import app
from itm.documents import User


@pytest.fixture(autouse=True)
def scholarships_index():
    User.init()


@pytest.fixture(scope='module')
def api():
    return TestClient(app)


@pytest.fixture
def sign_in(api):
    def make_request(email='john@doe.com', password='secret'):
        credentials = {'email': email, 'password': password}
        return api.post('/api/auth/', json=credentials)

    return make_request


class TestCredentials:
    def test_email_field_is_required(self, sign_in):
        assert sign_in(email=None).status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_pasword_field_is_required(self, sign_in):
        assert sign_in(password=None).status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_credentials_are_required(self, sign_in):
        assert sign_in({}).status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_user_not_found(elasticsearch, sign_in):
    elasticsearch.delete_by_query(User.Index.name, body={'query': {'match_all': {}}}, refresh=True)
    response = sign_in()
    assert response.json() == {'detail': 'User does not exist'}
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
