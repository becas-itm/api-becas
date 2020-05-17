class StringValueObject:
    def __init__(self, value: str):
        self._set_value(value)

    @property
    def value(self):
        return self._value

    def _set_value(self, value: str):
        if not isinstance(value, str):
            raise TypeError(f'{value!r} is not a valid {self.__class__.__name__}')

        if value == '':
            raise ValueError(f'{self.__class__.__name__} must not be empty')

        if len(value) > self.MAX_CHARACTERS:
            raise ValueError(f'{self.__class__.__name__} must contain up to '
                             f'{self.MAX_CHARACTERS} characters')

        self._value = value
