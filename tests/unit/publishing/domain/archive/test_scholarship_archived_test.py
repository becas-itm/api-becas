from itm.publishing.domain.archive import ScholarshipArchived


def test_fire_should_return_an_instance():
    event = ScholarshipArchived.fire(None)
    assert isinstance(event, ScholarshipArchived)


def test_event_should_have_scholarship_id():
    id = 'foo'
    event = ScholarshipArchived.fire(id)
    assert event.scholarship_id == id


def test_event_should_have_a_timestamp():
    event = ScholarshipArchived.fire('foo')
    assert event.timestamp
