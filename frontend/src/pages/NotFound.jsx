import React from "react";

const NotFound = (props) => {
  return (
    <div className="">
      <div className="py-56 my-auto flex flex-col justify-center items-center">
        <div className="font-blackSans text-white tablet:text-9xl mobile:text-8xl">404</div>
        <div className="text-white font-blackSans tablet:text-5xl mobile:text-3xl">해당 페이지를 찾을 수 없습니다.</div>
      </div>
    </div>
  );
};

export default NotFound;
