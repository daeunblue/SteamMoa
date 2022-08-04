import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getGamesSearch } from "../api/Game";
import { useRecoilState, useSetRecoilState } from "recoil";
import { gameSearchWord, gamePage, gameMaxPage } from "../recoil/Game";

const SearchBar = (props) => {
  const setGameList = props.setGameList;
  const [page, setPage] = useRecoilState(gamePage);
  const setMaxPage = useSetRecoilState(gameMaxPage);
  const [searchWord, setSearchWord] = useRecoilState(gameSearchWord);
  const [word, setWord] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    setWord(e.target.value);
  };

  const handleSearchWord = () => {
    setSearchWord(word);
    getGamesSearch(page, [], searchWord)
      .then(({ data }) => {
        setGameList(data.data.map((item) => ({ ...item, gameReviewScore: 5 })));
        setMaxPage(parseInt(data.maxPage));
        setPage(1);
      })
      .catch();
  };

  return (
    <div id="search-bar" className="col-span-3 flex felx-row bg-searchbar-gray rounded-lg">
      <div className="flex w-per5 inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <FontAwesomeIcon className="text-detailContent-light" icon={faSearch} />
      </div>
      <input
        type="text"
        id="search"
        className="w-per80 mx-2 text-sm text-gray-900 bg-transparent border-none focus:outline-hidden focus:border-none "
        placeholder="모아글을 검색하세요"
        value={word}
        onChange={onChange}
      />
      <button
        onClick={handleSearchWord}
        className="w-per15 px-1 py-1 my-1 mr-1 block text-sm text-white bg-mainBtn-blue hover:bg-mainBtn-blue-hover rounded-lg ">
        검색
      </button>
    </div>
  );
};

export default SearchBar;
