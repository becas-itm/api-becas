from datetime import datetime


class ScholarshipArchived:
    def __init__(self, scholarship_id, timestamp):
        self.scholarship_id = scholarship_id
        self.timestamp = timestamp

    @classmethod
    def fire(cls, scholarship_id):
        return cls(scholarship_id, datetime.utcnow())


class ScholarshipRestored:
    def __init__(self, scholarship_id):
        self.scholarship_id = scholarship_id

    @classmethod
    def fire(cls, scholarship_id):
        return cls(scholarship_id)
