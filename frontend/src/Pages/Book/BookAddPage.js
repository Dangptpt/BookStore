import React, { useEffect, useMemo } from "react";
import { Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import { Table, TableBody, TableCell, Box } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import ClassApi from "../../Apis/Api";
import { toast } from "react-toastify";
import { Autocomplete } from "@mui/material";
import AutoComplete from "../../component/AutoCompleteSearch";

export default function BookAddPage() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} padding={"40px"}>

        <Grid item xs={12}>
          <h1 style={{ fontSize: "40px", marginLeft: "10px" }}>Thêm sách mới</h1>
        </Grid>
        <Grid item>
          <Grid padding={"20px"}>

            <Grid item container direction="row" alignItems="center">
              <Typography style={{ fontSize: "24px", marginRight: "41px" }}>
                Tên sách
              </Typography>
              <TextField
                style={{ width: "400px" }}
                inputProps={{ style: { fontSize: "18px" }, required: true }}
              ></TextField>
            </Grid>


            <Grid item container direction="row" alignItems="center" sx={{ mt: 2 }}>
              <Typography style={{ fontSize: "24px", marginRight: "170px" }}>
                Thể loại
              </Typography>
              <TextField
                style={{ width: "400px" }}
                inputProps={{ style: { fontSize: "18px" }, required: true }}
              ></TextField>
            </Grid>


            <Grid item container direction="row" alignItems="center" sx={{ mt: 2 }}>
              <Typography style={{ fontSize: "24px", marginRight: "102px" }}>
                Tác giả
              </Typography>
              <TextField
                style={{ width: "500px" }}
                inputProps={{ style: { fontSize: "18px" }, required: true }}
              ></TextField>
            </Grid>

            <Grid item container direction="row" alignItems="center" sx={{ mt: 2 }} >
              <Typography style={{ fontSize: "24px", marginRight: "46px" }}>
                Giá tiền
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


              <NavLink to="/book">
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
