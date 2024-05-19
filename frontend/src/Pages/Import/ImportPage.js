import React from "react";
import {
  Grid, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TextField, Typography, Paper
} from "@mui/material";
import ButtonAdd from "../../component/ButtonAdd";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ButtonSearch from "../../component/ButtonSearch";
import ClassAPi from '../../Apis/Api'

const CustomizedDatePicker = styled(DatePicker)`
  & .MuiInputBase-input {
    font-size: 20px;
    width: 180px;
  }
  .MuiInputLabel-root {
    font-size: 20px;
  }
`;

export default function ImportPage() {
  const navigate = useNavigate();
  const [importBills, setimportBills] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  useEffect(() => {
    ClassAPi.getAllImportBill()
      .then((respone) => {
        setimportBills(respone.data);
        console.log(respone.data)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableHead = [
    { name: "Số thứ tự" },
    { name: "Mã phiếu nhập" },
    { name: "Nhân viên nhập" },
    { name: "Thời gian" },
    { name: "Số tiền" },
    { name: "" }
  ];
  const handleSearch = () => {
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
    ClassAPi.getImportBillByElement(starttime.toISOString(), endtime.toISOString())
    .then((res) => {
      console.log (res.data)
      setimportBills(res.data)
    })
    .catch((err) => {
      console.log(err.message)
    })
  } 

  return (
    <Grid container spacing={1} style={{ padding: "40px", marginLeft: "20px", marginTop: "-50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "43px" }}>
          Danh sách phiếu nhập kho
        </h1>
      </Grid>

      <Grid item xs={12} style={{ marginBottom: 30 }}>
        <ButtonAdd to="/import/add" title="Nhập kho"></ButtonAdd>
      </Grid>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item xs={12} marginTop={"15px"}>
          <CustomizedDatePicker
            label="Từ ngày"
            slotProps={{ textField: { variant: "filled" } }}
            sx={{ marginRight: "35px" }}
            format="DD-MM-YYYY"
            value={startTime}
            onChange={(datetime) => setStartTime(datetime)}
          />
          <CustomizedDatePicker
            label="Đến ngày"
            slotProps={{ textField: { variant: "filled" } }}
            format="DD-MM-YYYY"
            value = {endTime}
            onChange={(datetime) => setEndTime(datetime)}
          />
        </Grid>
      </LocalizationProvider>


      <Grid item marginRight={"500px"}>
        <ButtonSearch onclick={handleSearch} title="Tìm kiếm phiếu nhập"></ButtonSearch>
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
              {importBills &&
                (rowsPerPage > 0
                  ? importBills.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : importBills
                ).map(
                  (column, index) =>
                    column &&
                    column.bookName !== null && (
                      <TableRow key={index}>
                        <TableCell style={{ fontSize: "20px", width: '150px' }} >
                          {page * rowsPerPage + index + 1}
                        </TableCell>

                        <TableCell style={{ fontSize: '20px', width: '200px' }}>{column.code}</TableCell>
                        <TableCell style={{ fontSize: '20px', width: '300px' }}>{column.staff_name}</TableCell>
                        <TableCell style={{ fontSize: '20px' }}>{column.date_created}</TableCell>
                        <TableCell style={{ fontSize: '20px' }}>{column.cost}</TableCell>
                        <TableCell>
                          <Link to={"/import/edit/" + column.id}>
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
                  count={importBills.length}
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
