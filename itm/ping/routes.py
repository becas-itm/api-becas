from fastapi import APIRouter

router = APIRouter()


@router.get('/')
def list_users():
    return {"status": "It's alive"}