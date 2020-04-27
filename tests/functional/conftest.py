import os

import pytest

from pytest_elasticsearch import factories

from elasticsearch_dsl.connections import add_connection


host = os.getenv('ELASTIC_HOST', '127.0.0.1')
elasticsearch_nooproc = factories.elasticsearch_noproc(host, 9200)
elasticsearch = factories.elasticsearch('elasticsearch_nooproc')


@pytest.fixture(autouse=True)
def init_db(elasticsearch):
    add_connection('default', elasticsearch)
