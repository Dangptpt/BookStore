from pydantic import BaseModel
class BookInfo(BaseModel):
    name: str
    category: str
    author: str
    price: float
    publish_year: int | None
    publish_company: str | None
    quantity: int

class Book(BookInfo):
    book_id: int