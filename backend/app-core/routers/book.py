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


@router.get("/all", description="Get list of all books")
async def getAllBooks(
  supabase: Annotated[Client, Depends(get_supabase)],
):
  res = supabase.table("book").select('*').execute().dict()["data"]
  return res

@router.get("/all/{id}", description="Get list of all books")
async def getAllBooks(
  supabase: Annotated[Client, Depends(get_supabase)],
  id: int 
):
  res = supabase.table("book").select('*').eq("id", id).execute().dict()["data"]
  return res
 
  
@router.post("", description="post new book")
async def postBook(
    supabase: Annotated[Client, Depends(get_supabase)],
    book_info: BookInfo,
):
  try:
    supabase.table('book').insert( {
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