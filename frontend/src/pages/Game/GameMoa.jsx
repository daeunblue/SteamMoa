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
  };
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");

  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    handleApplyFilter();
  },[page]);

  const handleApplyFilter = () => {
    let url = `http://i7a303.p.ssafy.io:8080/api/games/search?`;
    url += `page=${page}`;

    if (search) {
      url += `&name=${search}`;
    }

    if (filter) {
      filter.forEach((filterItem) => {
        url += `&tag=${filterItem.name}`;
      });
    }
    axios
      .get(url)
      .then(({ data }) => {
        let list = data.data.map((item) => ({ ...item, gameReviewScore: 5 }));
        setGameList(list);
        setTotalPage(data.maxpage);
      })
      .catch();
  };

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
        search={search}
        setFilter={setFilter}
        setSearch={setSearch}
        handleApplyFilter={handleApplyFilter}
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
