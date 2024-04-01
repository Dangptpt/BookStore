from pydantic import BaseModel

class ImportInfo(BaseModel):
    code: str
    import_staff_name: str
    supplier: str
    delivery_staff_name: str
    description: str | None = None
    cost: float

class Import(ImportInfo):
    import_id: int