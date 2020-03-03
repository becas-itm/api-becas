import pytest

from itm.publishing.domain.scholarship import (
    Id,
    Name,
    Date,
    State,
    Description,
    Scholarship,
    IncompleteError,
    StateError,
    ExpiredError,
    ScholarshipApproved,
    ScholarshipDenied,
    AcademicLevel,
)


def get_scholarship(id=None, name='foo', description='bar',
                    state=State.PENDING, deadline='9999-01-01',
                    academic_level=AcademicLevel.UNDERGRADUATE):
    return Scholarship(
        id=Id.from_string(id) if id else Id.generate(),
        name=Name(name),
        description=Description(description) if description else None,
        state=state,
        deadline=Date.from_string(deadline) if deadline else None,
        academic_level=academic_level,
    )


class TestApproveScholarship:
    @pytest.mark.parametrize('field', ['description', 'academic_level'])
    def test_missing_field_should_throw(self, field):
        scholarship = get_scholarship(**{field: None})
        with pytest.raises(IncompleteError):
            scholarship.approve()

    @pytest.mark.parametrize('state', [State.PUBLISHED])
    def test_non_pending_scholarship_should_throw(self, state):
        scholarship = get_scholarship(state=state)
        with pytest.raises(StateError):
            scholarship.approve()

    def test_expired_scholarship_should_throw(self):
        scholarship = get_scholarship(deadline='2000-01-01')
        with pytest.raises(ExpiredError):
            scholarship.approve()

    def test_should_be_approve_without_deadline(self):
        scholarship = get_scholarship(deadline=None)
        scholarship.approve()

    def test_approval_should_only_happen_one_time(self):
        scholarship = get_scholarship()
        scholarship.approve()
        with pytest.raises(StateError):
            scholarship.approve()

    def test_approval_should_fire_event(self):
        scholarship = get_scholarship()
        event = scholarship.approve()
        assert isinstance(event, ScholarshipApproved)


class TestDenyScholarship:
    @pytest.mark.parametrize('state', [State.PUBLISHED])
    def test_non_pending_scholarship_should_throw(self, state):
        scholarship = get_scholarship(state=state)
        with pytest.raises(StateError):
            scholarship.deny('foo')

    def test_denial_should_only_happen_one_time(self):
        scholarship = get_scholarship()
        scholarship.deny('foo')
        with pytest.raises(StateError):
            scholarship.deny('bar')

    def test_denial_should_fire_event(self):
        scholarship = get_scholarship()
        event = scholarship.deny('foo')
        assert isinstance(event, ScholarshipDenied)
