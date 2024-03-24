import React from "react";
import {
  Grid, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TextField, Typography
} from "@mui/material";
import ButtonAdd from "../../component/ButtonAdd";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ButtonSearch from "../../component/ButtonSearch";

const CustomizedDateTimePicker = styled(DateTimePicker)`
  & .MuiInputBase-input {
    font-size: 18px;
    width: 220px;
  }
  .MuiInputLabel-root {
    font-size: 20px;
  }
`;

export default function BillPage() {
  const navigate = useNavigate();
  const [bills, setBills] = useState([{
    billCode: "MB240324001",
    customerName: "Phùng Thanh Đăng",
    paymentTime: "24-03-2024 08:14:20",
    cost: 800000
  }]);
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
    { name: "Mã hóa đơn" },
    { name: "Tên khách hàng" },
    { name: "Thời gian" },
    { name: "Số tiền" },
    { name: "" }
  ];

  const handleSearch = () => {
  };

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
          <TextField
            label="Mã hóa đơn"
            variant="filled"
            style={{ marginRight: "35px" }}
            inputProps={{ style: { fontSize: "20px" } }}
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
        </Grid>
      </LocalizationProvider>


      <Grid item marginRight={"500px"}>
        <ButtonSearch onclick={() => { }} title="Tìm kiếm hóa đơn"></ButtonSearch>
      </Grid>

      <Grid item>
        <TableContainer >
          <Table style={{ width: 1300 }} >
            <TableHead>
              <TableRow>
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

                        <TableCell style={{ fontSize: '20px', width: '200px' }}>{column.billCode}</TableCell>
                        <TableCell style={{ fontSize: '20px', width: '300px' }}>{column.customerName}</TableCell>
                        <TableCell style={{ fontSize: '20px' }}>{column.paymentTime}</TableCell>
                        <TableCell style={{ fontSize: '20px' }}>{column.cost}</TableCell>
                        <TableCell>
                          <Link to={"/bill/edit/" + column.bookId}>
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
