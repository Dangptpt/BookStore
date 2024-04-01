from pydantic import BaseModel, Field
from datetime import date
from .enums import Role, Gender

class StaffBase(BaseModel):
    username: str 
class StaffInfo(StaffBase):
    name: str
    address: str
    phone_number: str
    gender: Gender
    identity_card: str
    birth_date: date
    role: Role = Role.user
    email: str = Field(example="dangptpt@gmail.com")

class StaffLogin(BaseModel):
    password: str

class Staff(StaffInfo, StaffBase):
    pass

class StaffRegister(StaffLogin, StaffInfo, StaffBase):
    pass
