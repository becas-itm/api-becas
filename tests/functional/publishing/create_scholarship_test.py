import pytest

from itm.documents import Scholarship


@pytest.fixture(autouse=True)
def scholarships_index():
    Scholarship.init()


class TestSuccessfullRequest:
    @pytest.fixture(autouse=True)
    def response(self, api):
        return api.post('/api/publishing/scholarships/', json={
            'name': 'foo',
            'description': 'bar',
            'deadline': '2099-01-01',
            'academicLevel': 'UNDERGRADUATE',
            'fundingType': 'PARTIAL',
            'country': 'COL',
            'language': 'es',
        })

    def test_status_code_should_be_200(self, response):
        assert response.status_code == 200

    def test_response_should_contain_new_scholarship_id(self, response):
        result = response.json()
        assert 'id' in result
        assert isinstance(result['id'], str)
