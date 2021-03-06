import os

from datetime import datetime

from elasticsearch_dsl.connections import create_connection
from elasticsearch_dsl import Document, Text, Date, Object, Keyword

from itm.publishing.domain.scholarship import Id


class Scholarship(Document):
    class Index:
        name = 'scholarships'

    @property
    def id(self):
        return self.meta.id

    name = Text(required=True)

    description = Text()

    deadline = Date()

    state = Keyword(required=True)

    createdAt = Date(required=True)

    fundingType = Keyword()

    academicLevel = Keyword()

    entity = Object(
        properties={
            'code': Keyword(required=True),
            'name': Text(required=True),
        },
    )

    approval = Object(
        properties={
            'approvedAt': Date(required=True),
        },
    )

    denial = Object(
        properties={
            'deniedAt': Date(required=True),
            'reason': Text(required=True),
        },
    )

    spider = Object(
        properties={
            'name': Keyword(required=True),
            'extractedAt': Date(required=True),
        },
    )

    country = Object(
        properties={
            'name': Text(required=True),
            'code': Keyword(required=True),
        },
    )

    sourceDetails = Object(
        properties={
            'id': Text(),
            'url': Keyword(),
            'steps': Text(),
        },
    )

    language = Keyword()

    fillStatus = Keyword()

    archive = Object(
        properties={
            'archivedAt': Date(required=True),
        },
    )

    def serialize(self):
        doc = self.to_dict()
        doc.update({'id': self.id})
        return doc

    @staticmethod
    def create(item):
        item = item.copy()
        item_id = item.pop('id')
        scholarship = Scholarship(meta={'id': item_id}, **item)
        scholarship.save(refresh=True)


class Entity(Document):
    class Index:
        name = 'entities'

    website = Text(required=True)

    code = Keyword(required=True)

    name = Text(required=True)

    createdAt = Date()

    updatedAt = Date()

    @classmethod
    def create(cls, item):
        item = item.copy()

        item['createdAt'] = datetime.utcnow()
        item['updatedAt'] = item['createdAt']

        entity = cls(meta={'id': item['code']}, **item)
        entity.save(refresh=True)
        return entity

    @classmethod
    def update_entity(cls, item):
        item = item.copy()

        item['createdAt'] = datetime.utcnow()
        item['updatedAt'] = item['createdAt']

        entity = cls(meta={'id': item['code']}, **item)
        entity.save(refresh=True)
        return entity

    @classmethod
    def exists(cls, code):
        entity = cls.get(id=code, ignore=404, _source=['code'])
        return bool(entity)


class RawScholarship(Document):
    class Index:
        name = 'raw_scholarships'

    name = Text(required=True)

    description = Text()

    deadline = Text()

    fundingType = Text()

    spider = Object(
        required=True,
        properties={
            'name': Keyword(required=True),
            'extractedAt': Date(required=True),
        },
    )

    sourceDetails = Object(
        properties={
            'id': Text(),
            'url': Keyword(required=True),
        },
    )

    country = Text()

    language = Keyword()

    @staticmethod
    def create(item):
        scholarship = RawScholarship(meta={'id': Id.generate().value}, **item)
        scholarship.save()


class User(Document):
    class Index:
        name = 'users'

    @property
    def id(self):
        return self.meta.id

    name = Text(required=True)

    email = Keyword(required=True)

    password = Keyword()

    gender = Keyword()

    verifiedAt = Date()

    invitation = Object(
        properties={
            'token': Keyword(required=True),
            'invitedAt': Date(required=True),
        },
    )

    passwordReset = Object(
        properties={
            'token': Keyword(required=True),
            'requestedAt': Date(required=True),
        },
    )

    refresh_token = Keyword()

    @staticmethod
    def find_by_email(email):
        result = User.search() \
            .query('match', email=email) \
            .execute()

        if len(result) == 0:
            return None

        return result[0]


def connect_db():
    host = os.getenv('ELASTIC_HOST', '127.0.0.1')
    return create_connection(alias='default', hosts=[host])


def init_indexes():
    connect_db()
    Scholarship.init()
    RawScholarship.init()
    User.init()
    Entity.init()


if __name__ == '__main__':
    init_indexes()
