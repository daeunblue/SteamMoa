import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import axios from "axios";

const Login = (props) => {
  const [user, setUser] = useState({
    service_id: "",
    service_pw: "",
  });
const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios
      .post("/api/auth/login", {
        user_service_id: user.service_id,
        user_service_pw: user.service_pw,
      })
      .then(function (response) {
          console.log(response);
        //  로그인 후 처리 -> 
        // 1. status 200일때 메인 페이지 or 원래 있던 페이지로 리다이렉트
        if (response.status === '200') {
          navigate('/');
        // 2. 나머지는 오류 메시지 보여주기 (toast로)
        } else {
          alert(response.message);
        }
      })
        .catch(() => {
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="bg-slate-700 w-4/5 h-screen m-auto mb-6 flex flex-col align-center justify-center">
        <div className="m-auto w-96">
            <div className="login-logo">
            <img src="../ImgAssets/TypoIconLogo.png" alt="TypoIconLogo" className="login-Logo m-auto my-10"/>
            </div>
            <div className="login-form">
              <input
                className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id="input_id"
                name="service_id"
                onChange={onChange}
                type="text"
                value={user.service_id}
                placeholder="아이디를 입력하세요"
              />
              <input
                className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id="input_password"
                name="service_pw"
                onChange={onChange}
                type="password"
                value={user.service_pw}
                placeholder="비밀번호를 입력하세요"
              />
              <div className="login-find-account flex justify-end texts-end text-white text-xs mb-4">
                <div className="mr-2">
                <Link to="/" >회원가입</Link>
                </div>
                <div className="items-end mb-4">
                <Link to="/">아이디|비밀번호 찾기</Link>
                </div>
              </div>
            </div>
            <div>
              <button className="login-button text-white bg-black hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full h-16 px-5 py-2.5 text-center" onClick={login}>
                로그인
              </button>
            </div>
        </div>
      </div>
      
    </>
  );
};

export default Login;
