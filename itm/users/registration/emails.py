from itm.shared.domain.mail import Mail

from .emails_templates import CompleteRegistrationTemplate, ResetPasswordTemplate


class CompleteRegistrationMail(Mail):
    SUBJECT = 'Completar registro'

    @classmethod
    def generate(cls, to_email, token, user_name):
        return cls(
            to_email,
            subject=cls.SUBJECT,
            content=CompleteRegistrationTemplate(token, user_name).render(),
        )


class ResetPasswordMail(Mail):
    SUBJECT = 'Recuperar contraseña'

    @classmethod
    def generate(cls, to_email, token):
        return cls(
            to_email,
            subject=cls.SUBJECT,
            content=ResetPasswordTemplate(token).render(),
        )
