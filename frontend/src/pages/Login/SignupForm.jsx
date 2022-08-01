import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";

const SignupForm = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  let steamId = "";
  const [user, setUser] = useState({
    service_id: "",
    name: "",
    service_pw: "",
    service_pw_confirm: "",
  });

  //오류메시지 상태저장
  const [idMessage, setIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사
  const [isCheckedId, setIsCheckedId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const onChangeId = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    if (!isCheckedId) {
      setIdMessage("* '중복 검사' 버튼을 통해 확인해주세요.");
      setIsCheckedId(false);
    }
  };

  const onChangeName = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const onChangePassword = (event) => {
    const { name, value } = event.target;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    setUser({
      ...user,
      [name]: value,
    });
    if (!passwordRegex.test(value)) {
      setPasswordMessage("* 비밀번호가 유효하지 않습니다");
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
    if (value !== user.service_pw) {
      setPasswordConfirmMessage("* 비밀번호가 일치하지 않습니다");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("");
      setIsPasswordConfirm(true);
    }
  };

  const handleIdCheck = (e) => {
    const url = `http://localhost:8080/api/auth/signup/duplicated/${user.service_id}`;
    axios
      .get(url)
      .then(({ data }) => {
        if (!(data.statusCode===200)) {
          setIdMessage("아이디가 중복되었습니다");
          setIsCheckedId(false);
        } else {
          setIdMessage("사용 가능한 아이디입니다");
          setIsCheckedId(true);
        }
      })
      .catch();
  };

  useEffect(() => {
    //return url 파싱
    const search = location.search.substring(1);

    const urlObj = JSON.parse(
      '{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
    );
    const getUserId = (response) => {
      const str = response["openid.claimed_id"];
      const res = decodeURIComponent(str);
      const propsArr = res.split("/");

      return propsArr[propsArr.length - 1];
    };

    steamId = getUserId(urlObj);
  });

  const signup = () => {
    if (!user.service_id || !user.name || !user.service_pw || !user.service_pw_confirm) {
      alert("모든 사항을 입력해주세요.");
      return;
    }
    if (!steamId) {
      alert("유효하지 않은 접근입니다.");
      navigate("/signup");
      return;
    }

    axios
      .post("http://localhost:8080/api/auth", {
        user_name: user.name,
        user_service_id: user.service_id,
        user_service_pw: user.service_pw,
        user_steam_id: steamId,
      })
      .then(({ status, message }) => {
        alert(message);
        if (status === 200) {
          navigate("/login");
        } else {
          navigate("/signup");
        }
      })
      .catch(() => {});
  };

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="bg-slate-700 w-4/5 h-screen m-auto flex flex-col align-center justify-center items-center">
        <span className="text-white font-blackSans text-4xl">회원가입</span>
        <div className="w-3/6">
          {/* ID */}
          <div className="w-full mb-2.5">
            <label htmlFor="user_service_id" className="text-white text-sm">
              아이디
            </label>
            <div className="w-full flex flex-row justify-between">
              <input
                id="user_service_id"
                type="text"
                name="service_id"
                onChange={onChangeId}
                className="w-5/6 rounded-md"
              />
              <button
                className="w-1/6 text-white text-center rounded-lg text-sm sm:w-auto bg-mainBtn-blue hover:bg-main-300 focus:ring-4 focus:outline-none px-3 py-2.5"
                onClick={handleIdCheck}>
                중복검사
              </button>
            </div>

            <span className={`font-semibold ${isCheckedId ? "text-green-500" : "text-red-500"} `}>
              {idMessage}
            </span>
          </div>
          {/* NAME */}
          <div className="w-full mb-2.5">
            <label htmlFor="user_name" className="text-white text-sm">
              닉네임
            </label>
            <input
              id="user_name"
              type="text"
              name="name"
              onChange={onChangeName}
              className="w-full rounded-md"
            />
          </div>
          {/* PASSWORD */}
          <div className="w-full mb-2.5">
            <label htmlFor="user_service_pw" className="text-white text-sm">
              비밀번호
            </label>
            <input
              id="user_service_pw"
              type="password"
              name="service_pw"
              onChange={onChangePassword}
              className="w-full rounded-md"
              placeholder="숫자, 영문 대,소문자 , 특수문자(!@#$%^+=-)를 포함한 8~25자리로 입력해주세요"
            />
            <span className="text-red-500 font-semibold">{passwordMessage}</span>
          </div>
          {/* PASSWORD CONFIRM */}
          <div className="w-full mb-2.5">
            <label htmlFor="user_service_pw_confirm" className="text-white text-sm">
              비밀번호 확인
            </label>
            <input
              id="user_service_pw_confirm"
              type="password"
              name="service_pw_confirm"
              onChange={onChangePasswordConfirm}
              className="w-full rounded-md"
              placeholder="한번 더 비밀번호를 입력해주세요"
            />
            <span className="text-red-500 font-semibold">{passwordConfirmMessage}</span>
          </div>
        </div>
        <button
          className="w-3/6 mt-3 text-white text-center font-blackSans text-3xl bg-mainBtn-blue hover:bg-main-300 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-3.5 disabled:opacity-75 disabled:bg-gray-500"
          onClick={signup}
          disabled={!(isCheckedId && isPassword && isPasswordConfirm)}>
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
