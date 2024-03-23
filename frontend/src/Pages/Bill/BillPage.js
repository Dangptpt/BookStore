import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { FormControl, FormGroup, TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { TablePagination } from "@mui/material";
import { Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import dayjs from "dayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ClassApi from "../../Apis/Api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";

const CustomizedDateTimePicker = styled(DateTimePicker)`
  & .MuiInputBase-input {
    font-size: 18px;
    width: 220px;
  }
  .MuiInputLabel-root {
    font-size: 20px;
  }
`;

function BillPage() {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Khách hàng" },
    { name: "Thời gian" },
    { name: "Số tiền" },
    { name: "Nhân viên thu ngân" },
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} style={{ padding: "50px" }}>
        <Grid item xs={12}>
          <h1 style={{ fontSize: "48px" }}>
            Danh sách hóa đơn
          </h1>
        </Grid>

        <Grid item xs={12}>
          <NavLink to="/bill/add">
            <Button
              variant="contained"
              style={{ backgroundColor: "#79C9FF", marginBottom: 30 }}
            >
              <Typography variant="h4" style={{ color: "black" }}>
                Tạo hóa đơn
              </Typography>
            </Button>
          </NavLink>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <FormControl>
            <FormGroup row>
              <TextField
                label="Tên khách hàng"
                variant="filled"
                style={{ marginRight: "35px" }}
                inputProps={{ style: { fontSize: "18px" } }}
                InputLabelProps={{ style: { fontSize: "20px" } }}
              />

              <CustomizedDateTimePicker
                label="Thời gian bắt đầu"
                slotProps={{ textField: { variant: "filled" } }}
                sx={{ marginRight: "35px" }}
                format="DD-MM-YYYY hh-mm A"
              />
              <CustomizedDateTimePicker
                label="Thời gian kết thúc"
                slotProps={{ textField: { variant: "filled" } }}
                format="DD-MM-YYYY hh-mm A"
              />
            </FormGroup>    
          </FormControl>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
            onClick={() => handleSearch()}
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Tìm kiếm hóa đơn
            </Typography>
          </Button>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  {tableHeadName.map((column, index) => (
                    // <TableCell key={index}>
                    <TableCell
                      key={index}
                      style={index === 0 || index == 3 ? { width: "15%" } : undefined}
                    >
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        {column.name}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <tbody>
                {bills &&
                  (rowsPerPage > 0
                    ? bills.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    : bills
                  ).map(
                    (vehicleReceipt, index) =>
                      vehicleReceipt &&
                      vehicleReceipt.vehicleReceiptId !== null && (
                        <TableRow>
                          <TableCell style={{ fontSize: "18px" }}>
                            {page * rowsPerPage + index + 1}
                          </TableCell>
                          <TableCell style={{ fontSize: "18px" }}>
                            {vehicleReceipt.licensePlate}
                          </TableCell>
                          <TableCell style={{ fontSize: "18px" }}>
                            {vehicleReceipt.personName}
                          </TableCell>
                          <TableCell style={{ fontSize: "18px" }}>
                            {vehicleReceipt.amount.toLocaleString("en-US", {
                              style: "decimal",
                              minimumFractionDigits: 0,
                            })}{" "}
                            đồng
                          </TableCell>
                          <TableCell style={{ fontSize: "18px" }}>
                            {new Date(
                              vehicleReceipt.dateCreated
                            ).toLocaleDateString("en-GB")}
                          </TableCell>
                          <TableCell style={{ fontSize: "18px" }}>
                            <Button
                              style={{
                                fontSize: "18px",
                                color: "#0000EE",
                                textTransform: "none",
                              }}
                              onClick={() => { }
                              }
                            >Chi tiết</Button>
                          </TableCell>
                        </TableRow>
                      )
                  )}
              </tbody>
              <tfoot>
                <tr>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      8,
                      10,
                      { label: "Tất cả", value: -1 },
                    ]}
                    colSpan={6}
                    count={bills.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        "aria-label": "rows per page",
                      },
                      actions: {
                        showFirstButton: true,
                        showLastButton: true,
                      },
                    }}
                    labelDisplayedRows={(page) => {
                      return `${page.from} - ${page.to} trên ${page.count}`;
                    }}
                    labelRowsPerPage={"Dòng mỗi trang:"}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                      "& .MuiTablePagination-input": {
                        fontSize: "16px",
                      },
                      "& .MuiTablePagination-displayedRows": {
                        fontSize: "16px",
                      },
                      "& .MuiTablePagination-selectLabel": {
                        fontSize: "16px",
                      },
                    }}
                  />
                </tr>
              </tfoot>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
export default BillPage;
