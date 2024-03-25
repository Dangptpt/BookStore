import HomePage from "../Pages/Home/HomePage.js";
import BookPage from "../Pages/Book/BookPage.js";
import BookEditPage from "../Pages/Book/BookEditPage.js";
import BookAddPage from "../Pages/Book/BookAddPage.js";
import LoginPage from "../Pages/Home/LoginPage.js";
import BillPage from "../Pages/Bill/BillPage.js";
import BillAddPage from "../Pages/Bill/BillAddPage.js";
import BillEditPage from "../Pages/Bill/BillEditPage.js";
import ImportPage from "../Pages/Import/ImportPage.js";
import ImportAddPage from "../Pages/Import/ImportAddPage.js";
import ImportEditPage from "../Pages/Import/ImportEditPage.js";
import RevenuePage from "../Pages/Revenue/RevenuePage.js";
import ProfilePage from "../Pages/Profile/ProfilePage.js";
import ChangePasswordPage from "../Pages/Profile/ChangePasswordPage.js";
import StaffPage from "../Pages/Staff/StaffPage.js";
import StaffAddPage from "../Pages/Staff/StaffAddPage.js";
import StaffEditPage from "../Pages/Staff/StaffEditPage.js";
import StatisticsPage from "../Pages/Statistics/StatisticsPage.js";
import ManagerLayout from "../Layout/ManagerLayout.js";
import StaffLayout from "../Layout/StaffLayout.js";
import NoneLayout from "../Layout/NoneLayout.js";

const role = sessionStorage.getItem("role");

const publicRoutes = [
  { path: "/", component: LoginPage, layout: NoneLayout },
  { path: "/home", component: HomePage },
  { path: "/book", component: BookPage},
  { path: "/book/add", component: BookAddPage},
  { path: "/book/edit/:id", component: BookEditPage},
  { path: "/bill", component: BillPage},
  { path: "/bill/add", component:BillAddPage},
  { path: "/bill/edit/:id", component:BillEditPage},
  { path: "/import", component:ImportPage},
  { path: "/import/add", component:ImportAddPage},
  { path: "/import/edit/:id", component:ImportEditPage},
  { path: "/revenue", component: RevenuePage},
  { path: "/profile", component: ProfilePage},
  { path: "/profile/password", component: ChangePasswordPage},
  { path: "/staff/add", component: StaffAddPage},
  { path: "/staff/edit/:id", component: StaffEditPage},
  { path: "/staff", component: StaffPage},
  { path: "/statistic", component: StatisticsPage}
];

export { publicRoutes };  
