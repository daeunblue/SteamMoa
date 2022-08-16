import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/error404neon.css";

const NotFound = (props) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  return (
    <div className="w-full h-screen bg-black bg-opacity-40">
      <div className="py-[15%] my-auto flex flex-col justify-center items-center">
        <div className="font-blackSans text-white tablet:text-[7em] mobile:text-8xl ">404</div>
        <div className="text-white font-blackSans tablet:text-[2.4em] mobile:text-3xl mt-3 mb-5">
          해당 페이지를 찾을 수 없습니다.
        </div>
        <h1
          contenteditable
          spellcheck="false"
          className="text-[2.3em] mt-10 font-semibold hover:cursor-pointer"
          onClick={onClick}>
          STEAM MOA로 돌아가기
        </h1>
      </div>
    </div>
  );
};

export default NotFound;
