from pydantic import BaseModel, Field
from datetime import date
from .enums import Role, Gender

class StaffBase(BaseModel):
    staff_code: str 
    
class StaffInfo(StaffBase):
    name: str | None = None
    address: str | None = None
    phone_number: str | None = None
    gender: Gender | None = None
    identity_card: str | None = None
    birth_date: date | None = None
    role: Role = Role.user
    email: str | None = None

class StaffLogin(StaffBase):
    password: str

class Password(BaseModel):
    old_password: str
    new_password: str
    
class StaffRegister(StaffLogin, StaffInfo, StaffBase):
    pass
