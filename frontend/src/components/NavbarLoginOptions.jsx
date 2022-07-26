import React from 'react'
import { Link } from 'react-router-dom'

const NavbarLoginOptions = (props) => {
  const isLoggedin = true
  if (!isLoggedin)
    return (
      <>
        <Link to="/" className="text-white text-xs font-sans mr-3 font-bold">회원가입</Link>
        <Link to="/login" className="text-white text-xs font-sans ml-3 font-bold">로그인</Link>
      </>
    )
  else
    return (
      <>
        <Link to="/" className="text-white text-xs font-sans mr-2 font-bold">파티 만들기</Link>
        {/*  */}
        <Link to="/" className="text-white w-4 mx-2"><img src="../ImgAssets/NavBar-alarm.png" alt="" /></Link> 
        <Link to="/" className="text-white w-4 ml-2 mr-1"><img src="../ImgAssets/NavBar-user.png" alt="" /></Link>
      </>
    )
}

export default NavbarLoginOptions