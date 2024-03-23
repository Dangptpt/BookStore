import HomePage from "../Pages/Home/HomePage.js";
import BookPage from "../Pages/Book/BookPage.js";
import BookAddPage from "../Pages/Book/BookAddPage.js";
import LoginPage from "../Pages/Home/LoginPage.js";
import BillPage from "../Pages/Bill/BillPage.js";
import BillAddPage from "../Pages/Bill/BillAddPage.js";
import BillEditPage from "../Pages/Bill/BillEditPage.js";
import ImportPage from "../Pages/Import/ImportPage.js";
import ImportAddPage from "../Pages/Import/ImportAddPage.js";
import RevenuePage from "../Pages/Revenue/RevenuePage.js";
import ProfilePage from "../Pages/Profile/ProfilePage.js";
import ChangePasswordPage from "../Pages/Profile/ChangePasswordPage.js";
import ManagerLayout from "../Layout/ManagerLayout.js";
import StaffLayout from "../Layout/StaffLayout.js";
import NoneLayout from "../Layout/NoneLayout.js";

const role = sessionStorage.getItem("role");

const publicRoutes = [
  { path: "/", component: LoginPage, layout: NoneLayout },
  { path: "/home", component: HomePage, layout: (role === "user") ? StaffLayout : ManagerLayout },
  { path: "/book", component: BookPage, layout: (role === "user") ? StaffLayout : ManagerLayout},
  { path: "/book/add", component: BookAddPage, layout: ManagerLayout},
  { path: "/bill", component: BillPage, layout: StaffLayout},
  { path: "/bill/add", component:BillAddPage, layout: StaffLayout},
  { path: "/bill/edit", component:BillEditPage, layout: StaffLayout},
  { path: "/import", component:ImportPage, layout: StaffLayout},
  { path: "/import/add", component:ImportAddPage, layout: StaffLayout},
  { path: "/revenue", component: RevenuePage, layout: StaffLayout},
  { path: "/profile", component: ProfilePage, layout: StaffLayout},
  { path: "/profile/password", component: ChangePasswordPage, layout: StaffLayout},


];

export { publicRoutes };  
