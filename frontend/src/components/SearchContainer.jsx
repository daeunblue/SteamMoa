import React from 'react'
import { useState } from 'react';

const SearchContainer = () => {
  const [search, setSearch ] = useState("");
  const onChangeSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter'){
      onSearch()
    };
  };

  const onSearch = ()=>{
    console.log(search)
    //검색 화면으로 보내기
    // 
  }
  
  return (
    <div id="accordion" className='w-per75 m-auto'>
      <div id="search-bar" className='h-4/5 flex'>
      {/* 검색바 */}
        <input type="text" value={search} placeholder="검색어를 입력하세요"
          onChange={onChangeSearch} onKeyPress={onKeyPress} 
          className="w-full text-gray-900 bg-gray-400 rounded-sm border-0 text-xs focus:ring-slate-500 focus:border-slate-500 mr-2"/>  
        <button className="bg-mainBtn-blue text-white hover:bg-mainBtn-blue-hover">검색</button>
      </div>
    </div>
  )
}

export default SearchContainer