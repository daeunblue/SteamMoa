import axios from "axios";
import React, { useEffect, useState } from "react";
import GameListItem from "./GameListItem";

const GameList = (props) => {
  const [gameList, setGameList] = useState([{}, {}]);
  useEffect(() => {
    //게임 리스트 가져오기
  });
  return (
    <div className="">
      <div>
        {gameList.map((game) => {
            return <GameListItem key={game.id} game={ game } />;
        })}
      </div>
      {/* 페이지네이션 */}
    </div>
  );
};

export default GameList;
