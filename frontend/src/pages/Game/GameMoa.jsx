import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import SearchContainer from "../../components/SearchContainer";
import GameList from "../../components/Game/GameList";
import Pagination from "../../components/Pagination";
import axios from "axios";

const GameMoa = (props) => {
  const categories = {
    filters: [
      {
        id: 1,
        name: "장르",
        items: [
          {
            id: 1,
            name: "Action",
          },
          {
            id: 2,
            name: "Indie",
          },
          {
            id: 3,
            name: "Casual",
          },
        ],
      },
      {
        id: 3,
        name: "가격대",
        items: [
          {
            id: 1,
            name: "무료",
          },
          {
            id: 2,
            name: "유료",
          },
        ],
      },
    ],
    sorts: [
      {
        id: 1,
        name: "이름 오름차순",
      },
      {
        id: 2,
        name: "이름 내림차순",
      },
    ],
  };
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(25);
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState(0);
  const [search, setSearch] = useState("");

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
      gameReviewScore: 3,
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
      gameReviewScore: 2,
      gamePrice: 12500,
    },
    {
      gameId: 63,
      gameName: "Alone Again: The Countryside",
      gameTags: ["Action", "Strategy", "Indie", "Early Access"],
      gameImgpath:
        "https://cdn.akamai.steamstatic.com/steam/apps/2064950/header.jpg?t=1657859833",
      gameReviewScore: 1,
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
      gameReviewScore: 5,
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
      gameReviewScore: 4,
      gamePrice: 1100,
    },
    {
      gameId: 123,
      gameName: "Castle",
      gameTags: ["Action", "Indie", "Casual", "Indie"],
      gameImgpath:
        "https://cdn.akamai.steamstatic.com/steam/apps/2060540/header.jpg?t=1658337311",
      gameReviewScore: 3,
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
      gameTags: ["Casual", "Casual", "Indie"],
      gameImgpath:
        "https://cdn.akamai.steamstatic.com/steam/apps/2058120/header.jpg?t=1657701620",
      gameReviewScore: 1,
      gamePrice: 1100,
    },
    {
      gameId: 175,
      gameName: "开路先锋S:Open Road First Front S",
      gameTags: [
        "Action",
        "Massively Multiplayer",
        "Simulation",
        "Strategy",
        "Early Access",
        "Action",
        "Adventure",
        "Indie",
        "RPG",
        "Strategy",
      ],
      gameImgpath:
        "https://cdn.akamai.steamstatic.com/steam/apps/2054670/header.jpg?t=1658006292",
      gameReviewScore: 5,
      gamePrice: 6500,
    },
  ]);
  // useEffect(() => {
  //   axios
  //     .get(`http://i7a303.p.ssafy.io:8080/api/games?page=${page}`)
  //     .then(({ data, totalPage }) => {
  //       setGameList(data);
  //        setTotalPage(totalPage);
  //     })
  //     .catch();
  // });
  return (
    <div className="w-full h-screen">
      <Navbar />
      {/* 게임모아 배너 이미지 */}
      <div className="w-per75 m-auto">
        <img src="../ImgAssets/GameMoa_Main.gif" alt="게임모아 메인 배너" />
      </div>
      {/* 검색 컨테이너 */}
      <SearchContainer
        categories={categories}
        filter={filter}
        sort={sort}
        search={search}
        setFilter={setFilter}
        setSort={setSort}
        setSearch={setSearch}
        setGameList={setGameList}
        page={page}
      />
      {/* 게임 리스트 */}
      <GameList gameList={gameList} />
      {/* 페이지네이션 */}
      <div className="w-per75 m-auto flex justify-center py-5">
        <Pagination page={page} setPage={setPage} totalPage={totalPage} />
      </div>
    </div>
  );
};

export default GameMoa;
