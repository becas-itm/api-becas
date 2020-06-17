from itm.documents import Scholarship, connect_db
from itm.publishing.domain.archive import ScholarshipArchived
from itm.publishing.infrastructure.projections import UpdateScholarshipOnArchived


def archive_scholarship(id):
    item = ScholarshipArchived.fire(id)
    UpdateScholarshipOnArchived().handle(item)


def get_expired_scholarship_ids():
    expired_scholarship = Scholarship.search().filter(
        'range',  **{'deadline': {'lt': 'now/d', 'format': 'strict_date_optional_time'}})
    return [item.meta.id for item in expired_scholarship]


def main():
    for id in get_expired_scholarship_ids():
        archive_scholarship(id)


if __name__ == '__main__':
    connect_db()
    main()
