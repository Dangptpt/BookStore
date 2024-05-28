import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassApi, { API_BASE_URL } from "../../Apis/Api";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
const defaultTheme = createTheme();

export default function LoginPage() {
  const navigate = useNavigate();
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const changeAccount = (e) => {
    setAccount(e.target.value)
  }
  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    console.log(account, password)
    ClassApi.postLogin(account, password).then((response) => {
      console.log(response.data)
      if (response.data.detail === "success") {
        sessionStorage.setItem('staff_code', response.data.staff_code);
        sessionStorage.setItem('role', response.data.role);
        sessionStorage.setItem('name', response.data.name);
        sessionStorage.setItem('token', response.data.token.access_token);
        sessionStorage.setItem('id', response.data.id);

        setTimeout(() => {
          navigate("/home")
          navigate(0)
        }, 500);
      } else {
        toast.warning(response.data.description)
      }
    }).catch((error) => {
      toast.error("Lỗi đăng nhập")
      console.error('Error fetching data:', error);
    });
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Đăng nhập
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Tài khoản"
              name="email"
              autoComplete="email"
              autoFocus
              value={account}
              onChange={e => changeAccount(e)}
              inputProps={{ style: { fontSize: "20px" } }}
              InputLabelProps={{ style: { fontSize: "18px" } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              value={password}
              onChange={e => changePassword(e)}
              autoComplete="current-password"
              inputProps={{ style: { fontSize: "20px" } }}
              InputLabelProps={{ style: { fontSize: "18px" } }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ fontSize: "18px" }}
              onClick={handleLogin}
            >
              Đăng nhập
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}