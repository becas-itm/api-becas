from fastapi import Header

from firebase_admin import auth

from itm.shared.http import Unauthorized


class TokenError(Exception):
    pass


def get_auth_token(token_string):
    try:
        token = auth.verify_id_token(token_string)
    except (ValueError,
            auth.InvalidIdTokenError,
            auth.ExpiredIdTokenError,
            auth.RevokedIdTokenError,
            auth.CertificateFetchError):
        raise TokenError
    else:
        return token


def extract_token_string(authorization):
    authorization = authorization.split(' ', 1)
    return authorization[1] if len(authorization) > 1 else ''


def verify_token(authorization: str = Header('')):
    try:
        get_auth_token(extract_token_string(authorization))
    except TokenError:
        raise Unauthorized
