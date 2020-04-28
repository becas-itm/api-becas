import pytest

from itm.publishing.domain.scholarship import AcademicLevel
from itm.search.search import SearchBuilder, AcademicLevelFilter, SourceField


@pytest.fixture
def search():
    return SearchBuilder()


def test_returns_a_dictionary(search):
    assert isinstance(search.build(), dict)


def test_empty_search(search):
    assert search.build() == {'query': {}}


class TestAcademicLevelFilter:
    @pytest.fixture
    def levels(self):
        return AcademicLevelFilter()

    def test_field_name(self, levels):
        assert levels.name == 'academicLevel'

    def test_values_should_be_a_list(self, levels):
        assert type(levels.values) is list

    def test_add_single_level(self, levels):
        levels.add('foo')
        assert levels.values == ['foo']

    def test_add_multiple_levels(self, levels):
        levels.add('bar', 'foo')
        assert levels.values == ['bar', 'foo']

    def test_empty_list_should_do_nothing(self, levels):
        levels.add()
        assert levels.values == []

    @pytest.mark.parametrize('level', [AcademicLevel.UNDERGRADUATE, AcademicLevel.POSTGRADUATE])
    def test_add_appends_both_level_when_undergraduate_or_postgraduate(self, levels, level):
        levels.add(level.value)
        assert levels.values == [level.value, AcademicLevel.BOTH.value]

    def test_build_should_return_values(self, levels):
        assert levels.build() == {levels.name: levels.values}


class TestSourceField:
    @pytest.fixture()
    def fields(self):
        return SourceField()

    def test_field_name(self, fields):
        assert fields.name == '_source'

    def test_single_field_is_list(self, fields):
        fields.add('foo')
        assert fields.fields == ['foo']

    def test_list_fields(self, fields):
        fields.add('bar', 'foo')
        assert fields.fields == ['bar', 'foo']

    def test_list_fields_are_sorted(self, fields):
        fields.add('z', 'a')
        assert fields.fields == ['a', 'z']

    def test_empty_list_should_do_nothing(self, fields):
        fields.add()
        assert fields.fields == []

    def test_repeated_fields(self, fields):
        fields.add('foo', 'foo')
        assert fields.fields == ['foo']

    def test_repeated_fields_after_multiple_calls(self, fields):
        fields.add('foo')
        fields.add('foo', 'bar')
        assert fields.fields == ['bar', 'foo']
