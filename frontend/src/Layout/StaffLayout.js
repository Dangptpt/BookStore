import SideBarStaff from "./Sidebar/SideBarStaff/SideBarStaff";
import styles from "./Layout.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { Typography } from "@mui/material";
const cx = classNames.bind(styles);

function StaffLayout({ children }) {
  const user = sessionStorage.getItem("role")

  return (
    <div className={cx("wrapper")}>
      <SideBarStaff className={cx("sidebar")} />
      <div className={cx("children")}>{user != 'null' ? children : <p style={{marginLeft: '50px', fontSize: '40px'}}>Hãy đăng nhập để thao tác
      </p> }</div>
    </div>
  );
}

export default StaffLayout;
