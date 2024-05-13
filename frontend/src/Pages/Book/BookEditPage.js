import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField, Button, ThemeProvider, createTheme, InputAdornment  } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NavLink, useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import styled from "@emotion/styled";
import ClassAPi from '../../Apis/Api'
import { ToastContainer, toast } from 'react-toastify'

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "400px",
          "& .MuiInputBase-input": {
            fontSize: "30px",
            padding: "8px",
          },
          padding: "0px",
        },
      },
    },
  },
});

const CustomizedDatePicker = styled(DatePicker)`
& .MuiInputBase-input {
  font-size: 20px;
  width: 445px;
}
& .MuiInputLabel-root {
  font-size: 20px;
}
`;

export default function BookEditPage() {
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [author, setAuthor] = useState();
  const [publish_company, setPublish_Company] = useState();
  const [publish_year, setPublish_Year] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const param = useParams()
  const handleChangeName = (e) => {
    setName(e.target.value)
  }
  const handleChangeAuthor = (e) => {
    setAuthor(e.target.value)
  }
  const handleChangeCategory = (e) => {
    setCategory(e.target.value)
  }
  const handleChangeCompany = (e) => {
    setPublish_Company(e.target.value)
  }
  const handleChangeYear = (e) => {
    setPublish_Year(e.target.value)
  }
  const handleChangePrice = (e) => {
    setPrice(e.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, author, category, publish_year, publish_company, price)
    ClassAPi.editBook(param.id, 
      {name: name,
      category: category,
      author: author,
      price: price,
      publish_year: publish_year,
      publish_company: publish_company
      })
      .then((respone) => {
        toast.success('Cập nhật thành công')
        console.log(respone)
      })
      .catch((err) => {
        toast.error("Cập nhật thất bại")
        console.log(err)
      })
  } 
  useEffect(() => {
    ClassAPi.getBookById(param.id)
      .then((respone) => {
        const book = respone.data
        setName(book.name)
        setCategory(book.category)
        setAuthor(book.author)
        setPublish_Company(book.publish_company)
        setPublish_Year(book.publish_year)
        setPrice(book.price)
        setQuantity(book.quantity)
      })
      .catch((err) => {
        console.log(err)
      });
    
  }, []); 
  return (
    <Grid container spacing={1} style={{ padding: "40px", marginLeft: "20px", marginTop: "-50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "43px" }}>
          Thông tin sách
        </h1>
      </Grid>

      <ThemeProvider theme={theme}>
        <Grid item container alignItems="center">
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Tên sách
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              value = {name}
              onChange={handleChangeName}
              style={{ width: "400px", marginLeft: "-50px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>

        <Grid item container alignItems="center" sx={{ mt: 1 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Thể loại
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              value={category}
              onChange={handleChangeCategory}
              style={{ width: "400px", marginLeft: "-50px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>

        <Grid item container alignItems="center" sx={{ mt: 1 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Tác giả
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              value={author}
              onChange={handleChangeAuthor}
              style={{ width: "400px", marginLeft: "-50px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>


        <Grid item container alignItems="center" sx={{ mt: 1 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Nhà xuất bản
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              value={publish_company}
              onChange={handleChangeCompany}
              style={{ width: "400px", marginLeft: "-50px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item container alignItems="center" sx={{ mt: 1 }}>
            <Grid item xs={2}>
              <Typography style={{ fontSize: "24px" }}>
                Năm xuất bản
              </Typography>
            </Grid>
            <Grid item xs={10} >
              <TextField
                value={publish_year}
                onChange={handleChangeYear}
                style={{ width: "400px", marginLeft: "-50px" }}
                inputProps={{ style: { fontSize: "20px" } }}
              ></TextField>
            </Grid>
          </Grid>
        </LocalizationProvider>

        <Grid item container alignItems="center" sx={{ mt: 1 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Giá tiền
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="end">đồng</InputAdornment>,
              }}
              type="price"
              value={price}
              onChange={handleChangePrice}
              style={{ width: "400px", marginLeft: "-50px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>

        <Grid item container alignItems="center" sx={{ mt: 1 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Số lượng
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              value={quantity}
              style={{ width: "400px", marginLeft: "-50px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>

      </ThemeProvider>

      <Grid item sx={{ mt: 2 }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#79C9FF",
            margin: "30px 0px",
            fontSize: "20px",
            color: "black",
            fontWeight: "500",
          }}
          type="submit"
          onClick={handleSubmit}
        >
          Xác nhận
        </Button>

        <NavLink to="/book">
          <Button
            variant="contained"
            style={{
              backgroundColor: "#FA7070",
              marginLeft: "50px",
              fontSize: "20px",
              color: "black",
              fontWeight: "500",
            }}
          >
            Hủy
          </Button>
        </NavLink>
      </Grid>
    </Grid>
  );
}
