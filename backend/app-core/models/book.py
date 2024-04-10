from pydantic import BaseModel

class BookInfo(BaseModel):
    name: str
    category: str
    author: str
    price: int
    publish_year: int | None
    publish_company: str | None

class Book(BaseModel):
    book_id: int
    quantity: int
