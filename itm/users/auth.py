from datetime import datetime

from pydantic import BaseModel

from fastapi import status
from fastapi import APIRouter, Response, Cookie

from itm.documents import User
from itm.auth.hash import HashService

from itm.auth.token import AccessToken
from itm.auth.token import TokenService
from itm.auth.token import RefreshToken

from itm.shared.utils.auth import TokenError
from itm.shared.utils.auth import get_auth_token

from itm.shared.http import Unauthorized
from itm.shared.http import TooManyRequests
from itm.shared.http import UnprocessableEntity

from .registration.event_handlers import SendResetPasswordMailOnUserRequested

router = APIRouter()


class Credentials(BaseModel):
    email: str
    password: str


def can_be_recovered(requested_at):
    passed_minutes = (datetime.utcnow() - requested_at).seconds / 60
    return passed_minutes > 20


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
def sign_in(credentials: Credentials, response: Response):
    user = User.find_by_email(credentials.email)

    if not user:
        raise UnprocessableEntity('User does not exist')

    if not user.verifiedAt:
        raise UnprocessableEntity('Use unverified')

    if not HashService.compare(credentials.password, user.password):
        print('credentials', credentials.password)
        print('current pwd', user.password)
        raise UnprocessableEntity('Wrong credentials')

    refresh_token = RefreshToken.generate(user)
    response.set_cookie('X-Refresh-Token', refresh_token.value,
                        httponly=True, path="/api/auth/refresh-token")

    user.refresh_token = refresh_token.value
    user.save()

    access_token = AccessToken.generate(user)

    return {
        'displayName': user.name,
        'email': user.email,
        'token': access_token.value,
        'expiresIn': access_token.expires_in,
        'genre': user.genre,
    }


@router.post('/refresh-token/')
def refresh_user_token(response: Response, token: str = Cookie('', alias='X-Refresh-Token')):
    try:
        payload = get_auth_token(token)
    except TokenError:
        raise Unauthorized

    user = User.get(payload['id'], ignore=status.HTTP_404_NOT_FOUND)
    if not user:
        raise Unauthorized

    token = AccessToken.generate(user)

    return {
        'id': user.id,
        'email': user.email,
        'displayName': user.name,
        'token': token.value,
        'expiresIn': token.expires_in,
        'genre': user.genre,
    }


@router.get('/register/{token}/')
def register(token: str):
    user = get_user_or_fail(token)

    return {
        'displayName': user.name,
        'genre': user.genre,
    }


class CompleteRegister(BaseModel):
    password: str


@router.put('/register/{token}/', status_code=status.HTTP_204_NO_CONTENT)
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

    if user.passwordReset and not can_be_recovered(user.passwordReset.requestedAt):
        raise TooManyRequests

    token = TokenService.encode({'email': form.email}, {'days': 1})
    user.passwordReset = {
        'requestedAt': datetime.utcnow(),
        'token': token,
    }
    user.save(refresh=True)

    SendResetPasswordMailOnUserRequested() \
        .handle(user.email, token)


class ResetAccount(BaseModel):
    password: str


@router.get('/reset/{token}/')
def reset(token: str):
    user = get_user_or_fail(token)
    return {
        'displayName': user.name,
        'genre': user.genre,
    }


@router.put('/reset/{token}/', status_code=204)
def complete_reset(token: str, form: ResetAccount):
    if not form.password:
        raise UnprocessableEntity

    user = get_user_or_fail(token)

    user.passwordReset = None
    user.password = HashService.hash(form.password)
    user.save(refresh=True)
