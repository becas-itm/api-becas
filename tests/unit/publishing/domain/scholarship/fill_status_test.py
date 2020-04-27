from itm.publishing.domain.scholarship import FillStatus


def test_complete_value():
    assert FillStatus.COMPLETE.value == 'COMPLETE'


def test_incomplete_value():
    assert FillStatus.INCOMPLETE.value == 'INCOMPLETE'
