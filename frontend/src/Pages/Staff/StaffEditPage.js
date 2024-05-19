import styled from "@emotion/styled";
import { Button, Divider, FormControlLabel, Grid, Radio, RadioGroup, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { NavLink, useParams } from "react-router-dom";
import ClassAPi from '../../Apis/Api'
import dayjs from "dayjs";
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

export default function StaffEditPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cccd, setCccd] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [date, setDate] = useState(null);
  const [gender, setGender] = useState(true);
  const param = useParams()
  useEffect(() => {
    ClassAPi.getStaffById(param.id)
      .then((respone) => {
        const data=respone.data
        console.log(data)
        setAddress(data.address)
        setName(data.name)
        setDate(data.birth_date)
        setEmail(data.email)
        setPhoneNumber(data.phone_number)
        setGender(data.gender)
        setCccd(data.identity_card)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  return (
    <Grid container spacing={1} style={{ padding: "40px", marginLeft: "20px", marginTop: "-50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "43px" }}>
          Thông tin nhân viên
        </h1>
      </Grid>

      <ThemeProvider theme={theme}>
        <Grid item container alignItems="center">
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Họ và tên
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={name}
              style={{ width: "400px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>
      
        <Grid item container alignItems="center" sx={{ mt: 1 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Giới tính
            </Typography>
          </Grid>

          <Grid item xs={10}>
            <RadioGroup
              name="radio-buttons-group"
              style={{ display: "inline" }}
              value={gender == true ? 'Nam' : "Nữ"}
            >
              <FormControlLabel
                value="Nam"
                control={<Radio />}
                label=<Typography fontSize={"20px"} fontWeight={400}>
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
          <Grid item container alignItems="center" sx={{ mt: 1 }}>
            <Grid xs={2}>
              <Typography style={{ fontSize: "24px" }}>
                Ngày sinh
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <CustomizedDatePicker
                style={{ height: "30px" }}
                value={dayjs(date)}
                //onChange={handleDateChange}
                onChange={(date) => setDate(date)}
                format="DD-MM-YYYY"
              ></CustomizedDatePicker>
            </Grid>
          </Grid>
        </LocalizationProvider>

        <Grid item container alignItems="center" sx={{ mt: 1 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Địa chỉ
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>

        <Grid item container alignItems="center" sx={{ mt: 1 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              CCCD
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              value={cccd}
              onChange={(e) => {
                setCccd(e.target.value);
              }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>

        <Grid item container alignItems="center" sx={{ mt: 1 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Email
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              value={email}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>

        <Grid item container alignItems="center" sx={{ mt: 1 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Số điện thoại
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
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