import React from "react";
import ReactDOM from "react-dom";
import AlertTemplate from "react-alert-template-basic";
import { positions, Provider as AlertProvider } from "react-alert";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
