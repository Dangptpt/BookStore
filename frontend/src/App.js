import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import GlobalStyles from "./Layout/GlobalStyles/index.js";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = route.layout;

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
