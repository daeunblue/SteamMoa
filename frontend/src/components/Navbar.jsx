import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import NavbarLoginOptions from "./NavbarLoginOptions";
import "../assets/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  const navigate = useNavigate();
  
  const activeClass =
    "text-white border-b-2 border-main-100 text-xs laptop:text-base tablet:text-sm mobile:text-xs font-blackSans mx-4 block min-w-10 text-center";
  const inactiveClass =
    "text-gray-300 text-xs laptop:text-base tablet:text-sm mobile:text-xs font-blackSans mx-4 block min-w-10 text-center";
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const onSearch = () => {
    if (search.startsWith("@")) {
      navigate(`/search/user/${search.slice(1, search.length)}`);
    } else {
      navigate(`/search/game/${search}`);
    }
    
  };

  return (
    <div className="nav-container w-full nav-grad">
      {/* 내부 2칸 */}
      <div className="w-per75 m-auto">
        <div className="h-9 flex justify-between items-center">
          {/* 로고 */}
          <img
            src="../../ImgAssets/TypoIconLogo.png"
            alt="Logo"
            className="w-per15 min-w-90 max-w-144"
          />
          {/* 로그인 if 걸어야함 => 변수만들어서 IF문 */}
          <div className="flex items-end h-3/5">
            <NavbarLoginOptions />
          </div>
        </div>
        <div className="h-10 flex justify-between items-center">
          <div className="flex">
            <NavLink
              exact="true"
              to="/"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              홈
            </NavLink>
            <NavLink
              to="/moazone"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              모아존
            </NavLink>
            <NavLink
              to="/gamemoa"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              게임 모아
            </NavLink>
          </div>
          <div className="h-per70 w-52">
            {/* 검색바 */}
            <div
              className="flex items-center p-1 w-full text-gray-900 bg-gray-400 rounded-lg border border-gray-500 sm:text-xs focus:ring-slate-500 focus:border-slate-500 h-full">
              <input
                type="text"
                id="small-input"
                value={search}
                placeholder="@사용자 혹은 게임을 검색하세요"
                onChange={onChangeSearch}
                onKeyPress={onKeyPress}
                className="w-full h-5/6 text-gray-900 bg-gray-400 rounded-sm border-0 focus:border-none text-xs focus:border-slate-500border-transparent focus:border-transparent focus:ring-0"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="h-5/6 hover:cursor-pointer text-white mr-1"
                onClick={onSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
