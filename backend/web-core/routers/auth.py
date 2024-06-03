import os
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Security, Request, Form
from fastapi.encoders import jsonable_encoder
from supabase import Client
from models.staff import  StaffLogin, Password 
from utils.exceptions import BAD_REQUEST, FORBIDDEN, NOT_FOUND
from typing import Annotated, List
from database.db_service import get_supabase
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from models.token import Token, TokenData
from passlib.context import CryptContext
from utils.auth import verify_password, get_password_hash, create_access_token, get_current_user
import smtplib
from email.message import EmailMessage

load_dotenv()

HOST = os.getenv("MAIL_HOST")
USERNAME = os.getenv("MAIL_USERNAME")
PASSWORD = os.getenv("MAIL_PASSWORD")
PORT = os.getenv("MAIL_PORT")


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
              "description": 'Tài khoản không tồn tại'}
    name  = user[0]['name']
    if name == None:
       name = ''
    if verify_password(login.password, user[0]['password']) == True: 
      token_data = TokenData(id=user[0]['id'], staff_code=user[0]['staff_code'], 
                             role=user[0]['role'], name=name)
      access_token = create_access_token(token_data.dict())
      return {
          'token': Token(access_token=access_token, token_type='bearer'),
          'detail': 'success',
          'id': user[0]['id'],
          'role': user[0]['role'],
          'staff_code': user[0]['staff_code'],
          'name': user[0]['name']

      }
        
    else:
      return {"detail": "failed",
              "description": 'Sai mật khẩu'}
    
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
  staff_code: str,
):
  try:
    data = supabase.table('staff').select('email').eq('staff_code', staff_code).execute().data
    if len(data) == 0:
      return {"detail": "failed",
              "description": 'invalid id'}
    print(data)
    reset_password = generate_password(8)  
    to_email = data[0]['email']
    subject = 'RESET PASSWORD'
    from_email = USERNAME

     # create email
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = from_email
    msg['To'] = to_email
    msg.set_content(f'Mật khẩu mới của bạn: {reset_password} ')
    
    try:
      supabase.table('staff').update({'password': get_password_hash(reset_password)}).eq('staff_code', staff_code).execute()
    except:
       return BAD_REQUEST

    # send email
    try:
      with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
          print (msg)
          smtp.login(USERNAME, PASSWORD)
          smtp.send_message(msg)

      return {"detail": "success",
            "description": 'ohhh~'}
    except:
      return NOT_FOUND
  
  except:
    return BAD_REQUEST

import string
import random  

def generate_password(length=8):
    characters = string.ascii_letters + string.digits
    
    password = ''.join(random.choice(characters) for i in range(length))
    
    return password
   