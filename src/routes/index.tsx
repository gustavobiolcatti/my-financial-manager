import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import AuthProvider from "contexts/AuthContext";

import Login from "pages/Login";
import Home from "pages/Home";
import Transations from "pages/Transations";
import Dashboard from "pages/Dashboard";
import Banks from "pages/Banks";
import Error from "pages/Error";

import PrivateRoutes from "routes/PrivateRoutes";

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
          <Route
            element={
              <PrivateRoutes>
                <Outlet />
              </PrivateRoutes>
            }
          >
            <Route path="/" element={<Home />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="transations" element={<Transations />} />
              <Route path="banks" element={<Banks />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
