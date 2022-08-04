import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { moaGameSearch } from '../../api/Moazone';
  
  // 모아존 글작성 게임id 검색// 요청 보내는 axios까지 여기서 처리
  // 무한 스크롤
const moaGameSearchBox = (onChange) => {


  const onChangeSearch  = (e) => {
    e.preventDefault();
    onChange();
  };

  // 버튼 누르면 게임id 검색 API 호출
  const handleApplyFilter = () => {
    moaGameSearch();
  };

  return (
    <div
      id="search-bar"
      className="col-span-3 flex felx-row bg-searchbar-gray rounded-lg"
    >
      <div className="flex w-per5 inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <FontAwesomeIcon className="text-detailContent-light" icon={faSearch} />
      </div>
      <input
        type="text"
        className="w-per80 mx-2 text-sm text-gray-900 bg-transparent border-none focus:outline-hidden focus:border-none "
        placeholder="게임을 검색하세요"
        id="gameName"
        value={moa.gameName}
        onChange={onChangeSearch}
      />
      <button
        onClick={handleApplyFilter}
        className="w-per15 px-1 py-1 my-1 mr-1 block text-sm text-white bg-mainBtn-blue hover:bg-mainBtn-blue-hover rounded-lg "
      >
        검색
      </button>
    </div>

  )
}

export default moaGameSearchBox;