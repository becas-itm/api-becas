from itm.documents import Scholarship, connect_db
from itm.publishing.domain.archive import ScholarshipArchived
from itm.publishing.infrastructure.projections import UpdateScholarshipOnArchived


def archive_scholarship(id):
    item = ScholarshipArchived.fire(id)
    UpdateScholarshipOnArchived().handle(item)


def get_expired_scholarship_ids():
    expired_scholarship = Scholarship.search().filter(
        'range',  **{'deadline': {'lt': 'now+1d/d', 'format': 'strict_date_optional_time'}})
    return [item.meta.id for item in expired_scholarship]


if __name__ == '__main__':
    connect_db()
    ids = get_expired_scholarship_ids()

    for id in ids:
        archive_scholarship(id)
