from pydantic import BaseModel

class BookInfo(BaseModel):
    name: str
    category: str | None = None
    author: str | None = None 
    price: int
    publish_year: int | None = None
    publish_company: str | None = None

class Book(BaseModel):
    book_id: int
    quantity: int
