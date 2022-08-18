import React from "react";

const Search = (props) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-full h-per20 flex justify-center items-center">
        <div className="m-auto text-4xl text-white">
          스팀모아의 <strong className="text-moa-purple">모든 것</strong>을 모아보세요!
        </div>
      </div>

      <div className="w-per80 h-per80 grid grid-cols-2 gap-5">
        <div className="flex flex-col justify-start w-full  bg-white rounded-xl p-5">
          <span className="self-start font-blackSans text-2xl ">
            <span className="text-moa-yellow-dark text-3xl">파티</span>
            {", "}
            <span className="text-moa-pink text-3xl">게임</span>
            {" 그리고 "}
            <span className="text-moa-green text-3xl">공략</span>
          </span>
          <span>게임 이름을 검색하여 관련된 모든 정보를 모아보세요.</span>
        </div>
        <div className="flex flex-col justify-start w-full h-full bg-white rounded-xl p-5">
          <span className="self-start font-blackSans text-3xl text-moa-purple">사용자</span>
          <span>'@' 키워드를 입력하면 사용자를 검색할 수 있어요.</span>
          <span>함께 게임하고 싶은 사용자를 찾아보세요!</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
