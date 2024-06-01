import {
  Grid, Table, TableBody, TableCell, TableContainer, TableHead,
  Button, TableRow, TextField, Typography, Paper,
} from "@mui/material";
import ButtonAdd from "../../component/ButtonAdd";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ClassAPi from '../../Apis/Api'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const tableHead = [
  { name: "Số thứ tự" },
  { name: "Tên nhân viên" },
  { name: "" }
];

export default function StaffPage() {
  const [staffs, setStaffs] = useState([]);
  const [open, setOpen] = useState(false);
  const [correct, setCorrect] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    ClassAPi.getAllStaff()
      .then((respone) => {
        console.log(respone.data)
        setStaffs(respone.data)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  const handleDelete = (id) => {
    ClassAPi.deleteStaff(id)
      .then((respone) => {
        console.log(respone.data)
        setStaffs(staffs.filter((staff) => staff.id !== id))
      })
      .catch((err) => {
        console.log(err)
      });
  }

  return (
    <Grid container spacing={1} style={{ padding: "40px", marginLeft: "20px", marginTop: "-50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "43px" }}>
          Quản lý nhân viên
        </h1>
      </Grid>

      <Grid item xs={12} style={{ marginBottom: 30 }}>
        <ButtonAdd to="/staff/add" title="Thêm nhân viên"></ButtonAdd>
      </Grid>

      <Grid item>
        <TableContainer component={Paper}>
          <Table style={{ width: 600, border: "solid", borderWidth: '1px' }} >
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
              {staffs.map(
                (column, index) =>
                  column &&
                  <TableRow key={index}>
                    <TableCell style={{ fontSize: "20px", width: '150px' }} >
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ fontSize: '20px', width: '260px' }}>{column.name}</TableCell>
                    <TableCell >
                      <Link to={"/staff/edit/" + column.id}>
                        <Typography style={{ fontSize: "18px" }}>
                          Chi tiết
                        </Typography>
                      </Link>
                      <Typography onClick={handleOpen} style={{ fontSize: "18px", color: "red" }}>
                        Xóa
                      </Typography>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                      >
                        <Box sx={{ ...style, width: 400 }}>
                          <h2 id="parent-modal-title">Xác nhân xóa nhân viên {column.name}</h2>
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{ fontSize: "18px" }}
                            onClick={handleDelete(column.id)}
                          >
                            Xác nhận
                          </Button>
                          {correct === true &&
                            <Typography style={{ color: "green" }}>Xóa thành công</Typography>
                          }
                          {correct === false &&
                            <Typography style={{ color: "green" }}>Xóa thất bại</Typography>
                          }
                        </Box>
                      </Modal>
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}