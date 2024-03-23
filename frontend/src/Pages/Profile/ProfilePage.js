import styled from "@emotion/styled";
import ClassApi from "../../Apis/Api";
import { Button, Divider, FormControlLabel, Grid, Radio, RadioGroup, TextField, ThemeProvider, Typography, createTheme} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { NavLink } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "400px",
          "& .MuiInputBase-input": {
            fontSize: "20px",
            padding: "5px",
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


export default function ProfilePage() {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cccd, setCccd] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [date, setDate] = useState();

  return (
      <Grid container rowSpacing={2} style={{ padding: "50px" }}>
        <Grid item xs={12}>
        <h1 style={{ fontSize: "40px" }}>Thông tin cá nhân</h1>
      </Grid>

        <ThemeProvider theme={theme}>

          <Grid item container alignItems="center">
            <Grid item xs={2}>
              <Typography variant="h4" fontWeight={400}>
                Họ và tên
              </Typography>
            </Grid>

            <Grid item xs={10}>
              <TextField
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></TextField>
            </Grid>
          </Grid>

          <Grid item container alignItems="center">
            <Grid item xs={2}>
              <Typography
                variant="h4"
                fontWeight={400}
                style={{ marginRight: "50px" }}
              >
                Giới tính
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <RadioGroup
                name="radio-buttons-group"
                value={value}
                style={{ display: "inline" }}
              >
                <FormControlLabel
                  value="Nam"
                  control={<Radio />}
                  label= <Typography fontSize={"20px"} fontWeight={400}>
                    Nam
                  </Typography>
                />
                <FormControlLabel
                  value="Nữ"
                  control={<Radio />}
                  label=<Typography fontSize={"20px"} fontWeight={400}>
                    Nữ
                  </Typography>
                />
              </RadioGroup>
            </Grid>
          </Grid>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item container alignItems="center">
              <Grid item xs={2}>
                <Typography variant="h4" fontWeight={400}>
                  Ngày sinh
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <CustomizedDatePicker
                  style={{ height: "30px" }}
                  value={date}
                  //onChange={handleDateChange}
                  onChange={(date) => setDate(date)}
                  format="DD-MM-YYYY"
                ></CustomizedDatePicker>
              </Grid>
            </Grid>
          </LocalizationProvider>

          <Grid item container alignItems="center">
            <Grid item xs={2}>
              <Typography variant="h4" fontWeight={400}>
                Địa chỉ&emsp;&ensp;
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              ></TextField>
            </Grid>
          </Grid>

          <Grid item container alignItems="center">
            <Grid item xs={2}>
              <Typography variant="h4" fontWeight={400}>
                CCCD&emsp;&ensp;&nbsp;
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                value={cccd}
                onChange={(e) => {
                  setCccd(e.target.value);
                }}
              ></TextField>
            </Grid>
          </Grid>

          <Grid item container alignItems="center">
            <Grid item xs={2}>
              <Typography variant="h4" fontWeight={400}>
                Email&emsp;&ensp;&nbsp;
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                value={cccd}
                onChange={(e) => {
                  setCccd(e.target.value);
                }}
              ></TextField>
            </Grid>
          </Grid>

          <Grid item container alignItems="center">
            <Grid item xs={2}>
              <Typography variant="h4" fontWeight={400}>
                Điện thoại
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              ></TextField>
            </Grid>
          </Grid>
          
        </ThemeProvider>
        <Divider style={{ margin: "30px 0px", backgroundColor: "black" }} />
        <Grid item>
          <NavLink to="./">
            <Button
              variant="contained"
              style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
            >
              <Typography
                variant="h5"
                fontWeight={500}
                fontSize={"20px"}
                style={{ color: "black" }}
              >
                Xác nhận
              </Typography>
            </Button>
          </NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/profile/password">
            <Button
              variant="contained"
              style={{ backgroundColor: "#79C9FF", margin: "30px 30px" }}
            >
              <Typography
                variant="h5"
                fontWeight={500}
                style={{ color: "black" }}
                fontSize={"20px"}
              >
                Đổi mật khẩu
              </Typography>
            </Button>
          </NavLink>
        </Grid>
      </Grid>
  );
}