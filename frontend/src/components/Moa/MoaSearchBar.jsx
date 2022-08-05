import React, { useCallback, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getMoaListSearch } from "../../api/Moazone";
import { useRecoilState, useSetRecoilState } from "recoil";
import { moaSearchWord, moaPage, moaMaxPage, moaSearchFilter, moaSearchSort } from "../../recoil/Moazone";
import { debounce } from "lodash";

const SearchBar = (props) => {
  const { setMoaList, setFilter } = props;
  const [word, setWord] = useState("");

  const [page, setPage] = useRecoilState(moaPage);
  const setMaxPage = useSetRecoilState(moaMaxPage);
  const setSearchFilter = useSetRecoilState(moaSearchFilter);
  const setSearchSort = useSetRecoilState(moaSearchSort);
  const setSearchWord = useSetRecoilState(moaSearchWord);
  

  const onChange = (e) => {
    e.preventDefault();
    setWord(e.target.value);
    debounceSearch(e.target.value);
  };

  const debounceSearch = useCallback(
    debounce((_word) => {
      setFilter([]);
      setSearchFilter([]);
      setSearchSort(0);
      getMoaListSearch(page, _word, 0, [])
        .then(({ data }) => {
          setMoaList([...data.data]);
          setMaxPage(parseInt(data.maxPage));
          setPage(1);
          setSearchWord(_word);
        })
        .catch();
    }, 750),
    []
  );

  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, []);

  return (
    <div id="search-bar" className="col-span-3 flex felx-row bg-searchbar-gray rounded-lg">
      <div className="flex w-per5 inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <FontAwesomeIcon className="text-detailContent-light" icon={faSearch} />
      </div>
      <input
        type="text"
        id="search"
        className="w-per95 mx-2 text-sm text-gray-900 bg-transparent border-none focus:outline-hidden focus:border-none "
        placeholder="게임 이름으로 검색하세요"
        value={word}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
