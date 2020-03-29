import datetime

import jwt
import bcrypt

from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, status

from itm.documents import User
from itm.shared.http import Unauthorized
from itm.shared.utils.auth import get_auth_token, TokenError

router = APIRouter()


class Credentials(BaseModel):
    email: str
    password: str


@router.post('/')
def sign_in(credentials: Credentials):
    user = User.find_by_email(credentials.email)

    if not user:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY)

    def encode(string): return bytes(string.encode('utf8'))

    if not bcrypt.checkpw(encode(credentials.password), encode(user.password)):
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, 'Wrong credentials')

    return {
        'displayName': user.name,
        'email': user.email,
        'photoURL': user.avatarUrl,
        'token': jwt.encode({
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),
        }, 'secret'),
    }


@router.get('/verify/')
def verify_user_token(token: str):
    try:
        data = get_auth_token(token)
    except TokenError:
        raise Unauthorized
    else:
        user = User.get(data['id'])
        return {
            'id': user.id,
            'email': user.email,
            'displayName': user.name,
            'photoURL': user.avatarUrl,
            'token': token,
        }
