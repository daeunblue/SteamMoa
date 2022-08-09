import React, {useEffect, useState} from "react";
import Sidebar from "../components/Profile/Sidebar";
import Navbar from "../components/Navbar";
import ProfileUser from "../components/Profile/ProfileUser";
import ProfileUserUpdate from "../components/Profile/ProfileUserUpdate";
import ProfileCurParty from "../components/Profile/ProfileCurParty";
import ProfilePastParty from "../components/Profile/ProfilePastParty";
import ProfileMyReview from "../components/Profile/ProfileMyReview";
import ProfileMyWalk from "../components/Profile/ProfileMyWalk";

import { useRecoilState } from "recoil";

import { Route, Routes, useLocation, useParams, useNavigate } from "react-router-dom";
import { auth } from "../recoil/Auth.js";
import { getUserInfo } from "../api/User";


const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    userPoint:'',
    userTier:'',
  });
  let params = useParams()
  const location = useLocation()
  const [user, ] =useState(params.user_id)

  const navigate = useNavigate();
  const [userAuth, ] = useRecoilState(auth);
  const userId = userAuth.userId
  const isLoggedIn = userAuth.isLoggedIn
  const path = location.pathname
  let isMypage = false
  const midLocation = path.slice(1,7)
  if (midLocation==='mypage' & user === userId){
    isMypage = true
  }
  useEffect(
    ()=>{
      // 마이페이지인가 일반 프로필페이지인가
      if(midLocation==='mypage'){
        // 로그인 확인
        if(!isLoggedIn){
          navigate("/login")
        } else{
          // 로그인 정보가 현재 접근과 다를 때
          if(user !== userId){
            alert('잘못된 접근입니다.')
            navigate("/")
          }
        }
      } else {
        if(user === userId){
          navigate(`/mypage/${userId}`)
        }
      }

    getUserInfo(user)
    .then((res) => {
        setUserProfile({
           userPoint: String(res.data.user.userPoint),
           userTier:'',
         }
        )
      }) 
    .catch((err)=>{
        console.log(err)
      })
    }
    ,[user, midLocation, isLoggedIn, navigate, userId] 
  )


  return (
    <>
      <Navbar/>
      <div className='w-per75 m-auto flex'>
        <Sidebar user={user} isMypage={isMypage} userProfile={userProfile}></Sidebar>
        <div className='bg-centerDiv-blue w-full'>
          <Routes>
            <Route exact="true" path="" element={<ProfileUser user={user} isMypage={isMypage} userProfile={userProfile}/>} />
            <Route path="userupdate" element={<ProfileUserUpdate user={user} isMypage={isMypage}/>} />
            <Route path="curparty" element={<ProfileCurParty user={user} isMypage={isMypage}/>} />
            <Route path="pastparty" element={<ProfilePastParty user={user} isMypage={isMypage}/>} />
            <Route path="myreview" element={<ProfileMyReview user={user} isMypage={isMypage}/>} />
            <Route path="mywalkthrough" element={<ProfileMyWalk user={user} isMypage={isMypage}/>} />

          </Routes>
        </div>
      </div>
    </>
  );
};

export default Profile;
