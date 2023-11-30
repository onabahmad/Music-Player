import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import OtpInput from "react-otp-input";
import "./VerifyOTP.css";

const VerifyOTP = () => {
  const [otp, setOTP] = useState("");
  const Navigate = useNavigate();
  const { phoneNumber, requestId } = useParams();

  const handleVerifyOTP = async () => {
    try {
      await axios.post("https://dev.api.goongoonalo.com/v1/auth/verify_otp", {
        phoneNumber,
        requestId: requestId,
        otp,
      });

      alert("OTP Verified!");
      Navigate("/home");
    } catch (error) {
      console.error("OTP verification error:", error);
      alert("OTP verification failed. Try 5678.");
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(
        "https://dev.api.goongoonalo.com/v1/auth/login",
        {
          phoneNumber,
        }
      );

      alert("OTP Resent!");
    } catch (error) {
      console.error("OTP resend error:", error);
      alert("OTP resend failed. Please try again.");
    }
  };
  function handleAnotherNumber() {
    Navigate("/");
  }

  return (
    <div className="verifyOTP">
      <div className="verifyOTP_Container">
        <h1 className="verifyOTP_Title">OTP Verification</h1>
        <p className="verifyOTP_Instruction">
          We have sent an OTP to {phoneNumber}.Please enter the code recived to
          verify
        </p>
        <div className="OTP_Input_container">
          <OtpInput
            otpType="number"
            OTPLength={4}
            value={otp}
            autoFocus
            disabled={false}
            skipDefaultStyles={true}
            containerStyle="otpInput_Container"
            onChange={(newOtp) => setOTP(newOtp)}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        </div>
        <button className="verifyOTP_button" onClick={handleVerifyOTP}>
          Verify OTP
        </button>
        <div className="resent_container">
          <button className="resent_button" onClick={handleResendOTP}>
            Resend OTP
          </button>
          <button
            className="anotherNumber_button"
            onClick={handleAnotherNumber}
          >
            Use another number
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
