from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.encoders import jsonable_encoder
from supabase import Client
from models.staff import StaffInfo, StaffRegister, StaffLogin, Password 
from utils.exceptions import BAD_REQUEST, FORBIDDEN
from typing import Annotated, List
from database.db_service import get_supabase
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from models.token import Token, TokenData
from passlib.context import CryptContext
from utils.auth import verify_password, get_password_hash, create_access_token, get_current_user

router = APIRouter(tags=["Auth"], prefix="/auth")

@router.post('/token')
async def login(
    supabase: Annotated[Client, Depends(get_supabase)],
    login: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    try:
        print(login.username, login.password)
        user = supabase.table('staff').select('*').eq('staff_code', login.username).execute().data
        if len(user) == 0:
            return {"detail": "failed",
                    "description": 'username is not exist'}
        
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


@router.patch('/password')
async def change_password(
  supabase: Annotated[Client, Depends(get_supabase)],
  password: Password,
  staff_id: int,
  user = Depends(get_current_user),
):
  try:
    if (user == None):
      return FORBIDDEN
    oldpassword = supabase.table('staff').select('password').eq('id', staff_id).execute().data[0]['password']
    if verify_password(password.old_password, oldpassword) == True:
      supabase.table('staff').update({'password': get_password_hash(password.new_password)}).eq('id', staff_id).execute()
      return {"detail": "success"}
    else:
      return {"detail": "failed",
              "description": 'invalid old password'}
  except:
    return BAD_REQUEST


@router.post('/reset')
async def reset_password(
  supabase: Annotated[Client, Depends(get_supabase)],
  staff_id: int,
  user = Depends(get_current_user),
):
  try:
    pass
  except:
    return BAD_REQUEST