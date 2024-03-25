import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function LoginPage() {
  const navigate = useNavigate();
  const [account, setAccount] = useState('')
  const changeAccount = (e) => {
    setAccount(e.target.value)
  }
  const handleLogin = () => {
    if (account === 'admin') sessionStorage.setItem('role', "admin");
    else sessionStorage.setItem('role', 'user');
    setTimeout(() => {navigate("/home")
  }, 1000);
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
            Sign in
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
              value = {account}
              onChange={e => changeAccount(e)}
              inputProps={{style : {fontSize: "20px"}}}
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
              autoComplete="current-password"
              inputProps={{style : {fontSize: "20px"}}}
              InputLabelProps={{ style: { fontSize: "18px" } }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{fontSize: "18px"}}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}