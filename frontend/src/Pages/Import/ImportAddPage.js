import React, { useEffect, useMemo } from "react";
import { Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/system";
import { Table, TableBody, TableCell, createTheme, ThemeProvider } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import AutoComplete from "../../component/AutoCompleteSearch"
import ClassAPi from '../../Apis/Api'
import dayjs from "dayjs";

const CustomizedDatePicker = styled(DatePicker)`
  & .MuiInputBase-input {
    font-size: 20px;
    width: 334px;
  }
  .MuiInputLabel-root {
    font-size: 20px;
  }
`;

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            fontSize: "20px",
            padding: "8px",
          },
          padding: "0px",
        },
      },
    },
  },
});

export default function ImportAddPage() {
  const tableHead = [
    { name: "Số thứ tự" },
    { name: "Tên sách" },
    { name: "Đơn giá" },
    { name: "Số lượng" },
    { name: "Thành tiền" },
    { name: "" }
  ];
  const [payments, setPayments] = useState([]);
  const [books, setBooks] = useState([])
  const [date, setDate] = useState(new Date())
  const [amount, setAmount] = useState(0)
  const [code, setCode] = useState("")
  const [supplier, setSupplier] = useState("")
  const [description, setDescription] = useState("")
  const [delivery, setDelivery] = useState("")
  const staff_name = sessionStorage.getItem('name')
  const bookShrinkList = []
  const handleAddPayment = () => {
    setPayments([...payments, { name: "", quantity: 0, id: 0, price: 0 }]);
  };
  const handleDeletePayment = (id) => {
    const updatePayments = payments.filter((_, index) => index !== id);
    setAmount(amount - payments[id].quantity * payments[id].price)
    setPayments(updatePayments);
  };
  useEffect(() => {
    ClassAPi.getAllBook()
      .then((respone) => {
        setBooks(respone.data);
        console.log(respone.data)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);
  books.map((book, index) => {
    bookShrinkList.push({
      name: book.name,
      id: book.id,
      quantity: book.quantity,
      price: book.price,
    });
  });
  const handleChangeBook = (index) => (event, value) => {
    let newPayments = [...payments];
    if (value !== null) {
      newPayments[index] = {
        name: value.name,
        quantity: 1,
        price: 0,
        id: value.id,
        remain: value.quantity
      };
      if (payments[index].name !== "")
        setAmount(amount - payments[index].price * payments[index].quantity);
      else
        setAmount(amount);
    }
    else {
      newPayments[index] = { name: "", quantity: 0, id: 0, price: 0, remain: 0 };
      setAmount(amount - payments[index].price * payments[index].quantity);
    }
    setPayments(newPayments);
  };
  const handleChangeQuantity = (index) => (event, value) => {
    let newPayments = [...payments];
    let q = event.target.value === "" ? 0 : parseInt(event.target.value);
    let old = newPayments[index].quantity
    newPayments[index].quantity = q;
    setPayments(newPayments);
    setAmount(amount + q * payments[index].price - old * payments[index].price)
  }
  const handleChangePrice = (index) => (event, value) => {
    let newPayments = [...payments];
    let new_p = event.target.value === "" ? 0 : parseInt(event.target.value);
    let old_p = newPayments[index].price
    newPayments[index].price = new_p;
    setPayments(newPayments);
    setAmount(amount + new_p * payments[index].quantity - old_p * payments[index].quantity)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const bill_payments = [];
    const change_quantity = [];
    payments.map((payment, _) => {
      bill_payments.push({
        book_id: payment.id,
        quantity: payment.quantity,
        unit_price: payment.price
      });
      change_quantity.push({
        book_id: payment.id,
        quantity: payment.remain + payment.quantity,
      });
    });   
    const offsetMinutes = -7 * 60 * 60000;
    let time_created = new Date(Date.UTC(0, 0, 1, 0, 0, 0, 0));;
    time_created = new Date(date - offsetMinutes)
    console.log(time_created)
    
    const data = {
      import_info: {
        code: code,
        staff_name: staff_name,
        supplier: supplier,
        delivery_name: delivery,
        description: description,
        time_created: time_created.toISOString(),
        cost: amount
      },
      import_list: bill_payments
    }
    console.log(data)
    ClassAPi.postNewImportBill(data)
      .then((respone) => {
        console.log(respone)
        ClassAPi.editQuantity(change_quantity)
          .then((respone) => {
            toast.success('Tạo hóa đơn thành công')
          })
      })
      .catch((err) => {
        toast.error("Tạo hóa đơn thất bại")
        console.log(err)
      })
  }


  return (
    <Grid container spacing={1} style={{ padding: "40px", marginLeft: "20px", marginTop: "-50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "43px" }}>
          Tạo phiếu nhập kho
        </h1>
      </Grid>

      <ThemeProvider theme={theme}>

        <Grid item container alignItems="center">
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Mã phiếu nhập
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={code}
              onChange={(e) => { setCode(e.target.value) }}
              style={{ width: "400px", marginLeft: "-15px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Nhà cung cấp
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={supplier}
              onChange={(e) => { setSupplier(e.target.value) }}
              style={{ width: "400px", marginLeft: "-55px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item container alignItems="center" sx={{ mt: 1 }}>
            <Grid item xs={2}>
              <Typography style={{ fontSize: "24px" }}>
                Thời gian
              </Typography>
            </Grid>
            <Grid item xs={4} style={{ marginLeft: "-15px" }}>
              <CustomizedDatePicker
                value={dayjs(date)}
                style={{ width: "400px" }}
                format="DD-MM-YYYY"
              ></CustomizedDatePicker>
            </Grid>

            <Grid xs={2}>
              <Typography style={{ fontSize: "24px", marginLeft: "16px" }}>
                Nhân viên giao
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={delivery}
                onChange={(e) => { setDelivery(e.target.value) }}
                style={{ width: "400px", marginLeft: "-40px" }}
                inputProps={{ style: { fontSize: "20px" } }}
              ></TextField>
            </Grid>
          </Grid>
        </LocalizationProvider>

        <Grid item container alignItems="center" sx={{ mt: 1 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Nhân viên nhập
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={staff_name}
              type="price"
              style={{ width: "400px", marginLeft: "-15px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <h2 style={{ fontSize: "28px" }} >Danh sách nhập hàng</h2>
        </Grid>

        <Grid item>
          <TableContainer component={Paper}>
            <Table style={{ width: 1300, border: "solid", borderWidth: '1px' }} >
              <TableHead >
                <TableRow style={{ backgroundColor: "#C0C0C0" }}>
                  {tableHead.map((col, index) => (
                    <TableCell key={index} >
                      <Typography
                        style={{ fontWeight: "600", fontSize: "22px" }}>
                        {col.name}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody >
                {payments &&
                  payments.map((payment, index) => (
                    <TableRow >
                      <TableCell style={{ fontSize: "20px" }}>
                        {index + 1}
                      </TableCell>

                      <TableCell >
                        <AutoComplete
                          optionList={bookShrinkList}
                          onChange={handleChangeBook(index)}
                          show={false}>
                        </AutoComplete>
                      </TableCell>

                      <TableCell >
                        <TextField
                          inputProps={{
                            style: { fontSize: "20px", width: "180px" },
                            required: true,
                          }}
                          value={payment.price}
                          onChange={handleChangePrice(index)}
                        ></TextField>
                      </TableCell>

                      <TableCell >
                        <TextField
                          inputProps={{
                            style: { fontSize: "20px", width: "80px" },
                            required: true,
                            type: "number",
                            min: 1
                          }}
                          value={payment.quantity}
                          onChange={handleChangeQuantity(index)}
                        ></TextField>
                      </TableCell>

                      <TableCell >
                        <TextField
                          value={payment.price * payment.quantity}
                          inputProps={{
                            style: { fontSize: "20px", width: "180px" },
                            readOnly: true,
                          }}>
                        </TextField>
                      </TableCell>

                      <TableCell >
                        <Button
                          onClick={() => handleDeletePayment(index)}
                          style={{ fontSize: "18px", color: "red" }}
                          type="button"
                        >
                          Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell
                    colSpan={1}
                    style={{ color: "red", fontSize: "24px" }}
                  >
                    Tổng số tiền
                  </TableCell>
                  <TableCell colSpan={4} style={{ fontSize: "20px" }}>
                    <TextField
                      value={amount}
                      inputProps={{
                        style: { fontSize: "18px" },
                        readOnly: true,
                      }}>
                    </TextField>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} sx={{ mt: 1 }}>
          <Typography>
            <Button
              onClick={() => handleAddPayment()}
              style={{ fontSize: "18px", color: "red" }}
              type="button"
            >
              Thêm
            </Button>
          </Typography>
        </Grid>

        <Grid item container alignItems="center" sx={{ mt: 3 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Ghi chú
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              value = {description}
              onChange={(e) => {setDescription(e.target.value)}}
              style={{ width: "510px", marginLeft: "-120px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>


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

          <NavLink to="/import">
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
      </ThemeProvider>
    </Grid>
  );
}
