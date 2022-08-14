import React from "react";
import GameCard from "./GameCard";

const GameList = (props) => {
  const { gameList, isLoading } = props;
  return (
    <div className="w-per90 tablet:w-per75 m-auto">
      <div className="grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 laptop:gap-4 tablet:gap-2 mobile:gap-2'">
        {isLoading ? (
          [...Array(12)].map((v,index) => (
            <div key={index} className="h-per30 flex flex-col bg-card-lightgray animate-pulse" >
              {/* 스켈레톤 */}
            </div>
          ))
        ) : gameList.length ? (
          gameList.map((game) => {
            return <GameCard key={game.gameId} game={game} />;
          })
        ) : (
          <div className="text-white text-2xl mx-auto my-16 laptop:col-span-5 tablet:col-span-3">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default GameList;
