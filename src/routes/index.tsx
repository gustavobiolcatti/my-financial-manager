import { createBrowserRouter, Outlet } from "react-router-dom";

import Dashboard from "pages/Dashboard";
import Login from "pages/Login";

import PrivateRoutes from "routes/PrivateRoutes";

const AppRoutes = createBrowserRouter([
  {
    path: "*",
    element: <h1>PAGE NOT FOUND</h1>,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    element: (
      <PrivateRoutes>
        <Outlet />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [],
      },
    ],
  },
]);

export default AppRoutes;
