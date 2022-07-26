import React from "react";
import GameList from "../../components/game/GameList";
import Navbar from "../../components/Navbar";
import SearchContainer from "../../components/SearchContainer";

const GameMoa = (props) => {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="w-4/5 mx-auto">
        {/* 게임모아 배너 */}
        <img className="w-full" src="./ImgAssets/GameMoa_Main.gif" alt="게임모아 배너 이미지" />

        {/* 검색 컨테이너 */}
        {/* 레이아웃 확인용으로 padding 채워둔 상태 */}
        <SearchContainer />

        {/* 게임 리스트 */}
        <GameList/>
      </div>
    </div>
  );
};

export default GameMoa;
