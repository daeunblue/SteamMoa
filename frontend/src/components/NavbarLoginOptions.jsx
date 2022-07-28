import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";


const NavbarLoginOptions = (props) => {
  const isLoggedin = true
  if (!isLoggedin)
    return (
      <>
        <Link to="/" className="text-white text-xs font-sans mr-3 font-bold">
          회원가입
        </Link>
        <Link
          to="/login"
          className="text-white text-xs font-sans ml-3 font-bold"
        >
          로그인
        </Link>
      </>
    );
  else
    return (
      <>
        <Link to="/" className="text-white text-xs font-sans mr-2 font-bold">
          파티 만들기
        </Link>
        <Link to="/" className="text-white text-xs font-sans mx-2 font-bold">
          로그아웃
        </Link>
        {/* 알림 */}
        <Link to="/" className="text-white w-4 h-5 mx-2"><FontAwesomeIcon icon={faBell} /></Link> 
        {/* 마이페이지 */}
        <Link to="/" className="text-white w-4 h-5 ml-2 mr-1"><FontAwesomeIcon icon={faUser} /></Link>
      </>
    );
};

export default NavbarLoginOptions;