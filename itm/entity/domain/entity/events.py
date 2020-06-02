class EntityUpdated:
    def __init__(self, old_code, code, name, website):
        self.old_code = old_code
        self.code = code
        self.name = name
        self.website = website

    @classmethod
    def fire(cls, old_code, code, name, website):
        return cls(old_code, code, name, website)
