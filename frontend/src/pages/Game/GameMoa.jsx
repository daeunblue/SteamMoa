import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import SearchContainer from "../../components/SearchContainer";
import GameList from "../../components/Game/GameList";
import Pagination from "../../components/Pagination";
import { getGamesSearch } from "../../api/Game";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { gamePage, gameMaxPage } from "../../recoil/Game";

const GameMoa = (props) => {
  const [gameList, setGameList] = useState([]);
  const page = useRecoilValue(gamePage);
  const setMaxPage = useSetRecoilState(gameMaxPage);

  useEffect(() => {
    getGamesSearch(page, [], "")
      .then(({ data }) => {
        setGameList(data.data.map((item) => ({ ...item, gameReviewScore: 5 })));
        setMaxPage(parseInt(data.maxPage));
      })
      .catch();
  }, []);

  return (
    <div className="w-full h-screen">
      <Navbar />
      {/* 게임모아 배너 이미지 */}
      <div className="w-per75 m-auto">
        <img src="../ImgAssets/GameMoa_Main.gif" alt="게임모아 메인 배너" />
      </div>
      {/* 검색 컨테이너 */}
      <SearchContainer setGameList={setGameList} />
      {/* 게임 리스트 */}
      <GameList gameList={gameList} />
      {/* 페이지네이션 */}
      <div className="w-per75 m-auto flex justify-center py-5">
        <Pagination setGameList={setGameList} />
      </div>
    </div>
  );
};

export default GameMoa;
