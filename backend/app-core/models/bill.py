from pydantic import BaseModel
import datetime

class BillInfo(BaseModel):
    customer_name: str | None
    phone_number: str | None
    address: str | None
    cahsier_name: str | None
    time_created: datetime
    description: str | None
    cost: float
    
class Bill(BillInfo):
    bill_id : int