import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import GameSearchContainer from "../../components/Game/GameSearchContainer";
import GameList from "../../components/Game/GameList";
import GamePagination from "../../components/Game/GamePagination"
import { getGamesSearch } from "../../api/Game";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { gamePage, gameMaxPage, gameSearchFilter, gameSearchWord } from "../../recoil/Game";

const GameMoa = (props) => {
  const [gameList, setGameList] = useState([]);
  const page = useRecoilValue(gamePage);
  const searchFilter = useRecoilValue(gameSearchFilter);
  const searchWord = useRecoilValue(gameSearchWord);
  const setMaxPage = useSetRecoilState(gameMaxPage);

  useEffect(() => {
    getGamesSearch(page, searchFilter, searchWord)
      .then(({ data }) => {
        setGameList(data.data.map((item) => ({ ...item, gameReviewScore: 5 })));
        setMaxPage(parseInt(data.maxPage));
        console.log('handlePage');
      })
      .catch();
  }, [page]);

  return (
    <div className="w-full h-screen">
      <Navbar />
      {/* 게임모아 배너 이미지 */}
      <div className="w-per75 m-auto">
        <img src="../ImgAssets/GameMoa_Main.gif" alt="게임모아 메인 배너" />
      </div>
      {/* 검색 컨테이너 */}
      <GameSearchContainer setGameList={setGameList} />
      {/* 게임 리스트 */}
      <GameList gameList={gameList} />
      {/* 페이지네이션 */}
      <div className="w-per75 m-auto flex justify-center py-5">
        <GamePagination setGameList={setGameList} />
      </div>
    </div>
  );
};

export default GameMoa;
