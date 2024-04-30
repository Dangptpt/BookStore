from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.encoders import jsonable_encoder
from supabase import Client
from models.import_bill import ImportInfo, ImportList 
from utils.exceptions import BAD_REQUEST
from typing import Annotated, List
from database.db_service import get_supabase
from datetime import date
import json
from utils.auth import get_current_user


router = APIRouter(tags=["Import"], prefix="/import")

@router.get("/all")
async def get_all_import(
  supabase: Annotated[Client, Depends(get_supabase)],
  user = Depends(get_current_user)
):
  try:
    res = supabase.table('import_bill').select('code', 'staff_name', 'id', 'date_created').execute().data
    return res
  except: 
    return BAD_REQUEST

@router.get("/{id}")
async def get_by_id(
  supabase: Annotated[Client, Depends(get_supabase)],
  import_id: int,
  user = Depends(get_current_user)
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
  user = Depends(get_current_user)
):
  try:
    if end_time == None:
      end_time = date.max
    if start_time == None:
      start_time = date.min
    print (start_time, end_time)
    import_bills = supabase.table('import_bill').select('*').gte(
      'date_created', start_time).lte('date_created', end_time).execute().data
    return import_bills
  
  except:
    return BAD_REQUEST

@router.post('')
async def create_import(
  supabase: Annotated[Client, Depends(get_supabase)],
  import_info: ImportInfo,
  import_list: List[ImportList],
  user = Depends(get_current_user)
):
  try:
    data = {
      "code": import_info.code,
      'staff_name': import_info.staff_name,
      'supplier': import_info.supplier,
      'delivery_name': import_info.delivery_name,
      'description': import_info.description,
      'date_created': date.today().strftime("%Y-%m-%d"),
      'cost': import_info.cost,
      'import_list': json.loads(json.dumps(import_list, default=lambda o: o.__dict__))
    }
    print(data)
    supabase.table('import_bill').insert(data).execute()

    return {"detail": "success"} 
  except:
    return BAD_REQUEST
  
    
@router.patch('')
async def edit_import_bill(
  supabase: Annotated[Client, Depends(get_supabase)],
  import_info: ImportInfo,
  id: int,
  user = Depends(get_current_user)
):
  try:
    supabase.table('import_bill').update(jsonable_encoder(import_info)).eq("id", id).execute()
    return {"detail": "success"}
  except:
    raise BAD_REQUEST