import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";

const Login = (props) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    if (e.target.id == "input_id") setId(e.target.value);
    else setPassword(e.target.value);
  };
  const login = () => {
    axios
      .post("URL", {
        user_service_id: id,
        user_service_pw: password,
      })
      .then(function (response) { //실패했을때 코드
          console.log(response);
        //   로그인 후 처리 -> 
        //   1. 중앙 state 보관
        //   2. main OR 원래 페이지로 redirect(원래 있던 페이지 저장)
      })
        .catch(() => {
          
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="w-3/5">
        <div className="mb-6">
          <div className="login-logo">
            <img src="" alt="" />
          </div>
          <div className="login-form mb-6">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="input_id"
              onChange={onChange}
              type="text"
              value={id}
              placeholder="아이디를 입력하세요"
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="input_password"
              onChange={onChange}
              type="password"
              value={password}
              placeholder="비밀번호를 입력하세요"
            />
            <div className="login-find-account">
              <Link to="/" >회원가입</Link>
              {/* <a href="">아이디|비밀번호 찾기</a> */}
            </div>
          </div>
          <button className="login-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={login}>
            로그인
          </button>
        </div>
      </div>
      
    </>
  );
};

export default Login;
