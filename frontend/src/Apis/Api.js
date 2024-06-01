import axios from "axios";

const newLocal = "http://localhost:8000";
export const API_BASE_URL = newLocal;

class ClassApi {
  /**** Book ****/
  getAllBook() {
    return axios.get(API_BASE_URL + "/book/all", {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }

  getBookByElement(name, author, category) {
    return axios.get(API_BASE_URL + `/book?name=${name}&author=${author}&category=${category}`, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }

  getBookById(id) {
    return axios.get(API_BASE_URL + `/book/${id}`, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }

  editBook(id, data) {
    return axios.patch(API_BASE_URL + `/book/?book_id=${id}`, data, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }

  postNewBook(data) {
    return axios.post(API_BASE_URL + '/book', data, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }

  editQuantity(data) {
    return axios.patch(API_BASE_URL + '/book/quantity', data, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }

  /**** Bill ****/
  getAllBill() {
    return axios.get(API_BASE_URL + "/bill/all", {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }

  getBillById(id) {
    return axios.get(API_BASE_URL + `/bill/${id}`, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }
  
  getBillByElement(start_time, end_time) {
    return axios.get(API_BASE_URL + `/bill?start_time=${start_time}&end_time=${end_time}`, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }

  postNewBill(data) {
    return axios.post(API_BASE_URL + '/bill', data, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }

  editBill(id, data) {
    return axios.patch(API_BASE_URL, `/bill/${id}`, data, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }

  /**** Import_Bill ****/
  getAllImportBill() {
    return axios.get(API_BASE_URL + "/import/all", {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  
  getImportBillById(id) {
    return axios.get(API_BASE_URL + `/import/${id}`, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }

  getImportBillByElement(start_time, end_time) {
    return axios.get(API_BASE_URL + `/import?start_time=${start_time}&end_time=${end_time}`, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }

  postNewImportBill(data) {
    return axios.post(API_BASE_URL + '/import', data, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }
  
  editImportBill(id, data) {
    return axios.patch(API_BASE_URL, `/import/${id}`, data, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }

  /**** Staff ****/
  getAllStaff() {
    return axios.get(API_BASE_URL + "/staff/all", {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }

  getStaffById(id) {
    return axios.get(API_BASE_URL + `/staff/${id}`, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }
  
  postNewStaff(data) {
    return axios.post(API_BASE_URL + '/staff', data, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }
  
  editStaff(id, data) {
    return axios.patch(API_BASE_URL + `/staff/info?staff_id=${id}`, data, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }

  deleteStaff(id) {
    return axios.delete(API_BASE_URL + `/staff/${id}`, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }

  getStatistic(day) {
    return axios.get(API_BASE_URL + `/statistic?day=${day}`, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }

  /**** Auth ****/
  postLogin(account, password) {
    return axios.post(API_BASE_URL + "/auth/login", {
      staff_code: account,
      password: password,
    });
  }

  changePassword(data, id) {
    return axios.patch(API_BASE_URL + `/auth/password?staff_id=${id}`, data, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }
  
  resetPassword(staff_code) {
    return axios.post(API_BASE_URL + `/auth/reset?staff_code=${staff_code}`)
  }
}

export default new ClassApi();
