import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import AuthProvider from "./contexts/AuthContext";

import { GlobalStyle } from "./assets/css-global";

import AppRoutes from "./routes";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <AuthProvider>
      <RouterProvider router={AppRoutes} />
    </AuthProvider>
  </React.StrictMode>
);
