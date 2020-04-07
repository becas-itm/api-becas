import os
import smtplib

from itm.shared.domain.mail import Mail


class SmtpEmailService:
    def send(self, mail: Mail):
        with smtplib.SMTP(os.environ['MAIL_HOST'], os.environ['MAIL_PORT']) as server:
            server.login(os.environ['MAIL_USERNAME'], os.environ['MAIL_PASSWORD'])
            server.sendmail(mail.sender, mail.receiver, mail.build_message())
