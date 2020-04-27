import os

import pytest
from fastapi.testclient import TestClient
from pytest_elasticsearch import factories

from elasticsearch_dsl.connections import add_connection

from main import app

from itm.auth.token import TokenService


host = os.getenv('ELASTIC_HOST', '127.0.0.1')
elasticsearch_nooproc = factories.elasticsearch_noproc(host, 9200)
elasticsearch = factories.elasticsearch('elasticsearch_nooproc')


@pytest.fixture(autouse=True)
def init_db(elasticsearch):
    add_connection('default', elasticsearch)


@pytest.fixture(scope='session')
def api():
    token = TokenService.encode({'email': 'test@test.com'}, {'days': 1})
    client = TestClient(app)
    client.headers['Authorization'] = f'Bearer {token}'
    return client
