import pytest

from itm.documents import Scholarship


@pytest.fixture(autouse=True)
def scholarships_index():
    Scholarship.init()


class TestEmptySearchResults:
    @pytest.fixture(autouse=True)
    def response(self, api):
        return api.get('/api/search/scholarships/')

    def test_status_code_should_be_200(self, response):
        assert response.status_code == 200

    def test_pagination(self, response):
        body = response.json()

        assert 'currentPage' in body
        assert isinstance(body['currentPage'], int)

        assert 'nextPage' in body
        assert 'prevPage' in body

    def test_results_should_be_empty(self, response):
        result = response.json()
        assert 'results' in result
        assert isinstance(result['results'], list)


class TestSearchResults:
    def test_scholarship_response(self, api):
        Scholarship.create({
            'id': 'id-test',
            'name': 'name-test',
            'description': 'description-test',
            'deadline': '2099-01-01',
            'state': 'PUBLISHED',
            'entity': {
                'code': 'entity-code-test',
                'name': 'entity-name-test',
            },
            'createdAt': '2020-01-01',
        })
        response = api.get('/api/search/scholarships/')
        result = response.json()
        scholarship = result['results'][0]

        assert isinstance(scholarship, dict)

        assert 'id' in scholarship
        assert scholarship['id'] == 'id-test'

        assert 'name' in scholarship
        assert scholarship['name'] == 'name-test'

        assert 'description' in scholarship
        assert scholarship['description'] == 'description-test'

        assert 'deadline' in scholarship
        assert scholarship['deadline'] == '2099-01-01T00:00:00'

        assert isinstance(scholarship.get('entity'), dict)
        assert {
            'code': 'entity-code-test',
            'name': 'entity-name-test',
        }.items() <= scholarship['entity'].items()

    def test_pending_scholarships_are_not_listed(self, api):
        pending_state = 'PENDING'
        Scholarship.create({
            'id': 'id-test',
            'name': 'name-test',
            'description': 'description-test',
            'deadline': '2099-01-01',
            'state': pending_state,
            'entity': {
                'code': 'entity-code-test',
                'name': 'entity-name-test',
            },
            'createdAt': '2020-01-01',
        })

        response = api.get('/api/search/scholarships/')
        result = response.json()
        assert result['results'] == []
