import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NavbarLoginOptions from './NavbarLoginOptions';
import '../assets/style.css'

const Navbar = (props) => {
  const navigate = useNavigate();
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
    // navigate(`/search/${search}`)
  }
  return (
    <div className="nav-container w-full nav-grad">
      {/* 내부 2칸 */}
      <div className="w-4/5 m-auto">
        <div className="h-9 flex justify-between items-center">
            {/* 로고 */}
          <img src="../ImgAssets/TypoIconLogo.png" alt="Logo" className="w-1/12"/>
          {/* 로그인 if 걸어야함 => 변수만들어서 IF문 */}
          <div className="flex items-end h-3/5">
            <NavbarLoginOptions/>
          </div>
        </div>
        <div className="h-10 flex justify-between items-center">
          <div>
            <Link to="/" className="text-white text-base font-blackSans mx-4">홈</Link>
            <Link to="/" className="text-white text-base font-blackSans mx-4">모아존</Link>
            <Link to="/" className="text-white text-base font-blackSans mx-4">게임 모아</Link>
          </div>
          <div className='h-4/5'>
              {/* 검색바 */}
              <div className="flex items-center block p-1 w-full text-gray-900 bg-gray-400 rounded-lg border border-gray-500 sm:text-xs focus:ring-slate-500 focus:border-slate-500 h-full">
              <input type="text" id="small-input" value={search} placeholder="검색어를 입력하세요"
              onChange={onChangeSearch} onKeyPress={onKeyPress} 
              className="w-full h-5/6 text-gray-900 bg-gray-400 rounded-sm border-0 text-xs focus:ring-slate-500 focus:border-slate-500 mr-2"/>
              <img src="../ImgAssets/NavBar-Magni.png" alt="" className='h-5/6 hover:cursor-pointer' onClick={onSearch}/>
              </div>

          </div>
        </div>
      </div>
    </div>
  )
};

export default Navbar;