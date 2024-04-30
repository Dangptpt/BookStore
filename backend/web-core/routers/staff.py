from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.encoders import jsonable_encoder
from supabase import Client
from models.staff import StaffInfo, StaffRegister, StaffLogin, Password 
from utils.exceptions import BAD_REQUEST, FORBIDDEN
from typing import Annotated, List
from database.db_service import get_supabase
from datetime import datetime, timedelta, timezone
from models.token import Token, TokenData
from jose import JWTError, jwt
from passlib.context import CryptContext
from utils.auth import get_password_hash, get_current_user

router = APIRouter(tags=["Staff"], prefix="/staff")

@router.get("/all")
async def get_all_staffs(
    supabase: Annotated[Client, Depends(get_supabase)],
    user = Depends(get_current_user)
):
  try:
    if user['role'] != 'admin':
      return FORBIDDEN
    return supabase.table('staff').select('staff_code', 'name', 'id').execute().data
  except:
    return BAD_REQUEST


@router.get('/{id}')
async def get_by_id(
  supabase: Annotated[Client, Depends(get_supabase)],
  staff_id: int,
  user = Depends(get_current_user),
):
  try:
    if user['role'] != 'admin':
      return FORBIDDEN
    res = supabase.table('staff').select('*').eq('id', staff_id).execute().data
    return res
  except:
    return BAD_REQUEST

@router.post('')
async def create_new_staff(
  supabase: Annotated[Client, Depends(get_supabase)],
  staff_register: StaffRegister,
  user = Depends(get_current_user),
):
  try:
    if user['role'] != 'admin':
        return FORBIDDEN
    staff_register.password = get_password_hash(staff_register.password)
    data = jsonable_encoder(staff_register)
    print(data)
    supabase.table('staff').insert(data).execute().data
    return {"detail": "success"}
  except:
    return BAD_REQUEST


@router.patch('/info')
async def edit_infomation(
  supabase: Annotated[Client, Depends(get_supabase)],
  staff_info: StaffInfo,
  staff_id: int,
  user = Depends(get_current_user),
):
  try:
    if user['role'] != 'user':
      return FORBIDDEN
    supabase.table('staff').update(jsonable_encoder(staff_info)).eq('id', staff_id).execute().data
    return {"detail": "success"}
  except:
    return BAD_REQUEST
