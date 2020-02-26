class SearchBuilder:
    def __init__(self):
        self.body = {'query': {}}

    def select(self, fields):
        self.body['_source'] = fields
        return self

    def with_state(self, state):
        self._add_must({'term': {'state': state}})
        return self

    def add_term(self, term):
        if term == '':
            return self

        self._add_must({
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

    def build(self):
        return self.body

    def _add_must(self, query):
        self._add_bool('must', query)

    def _add_should(self, query):
        self._add_bool('should', query)

    def _add_bool(self, bool_type, query):
        if 'bool' not in self.body['query']:
            self.body['query']['bool'] = {}

        if bool_type not in self.body['query']['bool']:
            self.body['query']['bool'][bool_type] = []

        self.body['query']['bool'][bool_type].append(query)
