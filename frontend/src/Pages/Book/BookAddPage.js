import React, { useEffect, useMemo } from "react";
import { Grid, Typography, TextField, Paper, Button, ThemeProvider, createTheme } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NavLink } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import styled from "@emotion/styled";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "400px",
          "& .MuiInputBase-input": {
            fontSize: "30px",
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

export default function BookAddPage() {
  return (
    <Grid container spacing={1} style={{ padding: "40px", marginLeft: "20px", marginTop: "-50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "43px" }}>
          Thêm sách mới
        </h1>
      </Grid>

      <ThemeProvider theme={theme}>
        <Grid item container alignItems="center">

        <Grid item container alignItems="center">
            <Grid xs={2}>
              <Typography style={{ fontSize: "24px" }}>
                Tên sách
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                style={{ width: "400px", marginLeft: "-50px" }}
                inputProps={{ style: { fontSize: "20px" } }}
              ></TextField>
            </Grid>
          </Grid>

          <Grid item container alignItems="center" sx={{ mt: 3 }}>
            <Grid xs={2}>
              <Typography style={{ fontSize: "24px" }}>
                Thể loại
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                style={{ width: "400px", marginLeft: "-50px" }}
                inputProps={{ style: { fontSize: "20px" } }}
              ></TextField>
            </Grid>
          </Grid>

          <Grid item container alignItems="center" sx={{ mt: 3 }}>
            <Grid xs={2}>
              <Typography style={{ fontSize: "24px" }}>
                Tác giả
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                style={{ width: "400px", marginLeft: "-50px" }}
                inputProps={{ style: { fontSize: "20px" } }}
              ></TextField>
            </Grid>
          </Grid>


          <Grid item container alignItems="center" sx={{ mt: 3 }}>
            <Grid xs={2}>
              <Typography style={{ fontSize: "24px" }}>
                Nhà xuất bản
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                style={{ width: "400px", marginLeft: "-50px" }}
                inputProps={{ style: { fontSize: "20px" } }}
              ></TextField>
            </Grid>
          </Grid>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item container alignItems="center" sx={{ mt: 3 }}>
              <Grid item xs={2}>
                <Typography style={{ fontSize: "24px"}}>
                  Ngày xuất bản
                </Typography>
              </Grid>
              <Grid item xs={10} style={{  marginLeft: "-50px" }}>
                <CustomizedDatePicker
                  format="DD-MM-YYYY"
                ></CustomizedDatePicker>
              </Grid>
            </Grid>
          </LocalizationProvider>

          <Grid item container alignItems="center" sx={{ mt: 3 }}>
            <Grid xs={2}>
              <Typography style={{ fontSize: "24px" }}>
                Giá tiền
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                type = "price"
                style={{ width: "400px", marginLeft: "-50px" }}
                inputProps={{ style: { fontSize: "20px" } }}
              ></TextField>
            </Grid>
          </Grid>

          <Grid item container alignItems="center" sx={{ mt: 3 }}>
            <Grid xs={2}>
              <Typography style={{ fontSize: "24px" }}>
                Số lượng
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                type = "number"
                style={{ width: "400px", marginLeft: "-50px" }}
                inputProps={{ style: { fontSize: "20px" } }}
              ></TextField>
            </Grid>
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

        <NavLink to="/book">
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
