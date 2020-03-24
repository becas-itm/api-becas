from fastapi import HTTPException


class NotFound(HTTPException):
    code = 404

    def __init__(self, detail=None, headers=None):
        super().__init__(self.code, detail, headers)


class Forbidden(HTTPException):
    code = 403

    def __init__(self, detail=None, headers=None):
        super().__init__(self.code, detail, headers)


class Unauthorized(HTTPException):
    code = 401

    def __init__(self, detail=None, headers=None):
        super().__init__(self.code, detail, headers)
