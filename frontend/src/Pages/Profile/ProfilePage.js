import styled from "@emotion/styled";
import { Button, Divider, FormControlLabel, Grid, Radio, RadioGroup, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import ClassAPi from '../../Apis/Api'

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "400px",
          "& .MuiInputBase-input": {
            fontSize: "20px",
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

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cccd, setCccd] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [date, setDate] = useState(null);
  const [gender, setGender] = useState(true);
  const id = sessionStorage.getItem('id')
  useEffect(() => {
    ClassAPi.getStaffById(id)
      .then((respone) => {
        const data=respone.data
        console.log(data)
        setAddress(data.address)
        setName(data.name)
        setDate(data.birth_date)
        setEmail(data.email)
        setPhoneNumber(data.phone_number)
        // if (data.gender === true) setGender('Nam')
        // else setGender('Nữ')
        setGender(data.gender)
        setCccd(data.identity_card)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);
  const handleSubmit = (e) => {
    let birth_date
    if (typeof date === 'string') birth_date = date;
    else {
      const offsetMinutes = 7 * 60 * 60000;
      birth_date = new Date(date + offsetMinutes)
      birth_date = birth_date.toISOString()
    }
    const data = {
      staff_code: sessionStorage.getItem('staff_code'),
      name: name,
      address: address,
      phone_number: phoneNumber,
      gender: gender,
      identity_card: cccd,
      birth_date: birth_date,
      role: sessionStorage.getItem('role'),
      email: email
    }
    console.log(data)
    ClassAPi.editStaff(id, data)
      .then((respone) => {
        toast.success('Cập nhật thông tin thành công')
      })
      .catch((err) => {
        toast.error("Tạo hóa đơn thất bại")
        console.log(err)
      })
    }

  return (
    <Grid container spacing={1} style={{ padding: "40px", marginLeft: "20px", marginTop: "-50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "43px" }}>
          Thông tin cá nhân
        </h1>
      </Grid>

      <ThemeProvider theme={theme}>
        <Grid item container alignItems="center">
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Họ và tên
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              value={name}
              onChange={(e) => {setName(e.target.value)}}
              style={{ width: "400px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>
      
        <Grid item container alignItems="center">
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
              onChange={(e) => {
                if(e.target.value == "Nam")
                  setGender(true)
                else setGender(false)
              }}
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
          <Grid item container alignItems="center">
            <Grid xs={2}>
              <Typography style={{ fontSize: "24px" }}>
                Ngày sinh
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <CustomizedDatePicker
                style={{ height: "30px" }}
                value={dayjs(date)}
                onChange={(date) => setDate(date)}
                format="DD-MM-YYYY"
              ></CustomizedDatePicker>
            </Grid>
          </Grid>
        </LocalizationProvider>

        <Grid item container alignItems="center">
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

        <Grid item container alignItems="center">
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
        <Grid item container alignItems="center">
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Email
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>

        <Grid item container alignItems="center">
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
      <Divider style={{ margin: "30px 0px", backgroundColor: "black" }} />
      <Grid item>
        <NavLink to="./">
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
            onClick={handleSubmit}
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