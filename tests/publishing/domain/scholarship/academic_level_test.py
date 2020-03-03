from itm.publishing.domain.scholarship import AcademicLevel


def test_pending_value():
    assert AcademicLevel.UNDERGRADUATE.value == 'UNDERGRADUATE'


def test_published_value():
    assert AcademicLevel.POSTGRADUATE.value == 'POSTGRADUATE'


def test_denied_value():
    assert AcademicLevel.OTHERS.value == 'OTHERS'
