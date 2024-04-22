from enum import Enum

class Role(str, Enum):
    user = "user"
    admin = "admin"

class Gender(Enum):
    male = True
    female = False