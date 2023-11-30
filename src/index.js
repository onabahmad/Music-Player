import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import axios from "axios";
// process.env.REACT_APP_ENDPOINT = "https://dev.api.goongoonalo.com/v1";
// process.env.REACT_APP_TOKEN = "";
// process.env.REACT_APP_REQUEST_ID = "";
// process.env.REACT_APP_OTP = "5678";
// process.env.REACT_APP_USER_ID = "+919000000000";

// axios.defaults.baseURL = process.env.REACT_APP_ENDPOINT;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
