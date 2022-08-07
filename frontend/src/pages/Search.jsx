import React, { useCallback, useEffect, useState } from "react";

import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom";
import SearchUser from "../components/Search/SearchUser";
import SearchGame from "../components/Search/SearchGame";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


const Search = (props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("word");
  const [searchWord, setSearchWord] = useState(keyword);


  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      onSearch();
    }
  };

  const onSearch = () => {
    if (searchWord.startsWith("@")) {
      navigate(`/search/user?word=${encodeURIComponent(searchWord.slice(1, searchWord.length))}`);
    } else {
      navigate(`/search/game?word=${encodeURIComponent(searchWord)}`);
    }  
  };

  return (
    <div className="w-full h-full">
      <Navbar />
      {/* 검색 입력 부분 */}
      <div className="w-full h-per20 py-20 nav-grad flex flex-col justify-center items-center text-white">
        {/* 안내문구 */}
        <span className="font-blackSans text-3xl mb-5">
          <span className="text-moa-yellow">파티</span>와{" "}
          <span className="text-moa-pink">게임</span>
          {", "}
          <span className="text-moa-purple">@사용자</span>를 검색해보세요
        </span>
        {/* 검색어 입력 */}
        <div id="search-bar" className="w-per50 h-14 flex felx-row bg-searchbar-gray rounded-lg">
          <div className="flex w-per5 items-center ml-5 pointer-events-none">
            <FontAwesomeIcon className="text-detailContent-light text-2xl" icon={faSearch} />
          </div>
          <input
            type="text"
            id="search"
            value={searchWord}
            onChange={onChangeSearch}
            onKeyUp={ onKeyPress }
            className="w-per95 text-lg text-gray-800 bg-transparent border-0 focus:border-none focus:border-slate-500border-transparent focus:border-transparent focus:ring-0"
          />
        </div>
      </div>
      {/* 검색 결과 화면 */}
      <Routes>
        <Route path="user" element={<SearchUser />}></Route>
        <Route path="game" element={<SearchGame />}></Route>
      </Routes>
    </div>
  );
};

export default Search;
