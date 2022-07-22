import React from "react";
import Navbar from "../components/Navbar";
import axios from 'axios';


const Signup = (props) => {

  const handleSteamAuth = () => {
    
  }
  
  return (
    <>
      <Navbar />
      <div>
        {/* 로고 */}
        <img src="" alt="" />
        <div className="description">스팀로그인하세요</div>
        {/* 스팀 로그인 버튼 */}
        <img src="../steam_signin.png" alt="" onClick={handleSteamAuth} />
      </div>
    </>
  );
};

export default Signup;
