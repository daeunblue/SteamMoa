import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";

const GameList = (props) => {
  const [gameList, setGameList] = useState([
    {
      gameId: 2,
      gameName: "Hero's Journey",
      gameTags: ["Adventure", "Casual", "Free to Play", "Indie", "RPG"],
      gameImgpath:
        "https://cdn.akamai.steamstatic.com/steam/apps/2069640/header.jpg?t=1658728941",
      gameReviewScore: 5,
      gamePrice: 15500,
    },
    {
      gameId: 35,
      gameName: "记忆碎片Fragment",
      gameTags: [
        "Adventure",
        "Indie",
        "Massively Multiplayer",
        "RPG",
        "Early Access",
        "Action",
        "Adventure",
        "Casual",
        "Indie",
        "RPG",
      ],
      gameImgpath:
        "https://cdn.akamai.steamstatic.com/steam/apps/2067670/header.jpg?t=1658738761",
      gameReviewScore: 5,
      gamePrice: 1100,
    },
    {
      gameId: 47,
      gameName: "Metro Mover",
      gameTags: [
        "Action",
        "Adventure",
        "Casual",
        "Indie",
        "Early Access",
        "Casual",
        "Indie",
        "Simulation",
        "Early Access",
      ],
      gameImgpath:
        "https://cdn.akamai.steamstatic.com/steam/apps/2066540/header.jpg?t=1658408888",
      gameReviewScore: 4,
      gamePrice: 12500,
    },
    {
      gameId: 63,
      gameName: "Alone Again: The Countryside",
      gameTags: ["Action", "Strategy", "Indie", "Early Access"],
      gameImgpath:
        "https://cdn.akamai.steamstatic.com/steam/apps/2064950/header.jpg?t=1657859833",
      gameReviewScore: 3,
      gamePrice: 11500,
    },
    {
      gameId: 88,
      gameName: "The Clown's Forest",
      gameTags: [
        "Casual",
        "Free to Play",
        "Indie",
        "Action",
        "Adventure",
        "Indie",
        "RPG",
      ],
      gameImgpath:
        "https://cdn.akamai.steamstatic.com/steam/apps/2063000/header.jpg?t=1658255535",
      gameReviewScore: 2,
      gamePrice: 2200,
    },
    {
      gameId: 114,
      gameName: "发现姐姐是妹控的我今后该如何是好",
      gameTags: [
        "Action",
        "Indie",
        "Massively Multiplayer",
        "RPG",
        "Adventure",
        "Indie",
      ],
      gameImgpath:
        "https://cdn.akamai.steamstatic.com/steam/apps/2061260/header.jpg?t=1656667614",
      gameReviewScore: 1,
      gamePrice: 1100,
    },
    {
      gameId: 123,
      gameName: "Castle",
      gameTags: ["Action", "Indie", "Casual", "Indie"],
      gameImgpath:
        "https://cdn.akamai.steamstatic.com/steam/apps/2060540/header.jpg?t=1658337311",
      gameReviewScore: 1,
      gamePrice: 3300,
    },
    {
      gameId: 139,
      gameName: "Desstroke",
      gameTags: [
        "Action",
        "Free to Play",
        "Indie",
        "Massively Multiplayer",
        "Strategy",
        "Action",
        "Indie",
        "Massively Multiplayer",
      ],
      gameImgpath:
        "https://cdn.akamai.steamstatic.com/steam/apps/2057820/header.jpg?t=1658318477",
      gameReviewScore: 2,
      gamePrice: 6000,
    },
    {
      gameId: 142,
      gameName: "Worm Runner",
      gameTags: ["Casual", "Indie"],
      gameImgpath:
        "https://cdn.akamai.steamstatic.com/steam/apps/2058120/header.jpg?t=1657701620",
      gameReviewScore: 3,
      gamePrice: 1100,
    },
    {
      gameId: 175,
      gameName: "开路先锋S:Open Road First Front S",
      gameTags: [],
      gameImgpath:
        "https://cdn.akamai.steamstatic.com/steam/apps/2054670/header.jpg?t=1658006292",
      gameReviewScore: 4,
      gamePrice: 6500,
    },
    {
      gameId: 660,
      gameName: "One Last Memory - Reimagined",
      gameTags: ["Casual", "Action"],
      gameImgpath:
        "https://cdn.akamai.steamstatic.com/steam/apps/1936140/header.jpg?t=1654845337",
      gameReviewScore: 5,
      gamePrice: 10500,
    },
  ]);
  useEffect(() => {
    //게임 리스트 가져오기
  });
  return (
    <div className="w-per75 m-auto">
      <div className="grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 laptop:gap-4 tablet:gap-2 mobile:gap-2'">
        {gameList.map((game) => {
          return <GameCard key={game.gameId} game={game} />;
        })}
      </div>
      {/* 페이지네이션 */}
    </div>
  );
};

export default GameList;
