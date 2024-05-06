import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import ManagerLayout from "./Layout/ManagerLayout.js";
import StaffLayout from "./Layout/StaffLayout.js";


function App() {
  const role = sessionStorage.getItem("role");
  return (
    <div>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            console.log(role)
            let Layout = (role === "admin") ? ManagerLayout : StaffLayout
            if (route.layout) {
              Layout = route.layout;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <ToastContainer autoClose={3000} hideProgressBar position="top-center" />
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
