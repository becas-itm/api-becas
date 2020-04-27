import os
import datetime

import jwt


ONE_HOUR_IN_MILLISECONDS = 1000 * 60 * 60


class TokenService:
    @staticmethod
    def encode(payload: dict, expiration: dict):
        payload = payload.copy()
        payload['exp'] = datetime.datetime.utcnow() + datetime.timedelta(**expiration)
        encoded = jwt.encode(payload, os.getenv('APP_SECRET', 'secret'), algorithm='HS256')
        return encoded.decode('utf8')


class AccessToken:
    def __init__(self, value: str, expires_in: int):
        self.value = value
        self.expires_in = expires_in

    @classmethod
    def generate(cls, user):
        payload = {'id': user.id}
        expiration = {'milliseconds': ONE_HOUR_IN_MILLISECONDS}
        value = TokenService.encode(payload, expiration)
        return cls(value, expires_in=ONE_HOUR_IN_MILLISECONDS)


class RefreshToken:
    def __init__(self, value: str):
        self.value = value

    @classmethod
    def generate(cls, user):
        payload = {'id': user.id}
        expiration = {'hours': 8}
        return cls(TokenService.encode(payload, expiration))
