import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import VerifyOTP from "./Components/VerifyOTP/VerifyOTP";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          exact
          path="/verify-otp/:phoneNumber/:requestId"
          element={<VerifyOTP />}
        />

        <Route exact path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
