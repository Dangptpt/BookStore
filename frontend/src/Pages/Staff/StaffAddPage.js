import styled from "@emotion/styled";
import ClassApi from "../../Apis/Api";
import { Button, Divider, FormControlLabel, Grid, Radio, RadioGroup, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "400px",
          "& .MuiInputBase-input": {
            fontSize: "30px",
            padding: "8px",
          },
          padding: "0px",
        },
      },
    },
  },
});

const CustomizedDatePicker = styled(DatePicker)`
& .MuiInputBase-input {
  font-size: 20px;
  width: 445px;
}
& .MuiInputLabel-root {
  font-size: 20px;
}
`;

export default function StaffAddPage() {
  const [staff_code, setStaffCode] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    if (staff_code == "" || password == "") {
      toast.warning("Vui lòng nhập đầy đủ thông tin!")
      return;
    }
    else {
      const data = {
        staff_code: staff_code,
        password: password
      }
      console.log(data)
      ClassApi.postNewStaff(data)
        .then((res) => {
          if (res.data.detail == "success")
            toast.success("Thêm nhân viên mới thành công!")
          else 
            toast.error("Tài khoản nhân viên đã tồn tại!")
        })
        .catch((err) => {
          toast.error("Thêm nhân viên mới thất bại!")
          console.log(err)
        })
    }
  }
  return (
    <Grid container spacing={1} style={{ padding: "40px", marginLeft: "20px", marginTop: "-50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "43px" }}>
          Thêm nhân viên
        </h1>
      </Grid>

      <ThemeProvider theme={theme}>
        <Grid item container alignItems="center" sx={{ mt: 1 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Tài khoản nhân viên
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={staff_code}
              onChange={(e) => {setStaffCode(e.target.value)}}
              style={{ width: "400px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>

        <Grid item container alignItems="center" sx={{ mt: 2 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Mật khẩu
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              style={{ width: "400px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>


      </ThemeProvider>
      <Grid item sx={{ mt: 2 }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#79C9FF",
            margin: "30px 0px",
            fontSize: "20px",
            color: "black",
            fontWeight: "500",
          }}
          onClick={handleSubmit}
          type="submit"
        >
          Xác nhận
        </Button>

        <NavLink to="/staff">
          <Button
            variant="contained"
            style={{
              backgroundColor: "#FA7070",
              marginLeft: "50px",
              fontSize: "20px",
              color: "black",
              fontWeight: "500",
            }}
          >
            Hủy
          </Button>
        </NavLink>
      </Grid>
    </Grid>
  );
}