from datetime import datetime

from pydantic import BaseModel

from itm.shared.domain.errors import DomainError


class CreateUserRequest(BaseModel):
    displayName: str
    email: str
    gender: str
    password: str


class CreateUser:
    def __init__(self, user_model, hash_service, payload: CreateUserRequest):
        self.user_model = user_model
        self.hash_service = hash_service
        self.payload = payload

    def execute(self):
        if self.user_model.find_by_email(self.payload.email):
            raise DomainError('Already exists')

        user = self.user_model(name=self.payload.displayName,
                               email=self.payload.email,
                               gender=self.payload.gender,
                               password=self.hash_service.hash(self.payload.password),
                               verifiedAt=datetime.utcnow())
        user.save(refresh=True)
