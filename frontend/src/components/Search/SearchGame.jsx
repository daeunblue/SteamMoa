import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getSearchLists } from "../../api/Search";
import GameCard from "../Game/GameCard";
import MoaCard from "../MoaCard";
import TacticSearchCard from "../TacticSearchCard";

const SearchGame = (props) => {
  const [searchParams] = useSearchParams();
  const keyword = decodeURIComponent(searchParams.get("word"));

  const [gameList, setGameList] = useState([]);
  const [moaList, setMoaList] = useState([]);
  const [tacticList, setTacticList] = useState([]);

  useEffect(() => {
    getSearchLists("content", keyword)
      .then(({ data }) => {
        const { parties, games, tactics } = data.contents;
        console.log(parties);
        console.log(games);
        console.log(tactics);
        setMoaList([...parties]);
        setGameList([...games]);
        setTacticList([...tactics]);
      })
      .catch();
  }, [keyword]);

  return (
    <div className="w-per75 mx-auto">
      {/* 파티모아 */}
      <div className="w-full pt-7">
        <div className="w-full flex flex-row justify-between items-end text-white mb-2">
          <span className="font-blackSans text-3xl text-moa-yellow">
            파티모아
          </span>
          <Link
            to={`/moazone?page=${encodeURIComponent(
              "1"
            )}&word=${encodeURIComponent(keyword)}`}
          >
            더보기
          </Link>
        </div>
        {moaList.length ? (
          <div className="w-full grid grid-cols-4 gap-2">
            {moaList.map((party) => (
              <MoaCard key={party.partyId} party={party} />
            ))}
          </div>
        ) : (
          <div className="text-white text-center text-lg p-5">
            <strong>첫 번째</strong> 파티 개설자가 될 기회입니다!
          </div>
        )}
      </div>

      {/* 게임모아 */}
      <div className="w-full pt-7">
        <div className="w-full flex flex-row justify-between items-end text-white mb-2">
          <span className="font-blackSans text-3xl text-moa-pink">
            게임모아
          </span>
          <Link
            to={`/gamemoa?page=${encodeURIComponent(
              "1"
            )}&word=${encodeURIComponent(keyword)}`}
          >
            더보기
          </Link>
        </div>
        {gameList.length ? (
          <div className="w-full grid grid-cols-4 gap-2">
            {gameList.map((game) => (
              <GameCard key={game.gameId} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-white text-center text-lg p-5">
            해당하는 게임이 없습니다.
          </div>
        )}
      </div>

      {/* 공략모아 */}
      <div className="w-full py-7">
        <div className="w-full flex flex-row justify-between items-end text-white mb-2">
          <span className="font-blackSans text-3xl text-moa-green">
            공략모아
          </span>
        </div>
        {tacticList.length ? (
          <div className="w-full grid grid-cols-4 gap-2">
            {tacticList.map((tactic) => (
              <TacticSearchCard key={tactic.tacticId} tactic={tactic} />
            ))}
          </div>
        ) : (
          <div className="text-white text-center text-lg p-5">
            <strong>첫 번째</strong> 공략러가 될 기회입니다!
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchGame;
