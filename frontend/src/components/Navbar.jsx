import React, {useEffect} from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import NavbarLoginOptions from "./NavbarLoginOptions";
import "../assets/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640 ? true:false)

  
  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }
  useEffect(()=>{
    window.addEventListener("resize", handleResize)
  }, 
  [isMobile]
  )

  const activeClass =
    "text-white border-b-2 border-main-100 text-xs laptop:text-base tablet:text-sm mobile:text-sm font-blackSans mx-4 block min-w-10 text-center";
  const inactiveClass =
    "text-gray-300 text-xs laptop:text-base tablet:text-sm mobile:text-sm font-blackSans mx-4 block min-w-10 text-center";
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
      setSearch("");
    }
  };

  const onSearch = () => {
    if (search.startsWith("@")) {
      navigate(`/search/user?word=${encodeURIComponent(search)}`);
    } else {
      navigate(`/search/game?word=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="nav-container w-full nav-grad">
      {/* 내부 2칸 */}
      <div className="w-per90 tablet:w-per75 m-auto">
        <div className="h-9 flex justify-between items-center">
          {/* 로고 */}
          <Link to="/" className="w-per15 min-w-90 max-w-144">
            <img
              src="../../ImgAssets/TypoIconLogo.png"
              alt="Logo"
              className="w-full mt-1.5"
            />
          </Link>
          <div className="flex items-end h-3/5">
            <NavbarLoginOptions />
          </div>
        </div>
        <div className="h-10 flex justify-between items-center">
          <div className="flex">
            <NavLink
              exact="true"
              to="/"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              홈
            </NavLink>
            <NavLink
              to="/moazone"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              모아존
            </NavLink>
            <NavLink
              to="/gamemoa"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              게임 모아
            </NavLink>
          </div>
          {(!isMobile ? 
              <div className="h-per70 w-per35 max-w-[250px]">
              {/* 검색바 */}
              <div className="flex items-center p-1 w-full text-gray-900 bg-gray-400 rounded-lg border border-gray-500 sm:text-xs focus:ring-slate-500 focus:border-slate-500 h-full">
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
           :
           <FontAwesomeIcon
           icon={faMagnifyingGlass}
           className="h-per35 hover:cursor-pointer text-white mr-2"
          //  onClick={onShowSearchModal}
           />
           )}

        </div>
      </div>

            {/*follower modal */}
        <div id="follower-modal" className={`${(true ? "bg-black bg-opacity-40":"hidden")} overflow-y-hidden overflow-x-hidden fixed top-[76px] right-0 left-0 z-50 w-full h-modal`}>
        <div className="relative w-full h-full md:h-auto mx-auto">
          {/* <!-- Modal content --> */}
          <div className="relative top-0 right-0 left-0 bg-white shadow w-full">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center p-5 rounded-t">
                <h3 className="text-base font-medium text-gray-800">
                    <span className='text-xl font-semibold'>[]</span> 님의 Followers
                </h3>
                <button onClick="" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
