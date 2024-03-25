import styles from "./SideBarManager.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { BookIcon } from "../../../Icons/BookIcon";
import { StatisticsIcon } from "../../../Icons/StatisticsIcon";
import { StaffIcon } from "../../../Icons/StaffIcon";
import { ProfileIcon } from "../../../Icons/ProfileIcon";
import { LogoutIcon } from "../../../Icons/LogoutIcon";
import { LoginIcon } from "../../../Icons/LoginIcon";
import { PromotionIcon } from "../../../Icons/PromotionIcon";

const cx = classNames.bind(styles);

function SideBarManager() {
  const [user, setUser] = useState("dang");
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
              startIcon={<BookIcon />}
            >
              Sách
            </Button>
          </NavLink>
          
          <NavLink to="/staff">
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
              startIcon={<StaffIcon />}
            >
              Nhân viên
            </Button>
          </NavLink>

          <NavLink to="/statistics">
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
              startIcon={<StatisticsIcon />}
            >
              Thống kê
            </Button>
          </NavLink>

          <NavLink to="/promotion">
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
              startIcon={<PromotionIcon />}
            >
              Khuyến mãi
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
                marginLeft: "25px",
                borderRadius: "10px",
                fontSize: "25px",
                padding: "0px 5px",
                textAlign: "center",
                color: "black",
              }}
              onClick={() => {
                setUser("");
                sessionStorage.setItem("role", null);
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
                marginLeft: "25px",
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

export default SideBarManager;
