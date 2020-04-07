from itm.shared.infrastructure.mail import SmtpEmailService

from .emails import CompleteRegistrationMail, ResetPasswordMail


class SendCompleteRegistrationEmailOnUserInvited:
    def __init__(self):
        self.email_service = SmtpEmailService()

    def handle(self, email: str, token: str, user_name: str):
        mail = CompleteRegistrationMail.generate(email, token, user_name)
        self.email_service.send(mail)


class SendResetPasswordMailOnUserRequested:
    def __init__(self):
        self.email_service = SmtpEmailService()

    def handle(self, email: str, token: str):
        mail = ResetPasswordMail.generate(email, token)
        self.email_service.send(mail)
