import React from "react";
import GameCard from "./GameCard";

const GameList = (props) => {
  const { gameList } = props;
  return (
    <div className="w-per75 m-auto">
      <div className="grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 laptop:gap-4 tablet:gap-2 mobile:gap-2'">
        {gameList.map((game) => {
          return <GameCard key={game.gameId} game={game} />;
        })}
      </div>
    </div>
  );
};

export default GameList;
