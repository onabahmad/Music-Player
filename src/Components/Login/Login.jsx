import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const Navigate = useNavigate();
  const endpoint = "https://dev.api.goongoonalo.com/v1";

  const handleLogin = async () => {
    try {
      const formattedPhoneNumber = `+${phoneNumber}`;

      const response = await axios.post(`${endpoint}/auth/login`, {
        phoneNumber: formattedPhoneNumber,
      });

      if (response.data.message === "OTP sent to user") {
        const requestId = response.data.requestId;
        Navigate(`/verify-otp/${formattedPhoneNumber}/${requestId}`);
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup">
      <div className="signupContainer">
        <h1 className="signup_title">Sign In</h1>
        <p className="signup_instruction">
          Please enter your mobile number to login. We will send an OTP to
          verify your number
        </p>
        <PhoneInput
          country={"in"}
          countryCodes={{ in: "India" }}
          enableSearch
          inputProps={{
            name: "phone",
            required: true,
            autoFocus: true,
          }}
          inputStyle={{ width: "98%" }}
          inputClass="phonelogin-input"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(value) => setPhoneNumber(value)}
        />
        <button className="signup_button" onClick={handleLogin}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
