import {Grid, Table, TableBody, TableCell, TableContainer, TableHead,
        TablePagination, TableRow, TextField, Typography} from "@mui/material";
import ButtonAdd from "../../component/ButtonAdd";
import ButtonSearch from "../../component/ButtonSearch";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ClassAPi from '../../Apis/Api'

const tableHead = [
  { name: "Số thứ tự" },
  { name: "Tên sách" },
  { name: "Thể loại" },
  { name: "Tác giả"},
  { name: "Số lượng" },
  { name: "Giá tiền"},
  { name: "" }
];
function ResidencePage() {
  const [books, setBooks] = useState([{
    bookName: "Sherlock Holmes", 
    category: "Detective", 
    authorName: "Conan Doyle", 
    quantity: 1, 
    price: 400000}]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const check = sessionStorage.getItem("role");
  return (
    <Grid container spacing={1} style={{ padding: "40px", marginLeft: "20px", marginTop: "-50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "43px" }}>
          Quản lý sách
        </h1>
      </Grid>

      {check == 'admin' &&
        <Grid item xs={12} style={{ marginBottom: 30 }}>
          <ButtonAdd to="/book/add" title="Thêm sách mới"></ButtonAdd>
        </Grid>
      }

      <Grid item xs={12} marginTop={"15px"}>
        <TextField
          label="Tên sách"
          variant="filled"
          style={{ marginRight: "35px" }}
          inputProps={{ style: { fontSize: "20px" } }}
          InputLabelProps={{ style: { fontSize: "20px" } }}
        />

        <TextField
          label="Thể loại"
          variant="filled"
          style={{ marginRight: "35px" }}
          inputProps={{ style: { fontSize: "20px" } }}
          InputLabelProps={{ style: { fontSize: "20px" } }}
        />
      </Grid>

      <Grid item >
        <ButtonSearch onclick={() => { }} title="Tìm kiếm sách"></ButtonSearch>
      </Grid>

      <Grid item>
        <TableContainer >
          <Table style={{ width: 1500 }} >
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
                        <TableCell style={{fontSize: "20px", width: '150px'}} >
                            {page * rowsPerPage + index + 1}
                        </TableCell>

                        <TableCell style={{ fontSize: '20px', width: '260px' }}>{column.bookName}</TableCell>
                        <TableCell style={{ fontSize: '20px', width: '200px' }}>{column.category}</TableCell>
                        <TableCell style={{ fontSize: '20px' }}>{column.authorName}</TableCell>
                        <TableCell style={{ fontSize: '20px' }}>{column.quantity}</TableCell>
                        <TableCell style={{ fontSize: '20px' }}>{column.price}</TableCell>
                        <TableCell>
                          <Link to={"/book/edit/" + column.bookId}>
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

export default ResidencePage;
