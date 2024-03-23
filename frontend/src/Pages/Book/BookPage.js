import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
        TablePagination, TableRow, TextField, Typography,} from "@mui/material";
import ButtonAdd from "../../component/ButtonAdd";
import ButtonSearch from "../../component/ButtonSearch";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ClassAPi from '../../Apis/Api'

const tableHead = [
  { name: "Số thứ tự" },
  { name: "Tên sách" },
  { name: "Tác giả" },
  { name: "Thể loại" },
  { name: "Số lượng" },
];
function ResidencePage() {
  const [books, setBooks] = useState([]);

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
    <Grid container spacing={2} style={{ padding: "50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "48px" }}>
          Tra cứu sách
        </h1>
      </Grid>

      {check == 'admin' &&
        <Grid item xs={12} style={{ marginBottom: 30 }}>
          <ButtonAdd to="/book/add" title="Thêm sách mới"></ButtonAdd>
        </Grid>
      }

      <Grid item xs={12}>
        <TextField
          label="Tên sách"
          variant="filled"
          style={{ marginRight: "35px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          InputLabelProps={{ style: { fontSize: "20px" } }}
        />

        <TextField
          label="Thể loại"
          variant="filled"
          style={{ marginRight: "35px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          InputLabelProps={{ style: { fontSize: "20px" } }}
        />

        <TextField
          label="Tác giả"
          variant="filled"
          style={{ marginRight: "35px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          InputLabelProps={{ style: { fontSize: "20px" } }}
        />
      </Grid>

      <Grid item xs={12}>
        <ButtonSearch onclick={() => { }} title="Tìm kiếm sách"></ButtonSearch>
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {tableHead.map((col, index) => (
                  <TableCell key={index}
                    style={index === 0 ? { width: "15%" } : undefined}>
                    <Typography
                      variant="h4"
                      style={{ fontWeight: "bold" }}
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
                  (colume, index) =>
                    colume &&
                    colume.ownerName !== null && (
                      <TableRow key={index}>
                        <TableCell >
                          <Typography
                            variant="h5"
                            style={{ fontWeight: "500" }}
                            padding={0}
                          >
                            {page * rowsPerPage + index + 1}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ fontSize: '18px', width: '260px' }}>{colume.ownerName}</TableCell>
                        <TableCell style={{ fontSize: '18px', width: '300px' }}>{colume.address}</TableCell>
                        <TableCell style={{ fontSize: '18px' }}>{colume.memberNumber}</TableCell>
                        <TableCell>
                          <Link to={"/residence/detail/" + colume.residenceId}>
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
                  colSpan={6}
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
