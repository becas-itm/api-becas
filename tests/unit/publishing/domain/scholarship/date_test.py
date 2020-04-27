import datetime

import pytest

from itm.publishing.domain.scholarship import Date


def test_value_should_be_a_string():
    non_string_date = 123
    with pytest.raises(TypeError):
        Date.from_string(non_string_date)


def test_invalid_format_should_throw():
    invalid_value = 'foo'
    with pytest.raises(ValueError):
        Date.from_string(invalid_value)


def test_factory_method_should_return_an_instance():
    date = Date.from_string('2000-01-01')
    assert isinstance(date, Date)


def test_date_should_be_stored():
    assert Date.from_string('2000-01-01').value == datetime.date(2000, 1, 1)
    assert Date.from_string('2000-12-31').value == datetime.date(2000, 12, 31)


@pytest.mark.parametrize('date_string,current_date,passed',
                         [('2020-01-01', '2019-12-31', False),
                          ('2020-01-01', '2020-01-01', False),
                          ('2019-12-31', '2020-01-01', True)])
def test_has_passed(date_string, current_date, passed):
    def now(): return datetime.date.fromisoformat(current_date)
    date = Date.from_string(date_string)
    assert date.has_passed(current_date=now) == passed
