import { createBrowserRouter, Outlet } from "react-router-dom";

import Dashboard from "pages/Dashboard";
import Login from "pages/Login";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = createBrowserRouter([
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
      },
    ],
  },
]);

export default AppRoutes;
