import jwt

from fastapi import Header

from itm.shared.http import Unauthorized


class TokenError(Exception):
    pass


def get_auth_token(token_string):
    try:
        return jwt.decode(token_string, 'secret')
    except (jwt.exceptions.InvalidTokenError,
            jwt.exceptions.DecodeError,
            jwt.exceptions.ExpiredSignatureError):
        raise TokenError


def extract_token_string(authorization):
    authorization = authorization.split(' ', 1)
    return authorization[1] if len(authorization) > 1 else ''


def verify_token(authorization: str = Header('')):
    try:
        return get_auth_token(extract_token_string(authorization))
    except TokenError:
        raise Unauthorized
