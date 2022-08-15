import React, {useEffect} from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import NavbarLoginOptions from "./NavbarLoginOptions";
import "../assets/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

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
      if (search.length-1 < 3) {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: '아이디를 3글자 이상 입력해주세요 &#128521',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        navigate(`/search/user?word=${encodeURIComponent(search)}`);
      }
    } else {
      if (search.length < 2) {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: '게임명을 2글자 이상 입력해주세요 &#128521',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        navigate(`/search/game?word=${encodeURIComponent(search)}`);
      }
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
          //  onClick={onSearch}
           />
           )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
