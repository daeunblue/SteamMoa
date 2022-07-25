import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const SignupForm = (props) => {
  const location = useLocation();
  const [user, setUser] = useState({
    service_id: "",
    name: "",
    service_pw: "",
    service_pw_confirm: "",
  });
  useEffect(() => {
    //return url 파싱
    const search = location.search.substring(1);

    const urlObj = JSON.parse(
      '{"' +
        decodeURI(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
    const getUserId = (response) => {
      const str = response["openid.claimed_id"];
      const res = decodeURIComponent(str);
      const propsArr = res.split("/");
      console.log(propsArr);

      return propsArr[propsArr.length - 1];
    };

    const userId = getUserId(urlObj);
    console.log(userId);
  });

  const onChange = (e) => {
    const target = e.target.id;
    if (target === "user_service_id")
      setUser({ ...user, service_id: e.target.value });
    else if (target === "user_name") setUser({ ...user, name: e.target.value });
    else if (target === "user_service_pw")
      setUser({ ...user, service_pw: e.target.value });
    else setUser({ ...user, service_pw_confirm: e.target.value });
    console.log(user);
  };

  const signup = () => {
    axios
      .post("")
      .then((response) => {
        // 회원가입 후 처리
        // 이미 회원가입, 패스워드 유효성(정규 표현식으로 확인), 아무튼 오류
        // 로그인 페이지로 redirect
      })
      .catch();
  };

  return (
    <>
      <Navbar></Navbar>
      <div>
        <div className="signup-container">
          <span className="signup-title">가입하기</span>
          <div className="signup-form">
            <div>
              <label htmlFor="user_service_id">ID</label>
              <input
                id="user_service_id"
                type="text"
                value={user.service_id}
                onChange={onChange}
              />
              <span>아이디가 중복됩니다</span>
              <button>아이디 중복 확인</button>
            </div>
            <div>
              <label htmlFor="user_name">NAME</label>
              <input
                id="user_name"
                type="text"
                value={user.name}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="user_service_pw">PASSWORD</label>
              <input
                id="user_service_pw"
                type="password"
                value={user.service_pw}
                onChange={onChange}
              />
              <span>비밀번호가 유효하지 않습니다</span>
            </div>
            <div>
              <label htmlFor="user_service_pw_confirm">PASSWORD_CONFIRM</label>
              <input
                id="user_service_pw_confirm"
                type="password"
                value={user.service_pw_confirm}
                onChange={onChange}
              />
              <span>비밀번호가 일치하지 않습니다</span>
            </div>
          </div>
          <button onClick={signup}>가입하기</button>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
