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

  const [pageCount, setPageCount] = useState(0);
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState(0);
  const [search, setSearch] = useState("");

  const [gameList, setGameList] = useState([]);
  useEffect(() => {
    axios
      .get(`http://i7a303.p.ssafy.io:8080/api/games?page=${pageCount}`)
      .then(({ data }) => {
        setGameList(data);
      })
      .catch();
  });
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
        pageCount={pageCount}
      />
      {/* 게임 리스트 */}
      <GameList gameList={gameList} />
      {/* 페이지네이션 */}
      <Pagination
        filter={filter}
        sort={sort}
        search={search}
        setGameList={setGameList}
        pageCount={pageCount}
        setPageCount={setPageCount}
      />
    </div>
  );
};

export default GameMoa;
