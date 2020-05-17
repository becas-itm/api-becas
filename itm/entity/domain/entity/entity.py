import re

from slugify import slugify

from itm.shared.domain.string import StringValueObject


class EntityName(StringValueObject):
    MAX_CHARACTERS = 100

    @property
    def code(self):
        return slugify(self.value)


class EntityWebsite:
    def __init__(self, value: str):
        self._set_value(value)

    @property
    def value(self):
        return self._value

    def _set_value(self, value: str):
        if not isinstance(value, str):
            raise TypeError(f'{value!r} is not a valid v')

        if value == '':
            raise ValueError('EntityWebsite must not be empty')

        if not self._is_valid_uri(value):
            raise ValueError('Invalid entity website')

        self._value = value

    def _is_valid_uri(self, value):
        url_regex = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'  # noqa: E501
        return bool(re.match(url_regex, value))
