import React from "react";
import Navbar from "../../components/Navbar";
import SearchContainer from "../../components/SearchContainer";
import GameList from "../../components/Game/GameList";

const GameMoa = (props) => {
  return (
    <div className="w-full h-screen">
      <Navbar />
      {/* 배너 이미지 */}
      <div className="w-per75 m-auto">
        <img src="../ImgAssets/GameMoa_Main.gif" alt="게임모아 메인 배너" />
      </div>
      {/* 검색 컨테이너 */}
      <SearchContainer />
      {/* 게임 리스트 */}
      <GameList />
    </div>
  );
};

export default GameMoa;
