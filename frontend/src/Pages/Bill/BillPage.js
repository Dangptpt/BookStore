import React from "react";
import {
  Grid, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TextField, Typography, Paper
} from "@mui/material";
import ButtonAdd from "../../component/ButtonAdd";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ButtonSearch from "../../component/ButtonSearch";
import ClassAPi from '../../Apis/Api'

const CustomizedDateTimePicker = styled(DateTimePicker)`
  & .MuiInputBase-input {
    font-size: 20px;
    width: 220px;
  }
  .MuiInputLabel-root {
    font-size: 20px;
  }
`;

export default function BillPage() {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  useEffect(() => {
    ClassAPi.getAllBill()
      .then((respone) => {
        setBills(respone.data);
        console.log(respone.data)
        console.log(bills)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  const handleSearchBill = () => {
    const offsetMinutes = 7 * 60 * 60000;
    let starttime = new Date(Date.UTC(0, 0, 1, 0, 0, 0, 0));
    let endtime = new Date(Date.UTC(9999, 11, 31, 23, 59, 59, 999));
    if (startTime != null)
      if (startTime.toString() != 'Invalid Date' )
        starttime = new Date(startTime + offsetMinutes);
    if (endTime != null)
      if (endTime.toString() != 'Invalid Date' )
        endtime = new Date(endTime + offsetMinutes);
    console.log(starttime, endtime)
    console.log(starttime.toISOString(), endtime.toISOString())
  
    setPage(0);
    ClassAPi.getBillByElement(starttime.toISOString(), endtime.toISOString())
    .then((res) => {
      console.log (res.data)
      setBills(res.data)
    })
    .catch((err) => {
      console.log(err.message)
    })
  } 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableHead = [
    { name: "Số thứ tự" },
    { name: "Tên thu ngân" },
    { name: "Tên khách hàng" },
    { name: "Thời gian" },
    { name: "Số tiền" },
    { name: "" }
  ];

  return (
    <Grid container spacing={1} style={{ padding: "40px", marginLeft: "20px", marginTop: "-50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "43px" }}>
          Danh sách hóa đơn
        </h1>
      </Grid>

      <Grid item xs={12} style={{ marginBottom: 30 }}>
        <ButtonAdd to="/bill/add" title="Tạo hóa đơn"></ButtonAdd>
      </Grid>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item xs={12} marginTop={"15px"}>
          <CustomizedDateTimePicker
            label="Thời gian bắt đầu"
            slotProps={{ textField: { variant: "filled" } }}
            sx={{ marginRight: "35px" }}
            format="DD-MM-YYYY hh-mm A"
            value={startTime}
            onChange={(datetime) => setStartTime(datetime)}
          />
          <CustomizedDateTimePicker
            
            label="Thời gian kết thúc"
            slotProps={{ textField: { variant: "filled" } }}
            format="DD-MM-YYYY hh-mm A"
            onChange={(datetime) => setEndTime(datetime)}
          />
        </Grid>
      </LocalizationProvider>

      <Grid item marginRight={"500px"}>
        <ButtonSearch onclick={handleSearchBill} title="Tìm kiếm hóa đơn"></ButtonSearch>
      </Grid>

      <Grid item>
        <TableContainer component={Paper}>
          <Table style={{ width: 1300, border: "solid",  borderWidth: '1px' }} >
            <TableHead>
              <TableRow style={{backgroundColor: "#C0C0C0"}}>
                {tableHead.map((col, index) => (
                  <TableCell key={index}>
                    <Typography
                      style={{ fontWeight: "600", fontSize: "22px" }}
                      padding={0}>
                      {col.name}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {bills &&
                (rowsPerPage > 0
                  ? bills.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : bills
                ).map(
                  (column, index) =>
                    column &&
                    column.bookName !== null && (
                      <TableRow key={index}>
                        <TableCell style={{ fontSize: "20px", width: '150px' }} >
                          {page * rowsPerPage + index + 1}
                        </TableCell>

                        <TableCell style={{ fontSize: '20px', width: '250px' }}>{column.cashier_name}</TableCell>
                        <TableCell style={{ fontSize: '20px', width: '250px' }}>{column.customer_name}</TableCell>
                        <TableCell style={{ fontSize: '20px' }}>{column.time_created}</TableCell>
                        <TableCell style={{ fontSize: '20px' }}>{column.amount}</TableCell>
                        <TableCell>
                          <Link to={"/bill/edit/" + column.id}>
                            <Typography style={{ fontSize: "18px" }}>
                              Chi tiết
                            </Typography>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
            </TableBody>
            <tfoot>
              <tr>
                <TablePagination
                  rowsPerPageOptions={[5, 8, 10, { label: "Tất cả", value: -1 }]}
                  colSpan={7}
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
                  labelDisplayedRows={(page) => { return `${page.from} - ${page.to} trên ${page.count}` }}
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
  );
}
