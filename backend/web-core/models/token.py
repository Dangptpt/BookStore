from pydantic import BaseModel

class TokenData(BaseModel):
    id: int
    staff_code: str
    role: str
    name: str

class Token(BaseModel):
    access_token: str 
    token_type: str