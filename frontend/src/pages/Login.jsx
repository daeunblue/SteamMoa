import React, { useState } from "react";
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
      <div>
        <div>
          <div className="login-logo">
            <img src="" alt="" />
          </div>
          <div className="login-form">
            <input
              id="input_id"
              onChange={onChange}
              type="text"
              value={id}
              placeholder="아이디를 입력하세요"
            />
            <input
              id="input_password"
              onChange={onChange}
              type="password"
              value={password}
              placeholder="비밀번호를 입력하세요"
            />
            <div className="login-find-account">
              <a href="">회원가입</a>
              {/* <a href="">아이디|비밀번호 찾기</a> */}
            </div>
          </div>
          <button className="login-button" onClick={login}>
            로그인
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
