from fastapi.testclient import TestClient
from itm.publishing.domain.scholarship import Date

from main import app

client = TestClient(app)


def test_endpoint_status():
    response = client.get("/api/search/scholarships")
    assert response.status_code == 200


def test_result_structure():
    response = client.get("/api/search/scholarships")
    body = response.json()

    # Asserting first level of request

    # Current page would be an integer
    assert 'currentPage' in body
    assert isinstance(body['currentPage'], int)

    assert 'nextPage' in body
    assert 'prevPage' in body

    # results should be a list
    assert "results" in body
    assert isinstance(body['results'], list)

    # Asserting scholarship results

    # result should be a dict
    result = body['results'][0]
    assert isinstance(result, dict)

    # deadline should be a str with iso format
    assert 'deadline' in result
    assert isinstance(result['deadline'], str)
    date = Date.from_string(result['deadline'])
    assert isinstance(date, Date)

    # description should be a string
    assert 'description' in result
    assert isinstance(result['description'], str)

    # id should be a string
    assert 'id' in result
    assert isinstance(result['id'], str)

    # id should be a string
    assert 'name' in result
    assert isinstance(result['name'], str)

    # entity should be a dict
    assert 'entity' in result
    assert isinstance(result['entity'], dict)

    # Asserting entity structure
    entity = result['entity']

    # id should be a string
    assert 'fullName' in entity
    assert isinstance(entity['fullName'], str)

    assert 'name' in entity
    assert isinstance(result['name'], str)