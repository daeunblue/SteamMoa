import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getSearchLists } from "../../api/Search";
import GameCard from "../Game/GameCard";
import MoaCard from "../MoaCard";
import TacticSearchCard from "./TacticSearchCard";

const SearchGame = (props) => {
  const [searchParams] = useSearchParams();
  const keyword = decodeURIComponent(searchParams.get("word"));

  const [gameList, setGameList] = useState([
    {
      gameId: 1495,
      gameName: "Between Two Stars",
      gameTags: ["Massively Multiplayer", "Strategy", "Early Access"],
      gameImgpath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
      gameReviewScore: 1,
      gamePrice: 6500,
    },
    {
      gameId: 1490,
      gameName: "Between Two Stars",
      gameTags: ["Massively Multiplayer", "Strategy", "Early Access"],
      gameImgpath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
      gameReviewScore: 1,
      gamePrice: 6500,
    },
    {
      gameId: 1491,
      gameName: "Between Two Stars",
      gameTags: ["Massively Multiplayer", "Strategy", "Early Access"],
      gameImgpath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
      gameReviewScore: 1,
      gamePrice: 6500,
    },
    {
      gameId: 1492,
      gameName: "Between Two Stars",
      gameTags: ["Massively Multiplayer", "Strategy", "Early Access"],
      gameImgpath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
      gameReviewScore: 1,
      gamePrice: 6500,
    },
    {
      gameId: 1493,
      gameName: "Between Two Stars",
      gameTags: ["Massively Multiplayer", "Strategy", "Early Access"],
      gameImgpath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
      gameReviewScore: 1,
      gamePrice: 6500,
    },
    {
      gameId: 1494,
      gameName: "Between Two Stars",
      gameTags: ["Massively Multiplayer", "Strategy", "Early Access"],
      gameImgpath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
      gameReviewScore: 1,
      gamePrice: 6500,
    },
    {
      gameId: 1496,
      gameName: "Between Two Stars",
      gameTags: ["Massively Multiplayer", "Strategy", "Early Access"],
      gameImgpath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
      gameReviewScore: 1,
      gamePrice: 6500,
    },
    {
      gameId: 1497,
      gameName: "Between Two Stars",
      gameTags: ["Massively Multiplayer", "Strategy", "Early Access"],
      gameImgpath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
      gameReviewScore: 1,
      gamePrice: 6500,
    },
  ]);
  const [moaList, setMoaList] = useState([
    {
      partyId: 1,
      gameId: 1,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/2069590/header.jpg?t=1658197219",
      gameName: "Radial Flow Playtest",
      partyTitle: "게임 같이 하실 분~",
      maxPlayer: 5,
      curPlayer: 2,
      startTime: "2021-11-08 11:44:30.327959",
      writeTime: "2022-08-02 23:46:27.284118",
      partyStatus: "1",
    },
    {
      partyId: 3,
      gameId: 1,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/2069590/header.jpg?t=1658197219",
      gameName: "Radial Flow Playtest",
      partyTitle: "게임 같이 하실 분~",
      maxPlayer: 5,
      curPlayer: 2,
      startTime: "2021-11-08 11:44:30.327959",
      writeTime: "2022-08-02 23:46:27.284118",
      partyStatus: "1",
    },
    {
      partyId: 2,
      gameId: 1,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/2069590/header.jpg?t=1658197219",
      gameName: "Radial Flow Playtest",
      partyTitle: "게임 같이 하실 분~",
      maxPlayer: 5,
      curPlayer: 2,
      startTime: "2021-11-08 11:44:30.327959",
      writeTime: "2022-08-02 23:46:27.284118",
      partyStatus: "1",
    },
    {
      partyId: 7,
      gameId: 1,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/2069590/header.jpg?t=1658197219",
      gameName: "Radial Flow Playtest",
      partyTitle: "게임 같이 하실 분~",
      maxPlayer: 5,
      curPlayer: 2,
      startTime: "2021-11-08 11:44:30.327959",
      writeTime: "2022-08-02 23:46:27.284118",
      partyStatus: "1",
    },
    {
      partyId: 3,
      gameId: 1,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/2069590/header.jpg?t=1658197219",
      gameName: "Radial Flow Playtest",
      partyTitle: "게임 같이 하실 분~",
      maxPlayer: 5,
      curPlayer: 2,
      startTime: "2021-11-08 11:44:30.327959",
      writeTime: "2022-08-02 23:46:27.284118",
      partyStatus: "1",
    },
    {
      partyId: 6,
      gameId: 1,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/2069590/header.jpg?t=1658197219",
      gameName: "Radial Flow Playtest",
      partyTitle: "게임 같이 하실 분~",
      maxPlayer: 5,
      curPlayer: 2,
      startTime: "2021-11-08 11:44:30.327959",
      writeTime: "2022-08-02 23:46:27.284118",
      partyStatus: "1",
    },
    {
      partyId: 4,
      gameId: 1,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/2069590/header.jpg?t=1658197219",
      gameName: "Radial Flow Playtest",
      partyTitle: "게임 같이 하실 분~",
      maxPlayer: 5,
      curPlayer: 2,
      startTime: "2021-11-08 11:44:30.327959",
      writeTime: "2022-08-02 23:46:27.284118",
      partyStatus: "1",
    },
    {
      partyId: 5,
      gameId: 1,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/2069590/header.jpg?t=1658197219",
      gameName: "Radial Flow Playtest",
      partyTitle: "게임 같이 하실 분~",
      maxPlayer: 5,
      curPlayer: 2,
      startTime: "2021-11-08 11:44:30.327959",
      writeTime: "2022-08-02 23:46:27.284118",
      partyStatus: "1",
    },
  ]);
  const [tacticList, setTacticList] = useState([
    {
      tacticId: 1,
      tacticTitle: "A게임에 대한 공략",
      tacticContent: "공략글 내용입니다람쥐다람쥐공략글 내용입니다람쥐다람쥐공략글 내용입니다람쥐다람쥐공략글 내용입니다람쥐다람쥐공략글 내용입니다람쥐다람쥐공략글 내용입니다람쥐다람쥐공략글 내용입니다람쥐다람쥐",
      userId: 1,
      gameId: 234,
      userServiceId: "namm",
      gameName: "Between Two Stars Between Two Stars",
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
    },
    {
      tacticId: 2,
      tacticTitle: "A게임에 대한 공략",
      tacticContent: "공략글 내용입니다람쥐다람쥐",
      userId: 1,
      gameId: 234,
      userServiceId: "user_id",
      gameName: "Between Between Two Stars Between Two Stars Stars",
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
    },
    {
      tacticId: 3,
      tacticTitle: "A게임에 대한 공략",
      tacticContent: "공략글 내용입니다람쥐다람쥐",
      userId: 1,
      gameId: 234,
      userServiceId: "user_id",
      gameName: "Between Two Stars",
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
    },
    {
      tacticId: 4,
      tacticTitle: "A게임에 대한 공략",
      tacticContent: "공략글 내용입니다람쥐다람쥐",
      userId: 1,
      gameId: 234,
      userServiceId: "namm",
      gameName: "Between Two Stars",
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
    },
    {
      tacticId: 5,
      tacticTitle: "A게임에 대한 공략",
      tacticContent: "공략글 내용입니다람쥐다람쥐",
      userId: 1,
      gameId: 234,
      userServiceId: "user_id",
      gameName: "Between Two Stars",
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
    },
    {
      tacticId: 6,
      tacticTitle: "A게임에 대한 공략",
      tacticContent: "공략글 내용입니다람쥐다람쥐",
      userId: 1,
      gameId: 234,
      userServiceId: "user_id",
      gameName: "Between Two Stars",
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
    },
    {
      tacticId: 7,
      tacticTitle: "A게임에 대한 공략",
      tacticContent: "공략글 내용입니다람쥐다람쥐",
      userId: 1,
      gameId: 234,
      userServiceId: "namm",
      gameName: "Between Two Stars",
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
    },
    {
      tacticId: 8,
      tacticTitle: "A게임에 대한 공략",
      tacticContent: "공략글 내용입니다람쥐다람쥐",
      userId: 1,
      gameId: 234,
      userServiceId: "user_id",
      gameName: "Between Two Stars",
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1928190/header.jpg?t=1650456298",
    },
  ]);

  //   useEffect(() => {
  //     getSearchLists("content", keyword)
  //       .then(({ data }) => {
  //         setMoaList([...data.parties]);
  //         setGameList([...data.games]);
  //         setTacticList([...data.tactics]);
  //       })
  //       .catch();
  //   },[]);

  return (
    <div className="w-per75 mx-auto">
      {/* 파티모아 */}
      <div className="w-full pt-7">
        <div className="w-full flex flex-row justify-between items-end text-white mb-2">
          <span className="font-blackSans text-3xl text-moa-yellow">파티모아</span>
          <Link to={`/moazone?page=${encodeURIComponent("1")}&word=${encodeURIComponent(keyword)}`}>
            더보기
          </Link>
        </div>
        <div className="w-full grid grid-cols-4 gap-2">
          {moaList.map((party) => (
            <MoaCard key={party.partyId} party={party} />
          ))}
        </div>
      </div>

      {/* 게임모아 */}
      <div className="w-full py-7">
        <div className="w-full flex flex-row justify-between items-end text-white mb-2">
          <span className="font-blackSans text-3xl text-moa-pink">게임모아</span>
          <Link to={`/gamemoa?page=${encodeURIComponent("1")}&word=${encodeURIComponent(keyword)}`}>
            더보기
          </Link>
        </div>
        <div className="w-full grid grid-cols-4 gap-2">
          {gameList.map((game) => (
            <GameCard key={game.gameId} game={game} />
          ))}
        </div>
      </div>

      {/* 공략모아 */}
      <div className="w-full py-7">
        <div className="w-full flex flex-row justify-between items-end text-white mb-2">
          <span className="font-blackSans text-3xl text-moa-green">공략모아</span>
        </div>
        <div className="w-full grid grid-cols-4 gap-2">
          {tacticList.map((tactic) => (
            <TacticSearchCard key={tactic.tacticId} tactic={tactic} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchGame;
