import styles from "./SideBarStaff.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { SearchIcon } from "../../../Icons/SearchIcon";
import { BillIcon } from "../../../Icons/BillIcon";
import { RevenueIcon } from "../../../Icons/RevenueIcon";
import { ImportIcon } from "../../../Icons/ImportIcon";
import { ProfileIcon } from "../../../Icons/ProfileIcon";
import { LogoutIcon } from "../../../Icons/LogoutIcon";
import { LoginIcon } from "../../../Icons/LoginIcon";

const cx = classNames.bind(styles);

function SideBarStaff() {
  const [user, setUser] = useState("hoang");
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/");
  };
  return (
    <div className={cx("wrapperparent")}>
      <div className={cx("sidebar")}>
        <div className={cx("title")}>
          <h1>Phần mềm</h1>
          <h1>quản lý hiệu sách</h1>
        </div>

        <div className={cx("menu")}>

          <NavLink to="/book">
            <Button
              style={{
                padding: "10px 0px",
                fontSize: "30px",
                color: "#4D5656",
                fontWeight: "400",
                textTransform: "none",
                justifyContent: "flex-start",
                paddingLeft: "35px",
                borderRadius: "10px",
                paddingBottom: "4px",
              }}
              className={cx("btn")}
              startIcon={<SearchIcon />}
            >
              Tra cứu
            </Button>
          </NavLink>

          <NavLink to="/bill">
            <Button
              style={{
                padding: "10px 0px",
                fontSize: "30px",
                color: "#4D5656",
                fontWeight: "400",
                textTransform: "none",
                justifyContent: "flex-start",
                paddingLeft: "35px",
                borderRadius: "10px",
                paddingBottom: "4px",
              }}
              className={cx("btn")}
              startIcon={<BillIcon />}
            >
              Hóa đơn
            </Button>
          </NavLink>

          <NavLink to="/import">
            <Button
              style={{
                padding: "10px 0px",
                fontSize: "30px",
                color: "#4D5656",
                fontWeight: "400",
                textTransform: "none",
                justifyContent: "flex-start",
                paddingLeft: "35px",
                borderRadius: "10px",
                paddingBottom: "4px",
              }}
              className={cx("btn")}
              startIcon={<ImportIcon />}
            >
              Nhập sách
            </Button>
          </NavLink>

          <NavLink to="/revenue">
            <Button
              style={{
                padding: "10px 0px",
                fontSize: "30px",
                color: "#4D5656",
                fontWeight: "400",
                textTransform: "none",
                justifyContent: "flex-start",
                paddingLeft: "35px",
                borderRadius: "10px",

                paddingBottom: "4px",
              }}
              className={cx("btn")}
              startIcon={<RevenueIcon />}
            >
              Doanh thu
            </Button>
          </NavLink>

        </div>
        <div className={cx("hr")}></div>
        <div className={cx("user")}>
          <NavLink to="/profile">
            <Button
              style={{
                padding: "10px 0px",
                fontSize: "30px",
                color: "black",
                fontWeight: "400",
                textTransform: "none",
                justifyContent: "flex-start",
                paddingLeft: "50px",
                borderRadius: "10px",

                paddingBottom: "4px",
              }}
              className={cx("btn")}
              startIcon={<ProfileIcon />}
            >
              Hồ sơ
            </Button>
          </NavLink>
          {(user && sessionStorage.getItem("role") != "null") ? (
            <Button
              style={{
                backgroundColor: "#f9bf89",
                width: "80%",
                marginLeft: "10px",
                borderRadius: "10px",
                fontSize: "25px",
                padding: "0px 5px",
                textAlign: "center",
                color: "black",
              }}
              onClick={() => {
                setUser("");
                sessionStorage.setItem("user", null);
                navigate('/')
              }}
              startIcon={<LogoutIcon />}
            >
              Đăng xuất
            </Button>
          ) : (
            <Button
              style={{
                backgroundColor: "#f9bf89",
                width: "80%",
                marginLeft: "10px",
                borderRadius: "10px",
                fontSize: "25px",
                padding: "0px 5px",
                textAlign: "center",
                color: "black",
              }}
              onClick={handleLogin}
              startIcon={<LoginIcon />}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBarStaff;
