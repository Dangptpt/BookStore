from pydantic import BaseModel
from datetime import datetime

class ImportList(BaseModel):
    book_id: int
    quantity: int

class ImportInfo(BaseModel):
    code: str
    staff_name: str
    supplier: str
    delivery_name: str
    description: str | None = None
    cost: int
    date_created: datetime

class Import(ImportInfo):
    import_id: int