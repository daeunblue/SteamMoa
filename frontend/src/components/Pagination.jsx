import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PaginationItem from "./PaginationItem";

const Pagination = (props) => {
  const { page, setPage, totalPage } = props;
  const PAGE_COUNT = 10;

  const getPaginationList = (currPage, perCount) => {
    //그려질 리스트 정리하기 ex. 1-10
    let pageList = [];

    const tmp = Math.floor((currPage - 1) / perCount);
    const start = 1 + tmp * perCount; //1,11,21,31...
    let end = start + perCount; //10,20,30,40...

    end = end > totalPage ? totalPage + 1 : end;

    let index = 0;
    for (let i = start; i < end; i++) {
      pageList[index++] = i;
    }

    return pageList;
  };

  const onClickPrev = () => {
    let newPage = page - 1 > 1 ? page - 1 : 1;
    setPage(newPage);
  };
  const onClickNext = () => {
    let newPage = page + 1 <= totalPage ? page + 1 : totalPage;
    setPage(newPage);
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
        {getPaginationList(page, PAGE_COUNT).map((item) => (
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
