from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.encoders import jsonable_encoder
from supabase import Client
from models.staff import StaffInfo, StaffRegister, StaffLogin, Password 
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
    print(data)
    supabase.table('staff').insert(data).execute().data
    return {"detail": "success"}
  except:
    return BAD_REQUEST
  

@router.post('login')
async def login(
  supabase: Annotated[Client, Depends(get_supabase)],
  login: StaffLogin
):
  try:
    user_name = supabase.table('staff').select('password').eq('staff_code', login.staff_code).execute().data
    if len(user_name) == 0:
      return {"detail": "failed",
              "description": 'User name doesn\'t exist'}
    if user_name[0]['password'] == login.password:
      return {"detail": "success"}
    else:
      return {"detail": "failed",
              "description": 'invalid password'}
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
  password: Password,
  staff_id: int
):
  try:
    oldpassword = supabase.table('staff').select('password').eq('id', staff_id).execute().data[0]['password']
    if (oldpassword == password.old_password):
      supabase.table('staff').update({'password': password.new_password}).eq('id', staff_id).execute()
      return {"detail": "success"}
    else:
      return {"detail": "failed",
              "description": 'invalid old password'}
  except:
    return BAD_REQUEST
