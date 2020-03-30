from datetime import datetime

from fastapi import APIRouter
from pydantic import BaseModel

from itm.documents import User
from itm.auth.hash import HashService
from itm.auth.token import TokenService
from itm.shared.utils.auth import get_auth_token, TokenError
from itm.shared.http import Unauthorized, UnprocessableEntity


router = APIRouter()


class Credentials(BaseModel):
    email: str
    password: str


def get_user_or_fail(token: str):
    try:
        payload = get_auth_token(token)
    except TokenError:
        raise Unauthorized

    user = User.find_by_email(payload['email'])
    if not user:
        raise UnprocessableEntity

    return user


@router.post('/')
def sign_in(credentials: Credentials):
    user = User.find_by_email(credentials.email)

    if (not user or
        not user.verifiedAt or
            not HashService.compare(credentials.password, user.password)):
        raise UnprocessableEntity

    return {
        'displayName': user.name,
        'email': user.email,
        'photoURL': user.avatarUrl,
        'token': TokenService.encode({'id': user.id}, {'hours': 1}),
    }


@router.get('/verify/')
def verify_user_token(token: str):
    try:
        payload = get_auth_token(token)
    except TokenError:
        raise Unauthorized

    user = User.get(payload['id'])
    return {
        'id': user.id,
        'email': user.email,
        'displayName': user.name,
        'photoURL': user.avatarUrl,
        'token': token,
    }


@router.get('/register/{token}/')
def register(token: str):
    user = get_user_or_fail(token)

    return {
        'displayName': user.name,
        'photoURL': user.avatarUrl,
    }


class CompleteRegister(BaseModel):
    password: str


@router.put('/register/{token}/', status_code=204)
def complete_register(token: str, form: CompleteRegister):
    if not form.password:
        raise UnprocessableEntity

    user = get_user_or_fail(token)

    user.invitation = None
    user.password = HashService.hash(form.password)
    user.verifiedAt = datetime.utcnow()
    user.save(refresh=True)


class RecoverAccount(BaseModel):
    email: str


@router.post('/recover/')
def recover(form: RecoverAccount):
    user = User.find_by_email(form.email)
    if not user:
        raise UnprocessableEntity

    recover = {
        'requestedAt': datetime.utcnow(),
        'token': TokenService.encode({'email': form.email}, {'days': 1}),
    }

    user.passwordReset = recover
    user.save(refresh=True)


class ResetAccount(BaseModel):
    password: str


@router.get('/reset/{token}/')
def reset(token: str):
    user = get_user_or_fail(token)
    return {
        'displayName': user.name,
        'photoURL': user.avatarUrl,
    }


@router.put('/reset/{token}/', status_code=204)
def complete_reset(token: str, form: ResetAccount):
    if not form.password:
        raise UnprocessableEntity

    user = get_user_or_fail(token)

    user.passwordReset = None
    user.password = HashService.hash(form.password)
    user.save(refresh=True)
