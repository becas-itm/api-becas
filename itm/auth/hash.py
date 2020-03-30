import bcrypt


class HashService:
    @staticmethod
    def hash(string: str):
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(HashService._encode(string), salt)
        return hashed.decode('utf8')

    @staticmethod
    def _encode(string):
        return bytes(string.encode('utf8'))

    @staticmethod
    def compare(plain: str, hashed: str):
        return bcrypt.checkpw(HashService._encode(plain), HashService._encode(hashed))
