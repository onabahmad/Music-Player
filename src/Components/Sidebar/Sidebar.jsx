import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CiGrid42 } from "react-icons/ci";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar_logo">
        <h1>Logo</h1>
      </div>
      <div className="options">
        <div className="option1">
          <div className="grid_icon">
            <CiGrid42 />
          </div>
        </div>
        <div className="option2" onClick={handleLogout}>
          <RiLogoutCircleRLine />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
