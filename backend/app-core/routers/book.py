from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    UploadFile,
    status,
    Security,
)
from supabase import Client
from models.book import BookInfo
from utils.exceptions import BAD_REQUEST
from typing import Annotated, List
from database.db_service import get_supabase
router = APIRouter(tags=["Book"], prefix="/book")

supabase = get_supabase()

@router.get("/all", description="Get list of all books")
async def getAllBooks(
):
  try:
    res = supabase.table("Book").select('*').execute().dict()["data"]
    return res
  except:
    raise BAD_REQUEST
  
@router.post("", description="post new book")
async def postBook(
    book_info: BookInfo,
):
  try:
    supabase.table('Book').insert( {
      "name": book_info.name,
      "category": book_info.category,
      "author": book_info.author,
      "price": book_info.price,
      "publish_year": book_info.publish_year,
      "publish_company": book_info.publish_company,
      "quantity": book_info.quantity,
    }).execute()
    return {"detail": "success"}
  except:
    raise BAD_REQUEST