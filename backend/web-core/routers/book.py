from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.encoders import jsonable_encoder
from supabase import Client
from models.book import BookInfo, Book
from utils.exceptions import BAD_REQUEST
from typing import Annotated, List
from database.db_service import get_supabase
import string

router = APIRouter(tags=["Book"], prefix="/book")


@router.get("/all", description="Get list of all books")
async def get_all_book(
  supabase: Annotated[Client, Depends(get_supabase)],
):
  res = supabase.table("book").select('*').execute().data
  return res

@router.get("/{id}", description="Get book by id")
async def get_book_by_id(
  supabase: Annotated[Client, Depends(get_supabase)],
  id: int 
):
  res = supabase.table("book").select('*').eq("id", id).execute().data
  return res
 
@router.get("/", description='get book by name, author and category')
async def get_book_by_elements(
  supabase: Annotated[Client, Depends(get_supabase)],
  name: str | None = None,
  author: str | None = None,
  category: str | None = None
):
  if name == None:
    name = '\0'
  else :
    name = '\\' + name
  if author == None:
    author = '\0'
  else:
    author = '\\' + author
  if category == None:
    category = '\0'
  else:
    category = '\\' + category
  try:
    res = supabase.table('book').select('*').ilike(
      'name', '%{}%'.format(name)).ilike(
      'author', '%{}%'.format(author)).ilike(
      'category', '%{}%'.format(category)).execute().data
    return res
  except:
    return BAD_REQUEST
    
@router.post("", description="post new book")
async def postBook(
    supabase: Annotated[Client, Depends(get_supabase)],
    book_info: BookInfo,
):
  try:
    supabase.table('book').insert(jsonable_encoder(book_info)).execute()
    return {"detail": "success"}
  except:
    raise BAD_REQUEST
  
@router.patch("", description='edit a book')
async def eidt_book(
  supabase: Annotated[Client, Depends(get_supabase)],
  book_info: BookInfo,
  book_id: int
):
  try:
    supabase.table('book').update(jsonable_encoder(book_info)).eq("id", book_id).execute()
    return {"detail": "success"}
  except:
    raise BAD_REQUEST

@router.patch("quantity")
async def eidt_quantity_book(
  supabase: Annotated[Client, Depends(get_supabase)],
  books: List[Book]
):
  try:
    for book in books:
      supabase.table('book').update({"quantity": book.quantity}).eq('id', book.book_id).execute()
    return {"detail": "success"}
  except:
    raise BAD_REQUEST




  