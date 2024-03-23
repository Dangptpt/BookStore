import axios from "axios";

const newLocal = "https://localhost:7030/api";
export const API_BASE_URL = newLocal;
class ClassApi {
  //****** ******/
  //Api Quan tri vien

  getAllUser() {
    return axios.get(API_BASE_URL + "/account/all", {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }

  getUserById(id) {
    return axios.get(API_BASE_URL + `/account/${id}`, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }

  resetPassword(id) {
    return axios.get(API_BASE_URL + `/account/reset/${id}`, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }

  registerUser(username, password) {
    return axios.post(
      API_BASE_URL + "/account/register",
      { username: username, password: password, role: "user" },
      {
        headers: {
          "access-control-allow-origin": "*",
          "content-type": "application/json; charset=utf-8 ",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        }
      }
    );
  }

  deleteUser(id) {
    return axios.delete(API_BASE_URL + `/account/${id}`, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }

  //********** */
  //Api dang nhap
  PostLogin(account, password) {
    return axios.post(API_BASE_URL + "/account/login", {
      username: account,
      password: password,
    });
  }
  ChangePassword(oldpassword, newpassword) {
    return axios.put(
      API_BASE_URL + "/account",
      {
        oldpassword: oldpassword,
        newpassword: newpassword,
      },
      {
        headers: {
          "access-control-allow-origin": "*",
          "content-type": "application/json; charset=utf-8 ",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        }
      }
    );
  }

  /***** */
  //Api ho so
  GetHoSo(id) {
    return axios.get(API_BASE_URL + "/user/" + id, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  PutHoSo(id, admin) {
    return axios.put(API_BASE_URL + "/user/" + id, admin, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  /****** */

  /******** */
  //Api quan ly thu
  GetAllResidenceReceipt() {
    return axios.get(API_BASE_URL + "/residencereceipt/all", {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  GetResidenceReceipt(id) {
    return axios.get(API_BASE_URL + "/residencereceipt/" + id, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  FindResidenceReceipt(name, address, starttime, endtime) {
    return axios.get(
      API_BASE_URL +
      "/residencereceipt?name=" +
      name +
      "&address=" +
      address +
      "&starttime=" +
      starttime +
      "&endtime=" +
      endtime,
      {
        headers: {
          "access-control-allow-origin": "*",
          "content-type": "application/json; charset=utf-8 ",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        }
      }
    );
  }
  FindResidenceReceiptByFeeId(
    name,
    address,
    starttime,
    endtime,
    residenceFeeId
  ) {
    return axios.get(
      API_BASE_URL +
      "/residencereceipt/feeid" +
      "?name=" +
      name +
      "&address=" +
      address +
      "&starttime=" +
      starttime +
      "&endtime=" +
      endtime +
      "&id=" +
      residenceFeeId,
      {
        headers: {
          "access-control-allow-origin": "*",
          "content-type": "application/json; charset=utf-8 ",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        }
      }
    );
  }
  PostResidenceReceipt(residenceReceiptData) {
    return axios.post(
      API_BASE_URL + "/residencereceipt",
      residenceReceiptData,
      {
        headers: {
          "access-control-allow-origin": "*",
          "content-type": "application/json; charset=utf-8 ",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        }
      }
    );
  }
  PutResidenceReceipt(residenceReceiptData, id) {
    return axios.put(
      API_BASE_URL + "/residencereceipt/" + id,
      residenceReceiptData,
      {
        headers: {
          "access-control-allow-origin": "*",
          "content-type": "application/json; charset=utf-8 ",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        }
      }
    );
  }
  GetResidenceFee(id) {
    return axios.get(API_BASE_URL + "/residencefee/" + id, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  GetResidenceFeeByName(name) {
    return axios.get(API_BASE_URL + "/residencefee/?name=" + name, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  GetAllResidenceFee() {
    return axios.get(API_BASE_URL + "/residencefee/all", {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  PostResidenceFee(residenceFeeData) {
    return axios.post(API_BASE_URL + "/residencefee/", residenceFeeData, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }

  //****** */

  /***** */
  //Api cu dan
  /****** */
  //api ho khau
  GetResidences() {
    return axios.get(API_BASE_URL + "/residence/all", {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  GetResidenceById(id) {
    return axios.get(API_BASE_URL + "/residence/" + id, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  FindResidence(name, address) {
    return axios.get(
      API_BASE_URL + "/residence?name=" + name + "&address=" + address,
      {
        headers: {
          "access-control-allow-origin": "*",
          "content-type": "application/json; charset=utf-8 ",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        }
      }
    );
  }
  PostResidence(residence) {
    return axios.post(API_BASE_URL + "/residence", residence, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  PutResidence(residence, id) {
    return axios.put(API_BASE_URL + '/residence/' + id, residence, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }

  GetRecord(id) {
    return axios.get(API_BASE_URL + '/record/residence/' + id, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }
  //api nhan khau
  GetInfoPerson(id) {
    return axios.get(API_BASE_URL + "/person/" + id, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  GetPerson(person) {
    return axios.get(API_BASE_URL + "/person?name=" + person, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  GetAllPeople() {
    return axios.get(API_BASE_URL + "/person/all", {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  PostPerson(person) {
    return axios.post(API_BASE_URL + "/person", person, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  PutPerson(person) {
    return axios.put(API_BASE_URL + "/person/" + person.personId, person, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  //api tạm vắng
  GetAllAbsent() {
    return axios.get(API_BASE_URL + "/absent/all", {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  GetAbsentById(id) {
    return axios.get(API_BASE_URL + '/absent?id=' + id, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }
  //api postabsent 
  PostAbsent(absent) {
    return axios.post(API_BASE_URL + "/absent", absent, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  PutAbsent(absent, id) {
    return axios.put(API_BASE_URL + '/absent/' + id, absent, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    })
  }
  FindAbsent(name) {
    return axios.get(API_BASE_URL + "/absent/person?name=" + name, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  //**
  //Api phuong tien
  //*** */

  GetAllVehicles() {
    return axios.get(API_BASE_URL + "/vehicle/all", {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  GetVehicleById(id) {
    return axios.get(API_BASE_URL + "/vehicle/id?id=" + id, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  FindVehicle(licenseplate, ownerName, category) {
    return axios.get(
      API_BASE_URL +
      "/vehicle?licenseplate=" +
      licenseplate +
      "&ownerName=" +
      ownerName +
      "&category=" +
      category,
      {
        headers: {
          "access-control-allow-origin": "*",
          "content-type": "application/json; charset=utf-8 ",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        }
      }
    );
  }
  GetVehicle(id) {
    return axios.get(API_BASE_URL + "/vehicle/" + id, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  PostVehicle(vehicle) {
    return axios.post(API_BASE_URL + "/vehicle", vehicle, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }

  PostVehicleFee(vehiclefee) {
    return axios.post(API_BASE_URL + "/vehiclefee", vehiclefee, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  GetAllVehicleFees() {
    return axios.get(API_BASE_URL + "/vehiclefee/all", {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  GetVehicleFee(id) {
    return axios.get(API_BASE_URL + "/vehiclefee/" + id, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  GetAllVehicleReceipt() {
    return axios.get(API_BASE_URL + "/vehiclereceipt/all", {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  GetVehicleFeeByName(name) {
    return axios.get(API_BASE_URL + "/vehiclefee/?name=" + name, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  FindVehicleReceipt(lisensePlate, name, starttime, endtime) {
    return axios.get(
      API_BASE_URL +
      "/vehiclereceipt?licenseplate=" +
      lisensePlate +
      "&name=" +
      name +
      "&starttime=" +
      starttime +
      "&endtime=" +
      endtime,
      {
        headers: {
          "access-control-allow-origin": "*",
          "content-type": "application/json; charset=utf-8 ",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        }
      }
    );
  }


  FindVehicleReceiptByFeeId(
    lisensePlate,
    name,
    starttime,
    endtime,
    vehicleFeeId,
  ) {
    return axios.get(
      API_BASE_URL +
      "/vehiclereceipt/feeid" +
      "?licenseplate=" +
      lisensePlate +
      "&name=" +
      name +
      "&starttime=" +
      starttime +
      "&endtime=" +
      endtime +
      "&id=" +
      vehicleFeeId,
      {
        headers: {
          "access-control-allow-origin": "*",
          "content-type": "application/json; charset=utf-8 ",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        }
      }
    );
  }



  GetVehicleReceipt(id) {
    return axios.get(API_BASE_URL + "/vehiclereceipt/" + id, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  PostVehicleReceipt(vehicleReceipt) {
    return axios.post(API_BASE_URL + "/vehiclereceipt", vehicleReceipt, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  PutVehicleReceipt(vehicleReceiptData, id) {
    return axios.put(
      API_BASE_URL + "/vehiclereceipt/" + id,
      vehicleReceiptData,
      {
        headers: {
          "access-control-allow-origin": "*",
          "content-type": "application/json; charset=utf-8 ",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        }
      }
    );
  }



  /***** */
  //Api doi mat khau
  PutPassword(id, pass) {
    return axios.put(API_BASE_URL + "/account/" + id, pass, {
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=utf-8 ",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    });
  }
  /****** */
}
export default new ClassApi();
