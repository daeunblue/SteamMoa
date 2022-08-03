import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import FilterCaterories from "./Filter/FilterCaterories";
import FilterBadge from "./Filter/FilterBadge";
import { useRecoilState } from "recoil";
import { gamePage, searchWord, searchFilter } from "../recoil/Game";

const SearchContainer = (props) => {
  const { filters } = props.categories;

  const [ishidden, setIsHidden] = useState(true);

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

  const handleArcodion = () => {
    setIsHidden(!ishidden);
  };

  const handleResetFilter = () => {
    setFilter([]);
  };

  const deleteHandler = (category_id, filterItem_id) => {
    setFilter(
      filter.filter((filterItem) => {
        return filterItem.category !== category_id ||
          filterItem.item !== filterItem_id
          ? true
          : false;
      })
    );
  };

  const setBgColor = (id) => bgColor[id];

  return (
    <div className="w-per75 mx-auto mb-5 bg-gradient-to-b from-bg-search-gradient-from via-bg-search-gradient-via to-bg-search-gradient-to">
      {/* header : 검색바, 정렬 Select, 펼침버튼 */}
      <div className="w-full grid grid-cols-2 grid-rows-1 p-5">
        {/* 검색바, 정렬 */}
        <div className="grid grid-cols-5 gap-2">
          {/* 검색바 */}
          <SearchBar
            search={search}
            onChangeSearch={onChangeSearch}
            handleApplyFilter={handleApplyFilter}
          />
        </div>
        {/* 아코디언 버튼 */}
        <div
          className="flex flex-row-reverse items-center"
          onClick={handleArcodion}
        >
          <span className="text-main-100">상세조건</span>
          {ishidden ? (
            <FontAwesomeIcon
              className="text-main-100 mr-2"
              icon={faAngleDown}
            />
          ) : (
            <FontAwesomeIcon className="text-main-100 mr-2" icon={faAngleUp} />
          )}
        </div>
      </div>

      <div className={`${ishidden ? "hidden" : ""}`}>
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
          <div className="col-span-10 grid grid-cols-10 items-center">
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
          <div className="col-span-2 flex flex-row justify-end items-center">
            <button
              onClick={handleApplyFilter}
              className="text-white text-xs bg-mainBtn-blue hover:bg-mainBtn-blue-hover m-1 p-2 px-6 rounded-lg"
            >
              적용
            </button>
            <button
              onClick={handleResetFilter}
              className="text-white text-xs bg-mainBtn-blue hover:bg-mainBtn-blue-hover m-1 p-2 rounded-lg"
            >
              <FontAwesomeIcon className="mr-2" icon={faRotateRight} />
              초기화
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
