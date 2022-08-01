import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import PaginationItem from "./PaginationItem";

const Pagination = (props) => {
  const { page, setPage, totalPage } = props;
  const pageCount = 10;
  console.log(page);
  const getPaginationList = (currPage, perCount) => {
    console.log(currPage);
    //그려질 리스트 정리하기 ex. 1-10
    let pageList = [];
    const tmp = Math.floor(currPage / (perCount + 1));
    const start = tmp + tmp * perCount; //1,11,21,31...
    let end = start + perCount; //10,20,30,40...
    end = end > totalPage ? totalPage : end;

    let index = 0;
    for (let i = start; i < end; i++) {
      pageList[index++] = i;
    }

    console.log(pageList);
    return pageList;
  };

  const onClickPrev = () => {
    setPage(page - 1);
  };
  const onClickNext = () => {
    setPage(page + 1);
  };

  const handlePageMove = (value) => {
    setPage(value);
  };

  return (
    <div className="flex text-white">
      <FontAwesomeIcon
        icon={faAngleLeft}
        onClick={onClickPrev}
        className="w-7 h-7 rounded-full hover:bg-main-100 hover:text-main-500"
      />
      <ul className="p-0 mx-2">
        {getPaginationList(page, pageCount).map((item) => (
          <PaginationItem
            key={item}
            value={item}
            handlePageMove={handlePageMove}
            active={page === item}
          />
        ))}
      </ul>
      <FontAwesomeIcon
        icon={faAngleRight}
        onClick={onClickNext}
        className="w-7 h-7 rounded-full hover:bg-main-100 hover:text-main-500"
      />
    </div>
  );
};

export default Pagination;
