import React from "react";
import Navbar from "../components/Navbar";

// import axios from "axios";

const Signup = (props) => {
  const handleSteamAuth = () => {
    // genUrl 중간함수
    const http_build_query = (obj) => {
      let str = "";

      for (const key in obj) {
        const value = obj[key];
        str += `${key}=${value}&`;
      }

      return str;
    };

    // steam으로 보내줄 url 만드는 함수
    const genUrl = () => {
      const params = {
        "openid.ns": "http://specs.openid.net/auth/2.0",
        "openid.mode": "checkid_setup",
        "openid.return_to": "http://localhost:3000/signupform",
        "openid.realm": "http://localhost:3000",
        "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
        "openid.claimed_id":
          "http://specs.openid.net/auth/2.0/identifier_select",
      };

      const url = `https://steamcommunity.com/openid/login?${http_build_query(
        params
      )}`;
      return url;
    };
    console.log(genUrl());
    window.location.href = genUrl();
  };
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
