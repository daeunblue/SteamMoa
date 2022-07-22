import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";


const Signup = (props) => {

  const handleSteamAuth = () => {
      axios({
          url: "https://steamcommunity.com/openid/login",
          method: 'post',
          data: {
              'openid.identity': "http://specs.openid.net/auth/2.0/identifier_select",
              'openid.claimed_id': "http://specs.openid.net/auth/2.0/identifier_select",
              'openid.ns': "http://specs.openid.net/auth/2.0",
              'openid.mode': "checkid_setup",
              'openid.realm': "http://localhost:3000",
              'openid.return_to': "http://localhost:3000"
          }
      }).then((res) => {
        console.log(res);
      });
    // 중앙에 userSignupID 저장 후 회원가입 폼 날릴때 해당 정보 포함, userSignupID 초기화
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
