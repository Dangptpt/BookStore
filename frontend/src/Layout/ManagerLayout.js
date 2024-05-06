import styles from "./Layout.scss";
import classNames from "classnames/bind";
import { Typography } from "@mui/material";
import SideBarManager from "./Sidebar/SideBarManager/SideBarManager.js";
const cx = classNames.bind(styles);
function ManagerLayout({ children }) {
    const user = sessionStorage.getItem("role")
    return (
        <div className={cx("wrapper")}>
            <SideBarManager className={cx("sidebar")} />
            <div className={cx("children")}>{user === 'admin' ? children : <p style={{ marginLeft: '50px', fontSize: '40px' }}>Hãy đăng nhập để thao tác
            </p>}</div>
        </div>
    );
}
export default ManagerLayout;
