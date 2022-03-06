import React from "react";
import ReactDOM from "react-dom";
import AlertTemplate from "react-alert-template-basic";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import App from "./App";

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_LEFT,
  timeout: 1500,
  offset: "30px 250px",
  // you can also just use 'scale'
  transition: transitions.FADE,
};

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
