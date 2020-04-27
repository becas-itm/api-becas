import uuid

import pytest

from itm.publishing.domain.scholarship import Id


def test_id_should_be_a_string():
    invalid_id = None
    with pytest.raises(TypeError):
        Id.from_string(invalid_id)


@pytest.mark.parametrize('invalid_id', ['', '--'])
def test_invalid_format_should_throw(invalid_id):
    with pytest.raises(ValueError):
        Id.from_string(invalid_id)


def test_from_string_should_return_an_instance():
    id = Id.from_string('68f43f95-1be4-4aee-b274-454d61273176')
    assert isinstance(id, Id)


def test_id_should_be_stored():
    id = '68f43f95-1be4-4aee-b274-454d61273176'
    assert Id.from_string(id).value == id


def test_uuid_version_should_be_4():
    with pytest.raises(TypeError):
        Id(uuid.uuid1())


def test_generate():
    assert isinstance(Id.generate(), Id)
