from itm.documents import Scholarship


class SearchService:
    @staticmethod
    def execute(builder):
        response = Scholarship \
            .search() \
            .update_from_dict(builder.build()) \
            .execute()

        return (SearchService._deserialize(response), response.hits.total.value)

    @staticmethod
    def _deserialize(response):
        def deserialize(scholarship):
            return scholarship.serialize()

        return list(map(deserialize, response))
