from itm.publishing.domain.scholarship import AcademicLevel, FundingType


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

    def with_academic_level(self, levels):
        filter = AcademicLevelFilter()
        filter.add(*levels)
        self._must({'terms': filter.build()})
        return self

    def with_funding_type(self, types):
        funding_types = []
        for funding in types:
            if isinstance(funding, FundingType):
                funding = funding.value
            funding_types.append(funding)
        self._must({'terms': {'fundingType': funding_types}})
        return self

    def with_country(self, country):
        if country == '':
            return self

        self._must({'match': {'country.name': country}})

        return self

    def with_language(self, language):
        if language == '' or language == '*':
            return self

        self._must({'match': {'language': language}})
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


class AcademicLevelFilter:
    name = 'academicLevel'

    def __init__(self):
        self.values = []

    def add(self, *levels):
        for level in levels:
            if isinstance(level, AcademicLevel):
                level = level.value

            self.values.append(level)

            if self.should_append_both_level(level):
                self.values.append(AcademicLevel.BOTH.value)

    def should_append_both_level(self, level):
        return level in [
            AcademicLevel.UNDERGRADUATE.value,
            AcademicLevel.POSTGRADUATE.value,
        ] and AcademicLevel.BOTH.value not in self.values

    def build(self):
        return {self.name: self.values}


class SourceField:
    name = '_source'

    def __init__(self):
        self.all_fields = set()

    def add(self, *fields):
        if not fields:
            return

        self.all_fields = self.all_fields.union(fields)

    @property
    def fields(self):
        return sorted(self.all_fields)


class SizeParam:
    name = 'size'

    DEFAULT_VALUE = 10

    def __init__(self):
        self.value = SizeParam.DEFAULT_VALUE

    def change_to(self, value):
        if type(value) is not int:
            raise TypeError('Invalid size value')

        if value <= 0:
            raise ValueError('Invalid size value')

        self.value = value


class SkipParam:
    name = 'from'

    DEFAULT_VALUE = 0

    def __init__(self):
        self.value = SkipParam.DEFAULT_VALUE

    def change_to(self, value):
        if type(value) is not int:
            raise TypeError('Invalid skip value')

        if value < 0:
            raise ValueError('Invalid skip value')

        self.value = value
