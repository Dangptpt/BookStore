from pydantic import BaseModel
from datetime import datetime

class BillPayment(BaseModel):
    book_id: int
    quantity: int
    price: int

class BillInfo(BaseModel):
    customer_name: str | None = None
    customer_phone_number: str | None = None
    cashier_name: str 
    description: str | None = None
    time_created: str
    amount: int

class Bill(BillInfo):
    bill_id : int 