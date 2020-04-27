import pytest
from unittest.mock import MagicMock

from itm.publishing.domain.scholarship import ScholarshipCreated, ExpiredError
from itm.publishing.application import CreateScholarship, CreateScholarshipRequest


DATA = {
    'name': 'foo',
    'description': 'bar',
    'deadline': '2099-01-01',
    'academicLevel': 'UNDERGRADUATE',
    'fundingType': 'PARTIAL',
    'country': 'col',
    'language': 'es',
}


class TestCreateScholarshipRequest:
    @pytest.mark.parametrize('field', list(DATA.keys()))
    def test_fields_are_null_by_default(self, field):
        request = CreateScholarshipRequest()
        assert request.dict()[field] is None

    @pytest.mark.parametrize('field,value', list(DATA.items()))
    def test_fields_are_stored(self, field, value):
        request = CreateScholarshipRequest(**{field: value})
        assert request.dict()[field] == value


class TestCreateScholarship:
    def test_create_should_fire_an_event(self):
        data = CreateScholarshipRequest(**{'name': 'foo'})
        command = CreateScholarship(data)
        event = command.execute()
        assert isinstance(event, ScholarshipCreated)

    def test_scholarship_can_be_partially_created(self):
        name = 'foo'
        partial_request = CreateScholarshipRequest()
        partial_request.name = name

        command = CreateScholarship(partial_request)
        command.execute()

    def test_scholarship_is_created_with_given_data(self):
        request = CreateScholarshipRequest(**DATA)
        command = CreateScholarship(request)
        stub = MagicMock()
        ScholarshipCreated.fire = stub

        command.execute()

        data = stub.call_args[0][0]
        for field in DATA.keys():
            assert field in data

    def test_scholarship_id_is_included_in_event(self):
        request = CreateScholarshipRequest(**DATA)
        command = CreateScholarship(request)
        stub = MagicMock()
        ScholarshipCreated.fire = stub

        command.execute()

        data = stub.call_args[0][0]
        assert 'id' in data

    def test_scholarship_should_have_a_pending_state(self):
        request = CreateScholarshipRequest(**DATA)
        command = CreateScholarship(request)
        stub = MagicMock()
        ScholarshipCreated.fire = stub

        command.execute()

        data = stub.call_args[0][0]
        assert 'state' in data
        assert data['state'] == 'PENDING'

    def test_expired_scholarship_cannot_be_created(self):
        payload = DATA.copy()
        payload['deadline'] = '2020-01-01'
        request = CreateScholarshipRequest(**payload)
        command = CreateScholarship(request)

        with pytest.raises(ExpiredError):
            command.execute()

    def test_event_should_have_an_is_complete_field(self):
        request = CreateScholarshipRequest(**DATA)
        command = CreateScholarship(request)
        stub = MagicMock()
        ScholarshipCreated.fire = stub

        command.execute()

        is_complete = stub.call_args[0][1]
        assert isinstance(is_complete, bool)
