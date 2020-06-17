import pytest
import os
from datetime import datetime, timedelta
from itm.documents import Scholarship
from itm.publishing.domain.archive import State

YESTERDAY = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0) - timedelta(1)
TODAY = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
TOMORROW = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0) + timedelta(1)


@pytest.fixture(autouse=True)
def scholarships_index():
    Scholarship.init()


def call_archive_scholarship_script():
    os.system('python itm/publishing/infrastructure/console/archive_scholarship.py')


def test_archive_scholarship():
    Scholarship.create({
        'id': 'foo',
        'name': 'foo',
        'createdAt': '2020-01-01',
        'state': State.PUBLISHED.value,
        'deadline': YESTERDAY,
    })

    call_archive_scholarship_script()
    scholarship = Scholarship.get('foo')

    assert scholarship.state == State.ARCHIVED.value


def test_today_scholarship_deadline_is_available():
    Scholarship.create({
        'id': 'foo',
        'name': 'foo',
        'createdAt': '2020-01-01',
        'state': State.PUBLISHED.value,
        'deadline': TODAY,
    })

    call_archive_scholarship_script()

    scholarship = Scholarship.get('foo')

    assert scholarship.state == State.PUBLISHED.value


def test_archive_only_expired_scholarships():
    Scholarship.create({
        'id': 'foo',
        'name': 'foo',
        'createdAt': '2020-01-01',
        'state': State.PUBLISHED.value,
        'deadline': YESTERDAY,
    })

    Scholarship.create({
        'id': 'bar',
        'name': 'bar',
        'createdAt': '2020-01-01',
        'state': State.PUBLISHED.value,
        'deadline': YESTERDAY,
    })

    Scholarship.create({
        'id': 'available',
        'name': 'bar',
        'createdAt': '2020-01-01',
        'state': State.PUBLISHED.value,
        'deadline': TOMORROW,
    })

    call_archive_scholarship_script()

    expired_scholarship = Scholarship.get('foo')
    expired_scholarship2 = Scholarship.get('bar')
    available_scholarship = Scholarship.get('available')

    assert expired_scholarship.state == State.ARCHIVED.value
    assert expired_scholarship2.state == State.ARCHIVED.value
    assert available_scholarship.state == State.PUBLISHED.value
