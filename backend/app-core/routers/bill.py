from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.encoders import jsonable_encoder
from supabase import Client
from models.bill import BillInfo, BillPayment
from utils.exceptions import BAD_REQUEST
from typing import Annotated, List
from database.db_service import get_supabase
from datetime import datetime
import json

router = APIRouter(tags=["Bill"], prefix="/bill")

@router.get("/all")
async def get_all_bills(
  supabase: Annotated[Client, Depends(get_supabase)],
):
  try:
    bill_list = supabase.table('bill').select('*').execute().data
    return bill_list
  except:
    raise BAD_REQUEST

@router.get("/{id}")
async def get_bill_by_id(
  supabase: Annotated[Client, Depends(get_supabase)],
  id: int
):
  try:
    bill = supabase.table('bill').select('*').eq('id', id).execute().data
    return bill
  except:
    return BAD_REQUEST

@router.get("")
async def get_bill_by_element(
  supabase: Annotated[Client, Depends(get_supabase)],
  start_time: datetime | None = None,
  end_time: datetime | None = None,
  bill_id: int | None = None
):
  try:
    if end_time == None:
      end_time = datetime.max
    if start_time == None:
      start_time = datetime.min
    if bill_id == None:
      bills = supabase.table('bill').select(
        'id', 'customer_name', 'time_created', 'amount').gte(
          'time_created', start_time).lte('time_created', end_time).execute().data
    else :
      bills = supabase.table('bill').select('*').eq('id', bill_id).execute().data
    return bills
  except:
    return BAD_REQUEST
  
@router.post("")
async def create_bill(
  supabase: Annotated[Client, Depends(get_supabase)],
  bill_info: BillInfo,
  bill_payments: List[BillPayment]
):
  try:
      data = {
        "customer_name": bill_info.customer_name,
        "customer_phone_number": bill_info.customer_phone_number,
        "customer_address": bill_info.customer_address,
        "cashier_name": bill_info.cashier_name,
        "time_created": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
        "amount": bill_info.amount,
        "description": bill_info.description,
        "payment": json.loads(json.dumps(bill_payments, default=lambda o: o.__dict__))
      }
      print(data)
      supabase.table('bill').insert(data).execute()
        
      return {"detail": "success"}

  except:
    raise BAD_REQUEST
  
@router.patch("")
async def edit_bill(
  supabase: Annotated[Client, Depends(get_supabase)],
  bill_id: int,
  bill_info: BillInfo,
  bill_payment: BillPayment
):
  pass
