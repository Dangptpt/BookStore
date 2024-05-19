from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.encoders import jsonable_encoder
from supabase import Client
from utils.exceptions import BAD_REQUEST
from typing import Annotated, List
from database.db_service import get_supabase
from datetime import date, datetime
import json
from utils.auth import get_current_user


router = APIRouter(tags=["Statistic"], prefix="/statistic")

@router.get('')
async def get_statistic_by_day(
  supabase: Annotated[Client, Depends(get_supabase)],
  day: str,
  user = Depends(get_current_user)
):
  try:

    # start = datetime(year=datetime.now().year, month=datetime.now().month, day=datetime.now().day, hour=0, minute=0, second=0)
    # end = datetime(year=datetime.now().year, month=datetime.now().month, day=datetime.now().day, hour=23, minute=59, second=59)
    # # today = str(date.today())
    # print (start, end)
    
    start = day + "T00:00:00Z"
    end = day + "T23:59:59Z"
    print(start, end)
    data = supabase.table('bill').select(
         'payment', 'amount').gte(
          'time_created', start).lte('time_created', end).execute().data

    total_amount = 0
    total_book = 0  
    marks = []
    list_book = []
    for bill in data:
      total_amount += bill['amount']
      for pay in bill['payment']:
        total_book += pay['quantity']
        if pay['book_id'] not in marks:
          marks.append(pay['book_id'])
          book = supabase.table('book').select("name", "id").eq("id", pay['book_id']).execute().data[0]
          list_book.append({
            name: book['name'],
            quantity: pay['quantity'],
            price: pay['price'],
            id: book['id']
          })
        else:
          for book in list_book:
            if book['id'] == pay['book_id']:
              book['quantity'] += pay['quantity']

    return {
      "total_bill": len(data),
      "total_amount": total_amount,
      "total_book": total_book
    }
  except:
    return BAD_REQUEST

