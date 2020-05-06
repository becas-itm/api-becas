def test_api_status(api):
    response = api.get("/api/ping")
    assert response.status_code == 200
    assert response.json() == {"status": "It's alive"}
