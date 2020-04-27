from itm.publishing.domain.scholarship import AcademicLevel


def test_undergraduate_value():
    assert AcademicLevel.UNDERGRADUATE.value == 'UNDERGRADUATE'


def test_postgraduate_value():
    assert AcademicLevel.POSTGRADUATE.value == 'POSTGRADUATE'


def test_others_value():
    assert AcademicLevel.OTHERS.value == 'OTHERS'


def test_both_value():
    assert AcademicLevel.BOTH.value == 'BOTH'
