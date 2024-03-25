import React, { useEffect, useMemo } from "react";
import { Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/system";
import { Table, TableBody, TableCell, createTheme,ThemeProvider } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Autocomplete } from "@mui/material";
import AutoComplete from "../../component/AutoCompleteSearch";

const CustomizedDatePicker = styled(DatePicker)`
  & .MuiInputBase-input {
    font-size: 20px;
    width: 334px;
  }
  .MuiInputLabel-root {
    font-size: 20px;
  }
`;

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
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

export default function ImportEditPage() {
  const tableHead = [
    { name: "Số thứ tự" },
    { name: "Tên sách" },
    { name: "Số lượng" },
    { name: "Thành tiền" },
    { name: "" } 
  ];
  const [payments, setPayments] = useState([]);

  const handleAddPayment = () => {
    setPayments([...payments, { label: "", cost: "", residenceFeeId: "" }]);
  };
  const handleDeletePayment = (id) => {
    const updatePayments = payments.filter((_, index) => index !== id);
    setPayments(updatePayments);
  };

  return (
    <Grid container spacing={1} style={{ padding: "40px", marginLeft: "20px", marginTop: "-50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "43px" }}>
          Tạo phiếu nhập kho
        </h1>
      </Grid>

      <ThemeProvider theme={theme}>

          <Grid item container alignItems="center">
            <Grid xs={2}>
              <Typography style={{ fontSize: "24px" }}>
                Mã phiếu nhập
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                style={{ width: "400px", marginLeft: "-15px" }}
                inputProps={{ style: { fontSize: "20px" } }}
              ></TextField>
            </Grid>
            <Grid xs={2}>
              <Typography style={{ fontSize: "24px" }}>
                Nhà cung cấp
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField
                style={{ width: "400px", marginLeft: "-55px" }}
                inputProps={{ style: { fontSize: "20px" } }}
              ></TextField>
            </Grid>
          </Grid>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item container alignItems="center" sx={{ mt: 1 }}>
              <Grid item xs={2}>
                <Typography style={{ fontSize: "24px" }}>
                  Thời gian
                </Typography>
              </Grid>
              <Grid item xs={4} style={{ marginLeft: "-15px" }}>
                <CustomizedDatePicker
                  style = {{ width: "400px"}}
                  format="DD-MM-YYYY"
                ></CustomizedDatePicker>
              </Grid>

              <Grid xs={2}>
              <Typography style={{ fontSize: "24px", marginLeft:"16px" }}>
                Nhân viên giao
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                style={{ width: "400px", marginLeft: "-40px" }}
                inputProps={{ style: { fontSize: "20px" } }}
              ></TextField>
            </Grid>
            </Grid>
          </LocalizationProvider>

          <Grid item container alignItems="center" sx={{ mt: 1 }}>
            <Grid xs={2}>
              <Typography style={{ fontSize: "24px" }}>
                Nhân viên nhập
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="price"
                style={{ width: "400px", marginLeft: "-15px" }}
                inputProps={{ style: { fontSize: "20px" } }}
              ></TextField>
            </Grid>
          </Grid>

      <Grid item xs={12}>
        <h2 style={{fontSize:"28px"}} >Danh sách nhập hàng</h2>
      </Grid>

      <Grid item>
        <TableContainer component={Paper}>
          <Table style={{ width: 1100, border: "solid",  borderWidth: '1px' }} >
            <TableHead >
              <TableRow style={{backgroundColor: "#C0C0C0"}}>
                {tableHead.map((col, index) => (
                  <TableCell key={index} >
                    <Typography
                      style={{ fontWeight: "600", fontSize: "22px" }}>
                      {col.name}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody >
              {payments &&
                payments.map((payment, index) => (
                  <TableRow >
                    <TableCell style = {{ fontSize: "20px"}}>
                      {index + 1}
                    </TableCell>

                    <TableCell >
                      <TextField
                        inputProps={{
                          style: { fontSize: "20px", width: "280px" },
                          required: true,
                        }}
                      ></TextField>
                    </TableCell>

                    <TableCell >
                      <TextField
                        inputProps={{
                          style: { fontSize: "20px", width: "100px" },
                          required: true,
                          type: "number",
                          min: 1 
                        }}
                      ></TextField>
                    </TableCell>

                    <TableCell >
                      <TextField
                        inputProps={{
                          style: { fontSize: "20px", width: "180px" },
                          readOnly: true,
                        }}>
                      </TextField>
                    </TableCell>

                    <TableCell >
                      <Button
                        onClick={() => handleDeletePayment(index)}
                        style={{ fontSize: "18px", color: "red" }}
                        type="button"
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell
                  colSpan={1}
                  style={{ color: "red", fontSize: "24px" }}
                >
                  Tổng số tiền
                </TableCell>
                <TableCell colSpan={4} style={{ fontSize: "20px" }}>
                  <TextField
                    inputProps={{
                      style: { fontSize: "18px" },
                      readOnly: true,
                    }}>
                  </TextField>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12} sx={{ mt: 1 }}>
        <Typography>
          <Button
            onClick={() => handleAddPayment()}
            style={{ fontSize: "18px", color: "red" }}
            type="button"
          >
            Thêm
          </Button>
        </Typography>
      </Grid>


      <Grid item container alignItems="center" sx={{ mt: 3 }}>
            <Grid xs={2}>
              <Typography style={{ fontSize: "24px" }}>
                Ghi chú
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                style={{ width: "510px", marginLeft: "-120px" }}
                inputProps={{ style: { fontSize: "20px" } }}
              ></TextField>
            </Grid>
          </Grid>


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

        <NavLink to="/import">
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
      </ThemeProvider>
    </Grid>
  );
}
