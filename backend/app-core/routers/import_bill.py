from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.encoders import jsonable_encoder
from supabase import Client
from models.import_bill import ImportInfo, ImportList 
from utils.exceptions import BAD_REQUEST
from typing import Annotated, List
from database.db_service import get_supabase
from datetime import date
import json

router = APIRouter(tags=["Import"], prefix="/import")

@router.get("/all")
async def get_all_import(
  supabase: Annotated[Client, Depends(get_supabase)],
):
  try:
    res = supabase.table('import_bill').select('code', 'staff_name', 'id', 'date_created').execute().data
    return res
  except: 
    return BAD_REQUEST

@router.get("/{id}")
async def get_by_id(
  supabase: Annotated[Client, Depends(get_supabase)],
  import_id: int
):
  try:
    res = supabase.table('import_bill').select('*').eq('id', import_id).execute().data
    return res
  except:
    return BAD_REQUEST

@router.get('')
async def get_by_element(
  supabase: Annotated[Client, Depends(get_supabase)],
  start_time: date | None = None,
  end_time: date | None = None,
):
  try:
    if end_time == None:
      end_time = date.max
    if start_time == None:
      start_time = date.min

    import_bills = supabase.table('import_bill').select(
      'id', 'customer_name', 'time_created', 'amount').gte(
        'time_created', start_time).lte('time_created', end_time).execute().data
    return import_bills
  
  except:
    return BAD_REQUEST

@router.post('')
async def create_import(
  supabase: Annotated[Client, Depends(get_supabase)],
  import_info: ImportInfo,
  import_list: ImportList
):
  try:
    data = {
      "code": import_info.code,
      'staff_name': import_info.staff_name,
      'supplier': import_info.supplier,
      'delivery_name': import_info.delivery_name,
      'description': import_info.description,
      'date_created': date.today(),
      'cost': import_info.cost,
      'list_import': json.loads(json.dumps(import_list, default=lambda o: o.__dict__))
    }
    supabase.table('import_bill').insert(data).execute()

    return {"detail": "success"} 
  except:
    return BAD_REQUEST
  
    
