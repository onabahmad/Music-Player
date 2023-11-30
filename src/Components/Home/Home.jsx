import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";
import "./Home.css";
const Home = () => {
  return (
    <div className="home_container">
      <Sidebar />
      <Main />
    </div>
  );
};

export default Home;
