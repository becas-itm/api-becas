class SearchBuilder:
    def __init__(self):
        self.body = {'query': {}}

    def select(self, fields):
        self.body['_source'] = fields
        return self

    def with_state(self, state):
        self._must({'term': {'state': state}})
        return self

    def add_term(self, term):
        if term == '':
            return self

        self._should({
            'multi_match': {
                'query': term,
                'fields': ['name', 'description'],
            },
        })

        return self

    def size(self, value):
        self.body['size'] = value
        return self

    def skip(self, value):
        self.body['from'] = value
        return self

    def with_academic_level(self, level):
        self._must({'terms': {'academicLevel': level}})
        return self

    def with_country(self, country):
        if country == '':
            return self

        self._must({'match': {'country.name': country}})

        return self

    def build(self):
        return self.body

    def _must(self, query):
        self._bool('must', query)

    def _should(self, query):
        self._bool('should', query)

    def _bool(self, bool_type, query):
        if 'bool' not in self.body['query']:
            self.body['query']['bool'] = {}

        if bool_type not in self.body['query']['bool']:
            self.body['query']['bool'][bool_type] = []

        self.body['query']['bool'][bool_type].append(query)
