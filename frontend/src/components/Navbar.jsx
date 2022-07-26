import React from 'react';
import { Link } from 'react-router-dom';
import NavbarLoginOptions from './NavbarLoginOptions';
import '../assets/style.css'

const Navbar = (props) => { 
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
          <div>
              {/* 검색바 */}
              <input type="text" id="small-input" className="block p-1 w-full text-gray-900 bg-gray-400 rounded-lg border border-gray-500 sm:text-xs focus:ring-slate-500 focus:border-slate-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>

          </div>
        </div>
      </div>
    </div>
  )
};

export default Navbar;