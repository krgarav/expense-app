import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "../node_modules/react-bootstrap/dist/react-bootstrap.min";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { AuthContextProvider } from "./Store/auth-context";
import { BrowserRouter } from "react-router-dom";
import { ListProvider } from "./Store/list-context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ListProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ListProvider>
  </BrowserRouter>
);
