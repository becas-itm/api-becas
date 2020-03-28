from firebase_admin import auth

from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException, status

from itm.shared.utils.auth import verify_token


router = APIRouter()


class EditItem(BaseModel):
    displayName: str = ''
    email: str = ''
    password: str = ''
    photoUrl: str = ''


@router.put('/')
def edit_user(item: EditItem, token: ... = Depends(verify_token)):
    data = {}

    if item.displayName:
        data['display_name'] = item.displayName

    if item.password:
        data['password'] = item.password

    if item.photoUrl:
        data['photo_url'] = item.photoUrl

    try:
        auth.update_user(token['user_id'], **data)
    except ValueError:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY)
