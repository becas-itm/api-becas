from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_api_status():
    response = client.get("/api/ping")
    assert response.status_code == 200
    assert response.json() == {"status": "It's alive"}
