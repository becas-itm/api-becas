import bcrypt

from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, status

from itm.documents import User
from itm.shared.http import NotFound


router = APIRouter()


class EditItem(BaseModel):
    displayName: str = ''
    email: str = ''
    password: str = ''
    photoUrl: str = ''


@router.put('/{user_id}/')
def edit_user(user_id: str, item: EditItem):
    user = User.get(user_id, ignore=NotFound.code)

    if not user:
        raise NotFound

    if item.displayName:
        user.name = item.displayName

    if item.password:
        user.password = bcrypt.hashpw(bytes(item.password.encode('utf8')), bcrypt.gensalt())

    if item.photoUrl:
        user.avatarUrl = item.photoUrl

    user.save(refresh=True)


@router.get('/')
def list_users():
    def format_user(user):
        return {
            'uid': user.id,
            'displayName': user.name,
            'photoUrl': user.avatarUrl,
        }

    users = User.search() \
        .source(['name', 'email', 'avatarUrl']) \
        .scan()

    return list(map(format_user, users))


@router.post('/')
def invite_user(item: EditItem):
    if not item.email or not item.displayName or not item.photoUrl:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, 'Missing fields')

    user = User(name=item.displayName, email=item.email, avatarUrl=item.photoUrl)
    user.save()
