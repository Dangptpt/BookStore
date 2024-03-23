import React, { useEffect, useMemo } from "react";
import { Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from "@mui/system";
import { Table, TableBody, TableCell, Box } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Autocomplete } from "@mui/material";
import AutoComplete from "../../component/AutoCompleteSearch";

const CustomizedDateTimePicker = styled(DateTimePicker)`
  & .MuiInputBase-input {
    font-size: 18px;
    width: 220px;
  }
  .MuiInputLabel-root {
    font-size: 20px;
  }
`;

export default function BillEditPage() {
  const columnNames = ["Số thứ tự", "Tên sách", "Số lượng", "Thành tiền", ""];
  const [payments, setPayments] = useState([]);

  const handleAddPayment = () => {
    setPayments([...payments, { label: "", cost: "", residenceFeeId: "" }]);
  };
  const handleDeletePayment = (id) => {
    const updatePayments = payments.filter((_, index) => index !== id);

    setPayments(updatePayments);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} padding={"40px"}>

        <Grid item xs={12}>
          <h1 style={{ fontSize: "40px", marginLeft: "10px" }}>Chi tiết hóa đơn</h1>
        </Grid>
        <Grid item>
          <Grid padding={"20px"}>

            <Grid item container direction="row" alignItems="center">
              <Typography style={{ fontSize: "24px", marginRight: "41px" }}>
                Họ tên khách hàng
              </Typography>
              <TextField
                style={{ width: "500px" }}
                inputProps={{ style: { fontSize: "18px" }, required: true }}
              ></TextField>
            </Grid>

            <Grid item container direction="row" alignItems="center" sx={{ mt: 2 }}>
              <Typography style={{ fontSize: "24px", marginRight: "170px" }}>
                Địa chỉ
              </Typography>
              <TextField
                style={{ width: "500px" }}
                inputProps={{ style: { fontSize: "18px" }, required: true }}
              ></TextField>
            </Grid>


            <Grid item container direction="row" alignItems="center" sx={{ mt: 2 }}>
              <Typography style={{ fontSize: "24px", marginRight: "102px" }}>
                Số điện thoại
              </Typography>
              <TextField
                style={{ width: "500px" }}
                inputProps={{ style: { fontSize: "18px" }, required: true }}
              ></TextField>
            </Grid>

            <Grid item container direction="row" alignItems="center" sx={{ mt: 2 }}>
              <Typography style={{ fontSize: "24px", marginRight: "36px" }}>
                Nhân viên thu ngân
              </Typography>
              <TextField
                style={{ width: "500px" }}
                inputProps={{ style: { fontSize: "18px" }, required: true }}
              ></TextField>
            </Grid>

            <Grid item container direction="row" alignItems="center" sx={{ mt: 2 }}>
              <Typography style={{ fontSize: "24px", marginRight: "144px" }}>
                Thời gian
              </Typography>
              <CustomizedDateTimePicker
                 slotProps={{
                  textField: {
                    required: true,
                  },
                }}
                sx={{ marginRight: "35px" }}
                format="DD-MM-YYYY hh-mm A"

              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 4 }}>
              <Typography variant="h3">Danh sách mua hàng</Typography>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columnNames.map((name, index) => (
                        <TableCell style={index === 0 || index == 4 ? { width: "15%" } : undefined}
                          key={index}>
                          <Typography
                            variant="h4"
                            style={{ fontWeight: "bold" }}
                          >
                            {name}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {payments &&
                      payments.map((payment, index) => (
                        <TableRow>

                          <TableCell >
                            <p style={{fontSize: "18px"}}>{index + 1} </p>
                          </TableCell>

                          <TableCell style={{ fontSize: "18px" }}>
                            <TextField
                              inputProps={{
                                style: { fontSize: "18px", width: "300px" },
                                required: true,
                              }}
                            ></TextField>
                          </TableCell>

                          <TableCell
                            style={{ fontSize: "18px" }}
                          >
                            <TextField
                              inputProps={{
                                style: { fontSize: "18px" },
                                required: true,
                              }}
                            ></TextField>
                          </TableCell>

                          <TableCell>
                            <TextField
                              inputProps={{
                                style: { fontSize: "18px" },
                                readOnly: true,
                              }}>
                            </TextField>
                          </TableCell>

                          <TableCell>
                            <button
                              onClick={() => handleDeletePayment(index)}
                              style={{ fontSize: "18px", color: "red" }}
                              type="button"
                            >
                              Xóa
                            </button>
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


            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography>
                <button
                  onClick={() => handleAddPayment()}
                  style={{ fontSize: "18px", color: "red" }}
                  type="button"
                >
                  Thêm
                </button>
              </Typography>
            </Grid>


            <Grid item container direction="row" alignItems="center" sx={{ mt: 2 }} >
              <Typography style={{ fontSize: "24px", marginRight: "46px" }}>
                Ghi chú
              </Typography>
              <TextField
                style={{ width: "500px" }}
                inputProps={{ style: { fontSize: "18px" } }}
              ></TextField>
            </Grid>


            <Grid item sx={{ mt: 2 }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#79C9FF",
                  margin: "30px 0px",
                  fontSize: "20px",
                  color: "black",
                  fontWeight: "400",
                }}
                type="submit"
                size="large"
              >
                Xác nhận
              </Button>


              <NavLink to="/bill">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#FA7070",
                    marginLeft: "30px",
                    fontSize: "20px",
                    color: "black",
                    fontWeight: "400",
                  }}
                  size="large"
                >
                  Hủy
                </Button>
              </NavLink>


            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
