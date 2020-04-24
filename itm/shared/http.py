from fastapi import HTTPException, status


class NotFound(HTTPException):
    code = status.HTTP_404_NOT_FOUND

    def __init__(self, detail=None, headers=None):
        super().__init__(self.code, detail, headers)


class BadRequest(HTTPException):
    code = status.HTTP_400_BAD_REQUEST

    def __init__(self, detail=None, headers=None):
        super().__init__(self.code, detail, headers)


class Forbidden(HTTPException):
    code = status.HTTP_403_FORBIDDEN

    def __init__(self, detail=None, headers=None):
        super().__init__(self.code, detail, headers)


class Unauthorized(HTTPException):
    code = status.HTTP_401_UNAUTHORIZED

    def __init__(self, detail=None, headers=None):
        super().__init__(self.code, detail, headers)


class UnprocessableEntity(HTTPException):
    code = status.HTTP_422_UNPROCESSABLE_ENTITY

    def __init__(self, detail=None, headers=None):
        super().__init__(self.code, detail, headers)


class TooManyRequests(HTTPException):
    code = status.HTTP_429_TOO_MANY_REQUESTS

    def __init__(self, detail=None, headers=None):
        super().__init__(self.code, detail, headers)
