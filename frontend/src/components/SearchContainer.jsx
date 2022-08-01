import React from "react";
import SelectInput from "./SelectInput";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import FilterCaterories from "./Filter/FilterCaterories";
import FilterBadge from "./Filter/FilterBadge";
import axios from "axios";

const SearchContainer = (props) => {
  const { filter, search, setFilter, setSort, setSearch, setGameList, page } =
    props;
  const { filters, sorts } = props.categories;

  const bgColor = [
    "",
    "bg-moa-pink",
    "bg-moa-yellow",
    "bg-moa-green",
    "bg-moa-purple",
  ];

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const onChangeSort = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };

  const handleArcodion = () => {};

  const handleApplyFilter = () => {
    let url = `http://i7a303.p.ssafy.io:8080/api/games/search?`;
    if (search) {
      url += `name=${search}`;
    }
    url += `&page=${page}`;
    filter.forEach((filterItem) => {
      url += `&tag=${filterItem.name}`;
    });
    axios
      .get(url)
      .then(({ data }) => {
        setGameList(data);
      })
      .catch();
  };

  const handleResetFilter = () => {
    setFilter([]);
  };

  const deleteHandler = (category_id, filterItem_id) => {
    const list = filter.filter((filterItem) => {
      return filterItem.category !== category_id ||
        filterItem.item !== filterItem_id
        ? true
        : false;
    });
    setFilter(list);
  };

  const setBgColor = (id) => bgColor[id];

  return (
    <div
      id="accordion"
      className="w-per75 mx-auto mb-5 bg-gradient-to-b from-bg-search-gradient-from via-bg-search-gradient-via to-bg-search-gradient-to"
    >
      {/* header : 검색바, 정렬 Select, 펼침버튼 */}
      <div className="w-full grid grid-cols-2 grid-rows-1 p-5">
        {/* 검색바, 정렬 */}
        <div className="grid grid-cols-5 gap-2">
          {/* 검색바 */}
          <SearchBar search={search} onChangeSearch={onChangeSearch} />
          {/* 정렬 */}
          <SelectInput options={sorts} handleSelectChange={onChangeSort} />
        </div>
        {/* 아코디언 버튼 */}
        <div
          className="flex flex-row-reverse items-center"
          onClick={handleArcodion}
        >
          <span className="text-main-100">상세조건</span>
          <FontAwesomeIcon className="text-main-100 mr-2" icon={faAngleDown} />
        </div>
      </div>
      <hr className="m-auto w-per95 h-px bg-main-100" />
      {/* body : 필터링 항목 */}
      <div className="w-full pt-5 pb-3">
        {filters.map((category) => (
          <FilterCaterories
            key={category.id}
            category={category}
            filter={filter}
            setFilter={setFilter}
          />
        ))}
      </div>
      <hr className="m-auto w-per95 h-px bg-main-200" />
      {/* footer : 태그, 필터링 초기화 */}
      <div className="w-full grid grid-cols-12 py-2 px-5 ">
        <div className="col-span-11 grid grid-cols-10">
          {filter.map((filterItem, index) => (
            <FilterBadge
              key={index}
              category_id={filterItem.category}
              filterItem_id={filterItem.item}
              name={filterItem.name}
              color={setBgColor(filterItem.category)}
              deleteHandler={deleteHandler}
            />
          ))}
        </div>
        <div className="flex flex-col">
          <button
            onClick={handleApplyFilter}
            className="text-white text-xs bg-mainBtn-blue hover:bg-mainBtn-blue-hover my-1 py-1 rounded-lg"
          >
            적용
          </button>
          <button
            onClick={handleResetFilter}
            className="text-white text-xs bg-mainBtn-blue hover:bg-mainBtn-blue-hover my-1 py-1 rounded-lg"
          >
            <FontAwesomeIcon className="mr-2" icon={faRotateRight} />
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
