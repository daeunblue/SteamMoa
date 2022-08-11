import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useRecoilState } from "recoil";
import { auth } from "../recoil/Auth";

import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";


const NavbarLoginOptions = (props) => {

  const [userAuth, setAuth] = useRecoilState(auth);
  const navigate = useNavigate();

  useEffect(
   ()=>{
   } ,
   [userAuth.isLoggedIn]
  )
  const onLogOut = () => {
    setAuth({
      isLoggedIn:false, //인증상태
      token:null, //access token
      userId: null,
    });
    sessionStorage.removeItem('token')
    navigate('/')
    console.log('logout')
  }

  if (!userAuth.isLoggedIn)
    return (
      <>
        <Link to="/signup" className="text-white text-xs font-sans mr-3 font-bold">
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
        <Link to="/moazone/create" className="text-white text-xs font-sans mr-2 font-bold">
          파티 만들기
        </Link>
        <div className="text-white text-xs font-sans mx-2 font-bold hover:cursor-pointer" onClick={onLogOut}>
          로그아웃
        </div>
        {/* 알림 */}
        <Link to="/" className="text-white w-4 h-5 mx-2"><FontAwesomeIcon icon={faBell} /></Link> 
        {/* 마이페이지 */}
        <Link to={`/mypage/${userAuth.userId}`} className="text-white w-4 h-5 ml-2 mr-1"><FontAwesomeIcon icon={faUser} /></Link>
      </>
    );
};

export default NavbarLoginOptions;