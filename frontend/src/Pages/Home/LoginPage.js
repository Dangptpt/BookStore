import { Api, Password } from "@mui/icons-material";
import { Alert, Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassApi, { API_BASE_URL } from "../../Apis/Api";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    border: "1px solid black",
    width: "50vw",
    height: "50vh",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  input: {
    "& .MuiInputBase-input": { fontSize: 20 },
    "& .MuiInputLabel-root": { fontSize: 20 },

    width: "90%",
  },
  tk_mk: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};
function LoginPage() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");
  const role = sessionStorage.getItem("role");
  const [message, setMessage] = useState('')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const changeAccount = (e) => {
    setAccount(e.target.value)
  }
  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    // ClassApi.PostLogin(account, password).then((response) => {

    //   if (response.data.message === "Success") {

    //     sessionStorage.setItem('user', response.data.data.id);
    //     sessionStorage.setItem('role', response.data.role);
    //     sessionStorage.setItem('token', response.data.data.token);

    //     setTimeout(function(){
    //       // delay wait for session storage
    //     }, 1000);

    //     if(response.data.role == "user"){
    //       navigate("/home")
    //     } else navigate("/admin")

    //   } else {
    //     setMessage(response.data.message)
    //     toast.warning(response.data.message)
    //   }

    // }).catch((error) => {
    //   toast.error("Lỗi đăng nhập")
    //   console.error('Error fetching data:', error);

    // });
    if (account === 'admin') sessionStorage.setItem('role', "admin");
    else sessionStorage.setItem('role', 'user');

    setTimeout(() => {navigate("/home")
  }, 1000);


  };

  return (
    <Box sx={styles.root}>

      <Typography variant="h2">Đăng nhập</Typography>
      <Grid container spacing={1} alignItems="center" sx={styles.tk_mk} p={5}>
        <Grid item xs={3.5} sx={{ textAlign: "center" }}>
          <Typography variant="h4">Tài khoản</Typography>
        </Grid>
        <Grid item xs={8.5} sx={{ justifyContent: "center" }}>
          <TextField margin="normal" sx={styles.input} size="small" value={account} onChange={e => changeAccount(e)} />
        </Grid>
        <Grid item xs={3.5} sx={{ textAlign: "center" }}>
          <Typography variant="h4">Mật khẩu</Typography>
        </Grid>
        <Grid item xs={8.5}>
          <TextField
            type="password"
            margin="normal"
            sx={styles.input}
            size="small"
            value={password}
            onChange={e => changePassword(e)}

            onKeyDown={(e) => { if (e.key == "Enter") { handleLogin() } }}
          />
        </Grid>
        <Grid item xs={6} textAlign='center' paddingBottom='20px'>
          <p style={{ color: 'red' }}>{message}</p>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        sx={{ width: "200px", height: "40px", fontSize: "20px", marginTop: '30px' }}
        onClick={handleLogin}

      >
        Đăng nhập
      </Button>
    </Box>
  );
}
export default LoginPage;
