import os

import pytest
from fastapi.testclient import TestClient
from pytest_elasticsearch import factories

from main import app

from elasticsearch_dsl.connections import add_connection


host = os.getenv('ELASTIC_HOST', '127.0.0.1')
elasticsearch_nooproc = factories.elasticsearch_noproc(host, 9200)
elasticsearch = factories.elasticsearch('elasticsearch_nooproc')


@pytest.fixture(autouse=True)
def init_db(elasticsearch):
    add_connection('default', elasticsearch)


@pytest.fixture(scope='session')
def api():
    return TestClient(app)
