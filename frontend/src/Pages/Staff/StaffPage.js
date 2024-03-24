import { Container, TableCell, TableHead, TableRow, Table, TableContainer, Paper, TableBody, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import ButtonAdd from '../../component/ButtonAdd'
import { Link } from 'react-router-dom';

const tableHead = [
  { name: "Số thứ tự" },
  { name: "Họ tên" },
  { name: "" },
];

export default function StaffPage() {
  const [staffs, setStaffs] = useState([]);

  return (
    <Grid container spacing={2} style={{ padding: "50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "48px" }}>
          Quản lý nhân viên
        </h1>
      </Grid>

      <Grid item xs={12} style={{ marginBottom: 30 }}>
        <ButtonAdd to="/staff/add" title="Thêm nhân viên mới"></ButtonAdd>
      </Grid>

      <Grid item xs={12}>
        <TableContainer style={{ marginTop: 20 }} component={Paper}>
          <Table sx={{ minwidth: 900 }}>
            <TableHead>
              <TableRow>
                {tableHead.map((col, index) => (
                  <TableCell key={index}
                    style={index === 0 ? { width: "20%" } : index == 1 ? {width : "35%"} : {width : "20%"} }>
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
              {staffs &&
                staffs.map((data, index) =>
                  <TableRow>
                    <TableCell style={{ fontSize: 18 }}>{index + 1}</TableCell>
                    <TableCell style={{ fontSize: 18 }}>{data.userName}</TableCell>
                    <TableCell style={{ fontSize: 18 }}><Link to={'/staff/edit/' + data.userId}>Chi tiết</Link></TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

    </Grid>
  )
}
