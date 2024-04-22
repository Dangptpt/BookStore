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
from utils.auth import verify_password, get_password_hash, create_access_token, get_current_user

router = APIRouter(tags=["Staff"], prefix="/staff")


@router.get("/all")
async def get_all_staffs(
    supabase: Annotated[Client, Depends(get_supabase)],
    user = Depends(get_current_user)
):
  try:
    print (user)
    if user['role'] != 'admin':
      return FORBIDDEN
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
    staff_register.password = get_password_hash(staff_register.password)
    data = jsonable_encoder(staff_register)
    print(data)
    supabase.table('staff').insert(data).execute().data
    return {"detail": "success"}
  except:
    return BAD_REQUEST


@router.post('/login')
async def login(
  supabase: Annotated[Client, Depends(get_supabase)],
  login: StaffLogin
):
  try:
    user = supabase.table('staff').select('*').eq('staff_code', login.staff_code).execute().data
    if len(user) == 0:
      return {"detail": "failed",
              "description": 'User name doesn\'t exist'}
    
    if verify_password(login.password, user[0]['password']) == True: 
      token_data = TokenData(id=user[0]['id'], staff_code=user[0]['staff_code'], 
                             role= user[0]['role'], name= user[0]['name'])
      access_token = create_access_token(token_data.dict())
      return Token(access_token=access_token, token_type='bearer')
        
    else:
      return {"detail": "failed",
              "description": 'invalid password'}
    
  except:
    return BAD_REQUEST


@router.patch('/info')
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


@router.patch('/password')
async def change_password(
  supabase: Annotated[Client, Depends(get_supabase)],
  password: Password,
  staff_id: int
):
  try:
    oldpassword = supabase.table('staff').select('password').eq('id', staff_id).execute().data[0]['password']
    if verify_password(password.old_password, oldpassword) == True:
      supabase.table('staff').update({'password': get_password_hash(password.new_password)}).eq('id', staff_id).execute()
      return {"detail": "success"}
    else:
      return {"detail": "failed",
              "description": 'invalid old password'}
  except:
    return BAD_REQUEST
