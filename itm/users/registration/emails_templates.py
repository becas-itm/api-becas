import os


class EmailData:
    title = ''
    body = ''
    button_link = ''
    button_text = ''


class BaseTemplate:
    TEMPLATE_NAME = 'email_template.html'

    def render(self):
        return self.prepare_template(
            self.read_template(),
            self.build_data(),
        )

    def prepare_template(self, template: str, data: EmailData):
        REPLACE_TIMES = 1
        return template.replace('%%TITLE%%', data.title, REPLACE_TIMES) \
            .replace('%%BODY%%', data.body, REPLACE_TIMES) \
            .replace('%%BUTTON_LINK%%', data.button_link, REPLACE_TIMES) \
            .replace('%%BUTTON_TEXT%%', data.button_text, REPLACE_TIMES)

    def read_template(self):
        filename = os.path.join(os.path.dirname(os.path.abspath(__file__)), self.TEMPLATE_NAME)
        with open(filename, encoding='utf8') as file:
            return file.read()

    def build_data(self):
        raise NotImplementedError


class CompleteRegistrationTemplate(BaseTemplate):
    def __init__(self, token: str, user_name: str):
        self.token = token
        self.user_name = user_name

    def build_data(self):
        data = EmailData()

        data.title = f'¡Hola, {self.user_name}!'
        data.body = (
            'Has sido invitado como administrador al equipo de Convocatorias ITM.'
            ' Tu invitación expirará en 24 horas.'
            ' Por favor, visita el siguiente enlace para completar tu registro.'
        )
        data.button_link = self.build_link()
        data.button_text = 'Completar registro'

        return data

    def build_link(self):
        return f"{os.getenv('PUBLIC_URL')}/registro/{self.token}"


class ResetPasswordTemplate(BaseTemplate):
    def __init__(self, token: str):
        self.token = token

    def build_data(self):
        data = EmailData()

        data.title = 'Restablecimiento de contraseña'
        data.body = (
            'Visita el siguiente enlace para restablecer la contraseña de Convocatorias ITM.'
            ' Si no solicitaste el restablecimiento de tu contraseña, puedes ignorar este'
            ' correo electrónico.'
        )

        data.button_link = self.build_link()
        data.button_text = 'Restablecer contraseña'

        return data

    def build_link(self):
        return f"{os.getenv('PUBLIC_URL')}/restablecer/{self.token}"
