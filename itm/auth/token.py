import os
import datetime

import jwt


class TokenService:
    @staticmethod
    def encode(payload: dict, expiration: dict):
        payload = payload.copy()
        payload['exp'] = datetime.datetime.utcnow() + datetime.timedelta(**expiration)
        encoded = jwt.encode(payload, os.getenv('APP_SECRET', 'secret'))
        return encoded.decode('utf8')
