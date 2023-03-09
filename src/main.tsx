import React from "react";
import { createRoot } from "react-dom/client";

import { GlobalStyle } from "./assets/css-global";

import Router from "./routes";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <Router />
  </React.StrictMode>
);
