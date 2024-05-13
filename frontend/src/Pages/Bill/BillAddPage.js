import React, { useEffect, useMemo } from "react";
import { Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from "@mui/system";
import { Table, TableBody, TableCell, createTheme, ThemeProvider, Box } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import AutoComplete from "../../component/AutoCompleteSearch"
import ClassAPi from '../../Apis/Api'
import dayjs from "dayjs";

const CustomizedDateTimePicker = styled(DateTimePicker)`
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

export default function BillAddPage() {
  const tableHead = [
    { name: "Số thứ tự" },
    { name: "Tên sách" },
    { name: "Số lượng" },
    { name: "Thành tiền" },
    { name: "" }
  ];
  const [payments, setPayments] = useState([]);
  const [books, setBooks] = useState([])
  const [date, setDate] = useState(new Date())
  const [amount, setAmount] = useState(0)
  const [customer_name, setCustomer_Name] = useState("")
  const [customer_phone_number, setCustomer_phone_number] = useState("")
  const [description, setDescription] = useState("")
  const cashier_name = sessionStorage.getItem('name')
  const bookShrinkList = []
  const handleAddPayment = () => {
    setPayments([...payments, { name: "", quantity: 0, id: 0, price: 0, remain: 0 }]);
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
      price: book.price
    });
  });
  console.log(bookShrinkList)
  const handleChangeBook = (index) => (event, value) => {
    let newPayments = [...payments];
    if (value !== null) {
      if (value.quantity == 0) {
        toast.warning("Sách " + value.name + " đã hết hàng!");
        newPayments[index] = { name: "", quantity: 0, id: 0, price: 0, remain: 0 };
        setAmount(amount - payments[index].price * payments[index].quantity);
      }
      else {
        newPayments[index] = {
          name: value.name,
          quantity: 1,
          price: value.price,
          id: value.id,
          remain: value.quantity
        };
        if (payments[index].name !== "")
          setAmount(amount - payments[index].price * payments[index].quantity + value.price);
        else
          setAmount(amount + value.price);
      }
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
    if (q > newPayments[index].remain) {
      toast.warning("Quá số lượng còn lại!")
      return
    }
    let old = newPayments[index].quantity
    newPayments[index].quantity = q;
    setPayments(newPayments);

    setAmount(amount + q * payments[index].price - old * payments[index].price)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const bill_payments = []
    payments.map((payment, _) => {
      bill_payments.push({
        book_id: payment.id,
        quantity: payment.quantity,
      });
    });   
    const offsetMinutes = -7 * 60 * 60000;
    let time_created = new Date(Date.UTC(0, 0, 1, 0, 0, 0, 0));;
    time_created = new Date(date - offsetMinutes)
    console.log(time_created)
    
    const data = {
      bill_info: {
        customer_name: customer_name,
        customer_phone_number: customer_phone_number,
        cashier_name: cashier_name,
        description: description,
        time_created: time_created.toISOString(),
        amount: amount
      },
      bill_payments: bill_payments
    }
    console.log(data)
    ClassAPi.postNewBill(data)
      .then((respone) => {
        toast.success('Tạo hóa đơn thành công')
        console.log(respone)
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
          Tạo hóa đơn
        </h1>
      </Grid>

      <ThemeProvider theme={theme}>

        <Grid item container alignItems="center" sx={{ mt: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>

            <Grid item xs={2}>
              <Typography style={{ fontSize: "24px" }}>
                Thời gian thanh toán
              </Typography>
            </Grid>
            <Grid item xs={4} style={{ marginLeft: "-15px" }}>
              <CustomizedDateTimePicker
                format="DD-MM-YYYY hh-mm A"
                value={dayjs(date)}
              ></CustomizedDateTimePicker>
            </Grid>
          </LocalizationProvider>

          <Grid xs={2}>
            <Typography style={{ fontSize: "24px", marginLeft: "16px" }}>
              Tên khách hàng
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={customer_name}
              onChange={(e) => setCustomer_Name(e.target.value)}
              style={{ width: "400px", marginLeft: "-40px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>

        <Grid item container alignItems="center" sx={{ mt: 1 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Thu ngân
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={cashier_name}
              style={{ width: "400px", marginLeft: "-15px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>

          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Số điện thoại
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={customer_phone_number}
              onChange={(e) => setCustomer_phone_number(e.target.value)}
              style={{ width: "400px", marginLeft: "-55px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            ></TextField>
          </Grid>
        </Grid>


        <Grid item xs={12}>
          <h2 style={{ fontSize: "28px" }} >Danh sách mua hàng</h2>
        </Grid>

        <Grid item>
          <TableContainer component={Paper}>
            <Table style={{ width: 1100, border: "solid", borderWidth: '1px' }} >
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
                          onChange={handleChangeBook(index)}>
                        </AutoComplete>
                      </TableCell>

                      <TableCell >
                        <TextField
                          inputProps={{
                            style: { fontSize: "20px", width: "100px" },
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
                          inputProps={{
                            style: { fontSize: "20px", width: "180px" },
                            readOnly: true,
                          }}
                          value={payment.price * payment.quantity}
                        >
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
                      inputProps={{
                        style: { fontSize: "18px" },
                        readOnly: true,
                      }}
                      value={amount}>
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

        <Grid item container alignItems="center" sx={{ mt: 1 }}>
          <Grid xs={2}>
            <Typography style={{ fontSize: "24px" }}>
              Ghi chú
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            onClick={handleSubmit}
            type="submit"
          >
            Xác nhận
          </Button>

          <NavLink to="/bill">
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
