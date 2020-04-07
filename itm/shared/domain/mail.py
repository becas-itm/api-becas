import re

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


class Email:
    EMAIL_REGEX = r'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)'

    def __init__(self, value: str):
        self._set_value(value)

    @property
    def value(self):
        return self._value

    def _set_value(self, value: str):
        if not isinstance(value, str):
            raise TypeError(f'{value!r} must be a string. {type(value)} given')

        if not self._is_valid_format(value):
            raise ValueError('Invalid email format')

        self._value = value

    def _is_valid_format(self, email: str):
        return bool(re.search(self.EMAIL_REGEX, email))


class Mail:
    def __init__(self, to_email: str, subject: str, content: str):
        self.to_email = Email(to_email)
        self.subject = subject
        self.content = content

    @property
    def sender(self):
        return 'Convocatorias ITM <noreply@convocatoriasitm.com>'

    @property
    def receiver(self):
        return self.to_email.value

    def build_message(self):
        message = MIMEMultipart()
        message['Subject'] = self.subject
        message['From'] = self.sender
        message['To'] = self.receiver

        message.attach(MIMEText(self.content, 'html'))

        return message.as_string()
