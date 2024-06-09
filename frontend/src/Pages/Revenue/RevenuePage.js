import React from "react";
import {
  Grid, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TextField, Typography, Paper
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ButtonSearch from "../../component/ButtonSearch";
import dayjs from "dayjs";
import ClassAPi from '../../Apis/Api'
import formatter from "../../component/Formatter";

const CustomizedDatePicker = styled(DatePicker)`
  & .MuiInputBase-input {
    font-size: 20px;
    width: 180px;
  }
  .MuiInputLabel-root {
    font-size: 20px;
  }
`;

export default function RevenuePage() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [date, setDate] = useState(null);
  const [nbill, setNbill] = useState(0);
  const [nbook, setNbook] = useState(0);
  const [amount, setAmount] = useState(0);
  const handleSearch = () => {
    const offsetMinutes = 7 * 60 * 60000;
    let dateonly = new Date()
    if (date != null)
      if (date.toString() != 'Invalid Date' )
        dateonly = new Date(date + offsetMinutes);
      else return;
    else return
    console.log(dateonly.toISOString().slice(0, 10)) 
    ClassAPi.getStatistic(dateonly.toISOString().slice(0, 10))
      .then((respone) => {
        const data = respone.data
        console.log(data)
        setNbill(data.total_bill)
        setNbook(data.total_book)
        setAmount(data.total_amount)
        setBooks(data.list_book)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableHead = [
    { name: "Số thứ tự" },
    { name: "Tên sách" },
    { name: "Số lượng bán" },
    { name: "Số tiền" },
  ];

  return (
    <Grid container spacing={1} style={{ padding: "40px", marginLeft: "20px", marginTop: "-50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "43px" }}>
          Doanh thu bán hàng
        </h1>
      </Grid>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item xs={12} marginTop={"15px"}>
          <CustomizedDatePicker
            label="Chọn ngày"
            value={(date)}
            onChange={(date) => {setDate(date)}}
            slotProps={{ textField: { variant: "filled" } }}
            sx={{ marginRight: "35px" }}
            format="DD-MM-YYYY"
          />
        </Grid>
      </LocalizationProvider>

      <Grid item xs = {12}>
        <ButtonSearch onclick={handleSearch} title="Tra cứu"></ButtonSearch>
      </Grid>

      <Grid item xs = {12}> 
        <b style={{fontSize: "22px"}}> Số đơn hàng: {nbill} </b>
      </Grid>
      <Grid item xs = {12} > 
        <b style={{fontSize: "22px"}}> Số lượng sách bán: {nbook} </b>
      </Grid>
      <Grid item xs = {12} > 
        <b style={{fontSize: "22px"}}> Tổng tiền: {formatter.format(amount)} đồng </b>
      </Grid>

      <Grid item>
        <TableContainer component={Paper}>
          <Table style={{ width: 1000, border: "solid", borderWidth: '1px' }} >
            <TableHead>
              <TableRow style={{ backgroundColor: "#C0C0C0" }}>
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
              {books &&
                (rowsPerPage > 0
                  ? books.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : books
                ).map(
                  (column, index) =>
                    column &&
                    column.bookName !== null && (
                      <TableRow key={index}>
                        <TableCell style={{ fontSize: "20px", width: '150px' }} >
                          {page * rowsPerPage + index + 1}
                        </TableCell>
                        <TableCell style={{ fontSize: '20px', width: '300px' }}>{column.name}</TableCell>
                        <TableCell style={{ fontSize: '20px', width: '200px' }}>{column.quantity}</TableCell>
                        <TableCell style={{ fontSize: '20px' }}>{formatter.format(column.price*column.quantity)}</TableCell>
                        
                      </TableRow>
                    ))}
            </TableBody>
            <tfoot>
              <tr>
                <TablePagination
                  rowsPerPageOptions={[5, 8, 10, { label: "Tất cả", value: -1 }]}
                  colSpan={7}
                  count={books.length}
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
