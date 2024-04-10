from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.encoders import jsonable_encoder
from supabase import Client
from models.staff import StaffInfo, StaffRegister, StaffLogin 
from utils.exceptions import BAD_REQUEST
from typing import Annotated, List
from database.db_service import get_supabase
from datetime import date
import json

router = APIRouter(tags=["Staff"], prefix="/staff")

@router.get("/all")
async def get_all_staffs(
    supabase: Annotated[Client, Depends(get_supabase)]
):
  try:
    return supabase.table('staff').select('staff_code', 'name', 'id').execute().data
  except:
    return BAD_REQUEST

@router.get('/{id}')
async def get_by_id(
  supabase: Annotated[Client, Depends(get_supabase)],
  staff_id: int
):
  try:
    res = supabase.table('staff').select('*').eq('id', staff_id).execute().data
    return res
  except:
    return BAD_REQUEST

@router.post('')
async def create_new_staff(
  supabase: Annotated[Client, Depends(get_supabase)],
  staff_register: StaffRegister
):
  try:
    data = jsonable_encoder(staff_register)
    supabase.table('staff').insert(data).execute().data
    return {"detail": "success"}
  except:
    return BAD_REQUEST
  
@router.patch('info')
async def edit_infomation(
  supabase: Annotated[Client, Depends(get_supabase)],
  staff_info: StaffInfo,
  staff_id: int
):
  try:
    supabase.table('staff').update(jsonable_encoder(staff_info)).eq('id', staff_id).execute().data
    return {"detail": "success"}
  except:
    return BAD_REQUEST

@router.patch('password')
async def change_password(
  supabase: Annotated[Client, Depends(get_supabase)],
  staff_login: StaffLogin,
  staff_id: int
):
  try:
    supabase.table('staff').update(jsonable_encoder(staff_login)).eq('id', staff_id).execute().data
    return {"detail": "success"}
  except:
    return BAD_REQUEST
  
