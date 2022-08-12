import React, {useEffect, useState} from "react";
import Sidebar from "../components/Profile/Sidebar";
import Navbar from "../components/Navbar";
import ProfileUser from "../components/Profile/ProfileUser";
import ProfileUserUpdate from "../components/Profile/ProfileUserUpdate";
import ProfileMyParty from "../components/Profile/ProfileMyParty";
import ProfileCurParty from "../components/Profile/ProfileCurParty";
import ProfilePastParty from "../components/Profile/ProfilePastParty";
import ProfileMyReview from "../components/Profile/ProfileMyReview";
import ProfileMyWalk from "../components/Profile/ProfileMyWalk";
import NotFound from "../pages/NotFound"

import { useRecoilState } from "recoil";
import { auth } from "../recoil/Auth.js";

import { Route, Routes, useLocation, useParams, useNavigate } from "react-router-dom";
import { getUserFollowing, getUserFollowwers, getUserInfo } from "../api/User";


const Profile = (props) => {
  const [userProfile, setUserProfile] = useState({
    userId: '',
    userPoint: '',
    userServiceId: "",
    userTags: [],
    userName:''
  });
  const params = useParams()
  const location = useLocation()
  const accessId = params.user_id
  const [subPage, setSubPage] = useState('')
  const [profileName,setProfileName] = useState("")
  const [followingList, setFollowingList] = useState([])
  const [followerList, setFollowerList] = useState([])
  const [isMyPage, setIsMyPage] = useState(false)
  const [isFollowing, setIsFollowing] = useState(null)
  const [tier, setTier] = useState('')

  const navigate = useNavigate();
  const [userAuth, ] = useRecoilState(auth);
  const userId = userAuth.userId
  const isLoggedIn = userAuth.isLoggedIn
  const path = location.pathname
  const midLocation = path.slice(1,7)

  const tierNum = [34.5, 35.5, 37.5, 38.5];
  const tiers = ["Bronze", "Silver", "Gold", "Platinum", "Ruby"];

  const getTier = (userPoint) => {
    for (let i = 0; i < tierNum.length; i++) {
      if (userPoint < tierNum[i]) {
        return tiers[i];
      }
    }
    return tiers[4];
  };
  useEffect(
    ()=>{
      // 마이페이지인가 일반 프로필페이지인가
      if(midLocation==='mypage'){
        // 로그인 확인
        if(!isLoggedIn){
          navigate("/login")
        } else{
          // 로그인 정보가 현재 접근과 다를 때
          if(accessId !== userId){
            alert('잘못된 접근입니다.')
            
            navigate("/")
          } else {
            setIsMyPage(true)
          }
        }
      } else {
        if(accessId === userId){
          navigate(`/mypage/${userId}`)
        }
      }
    
    getUserInfo(accessId)
    .then((res) => {
        setUserProfile(res.data.user)
        setProfileName(accessId)
        const userPoint = res.data.user.userPoint
        setTier(getTier(userPoint))
      }) 
    .catch((err)=>{
        if(err.response.status===(403 || 400)){

          alert('존재하지 않는 사용자입니다.')
          navigate('/')
        }
      })
    
    getUserFollowing(accessId)
    .then((res)=>{
      
      setFollowingList(res.data.followings)
    }).catch((err)=>{console.log(err)})

    getUserFollowwers(accessId)
    .then((res)=>{
      setFollowerList(res.data.followers)
      setIsFollowing(res.data.followers.includes(userId))
    }).catch((err)=>{console.log(err)})
    }
    ,[isFollowing, accessId, midLocation, isLoggedIn, userId, navigate, ] 
  )


  return (
    <>
      <Navbar/>
      <div className='w-per75 m-auto flex'>
        <Sidebar setSubPage={setSubPage}isMyPage={isMyPage} userProfile={userProfile} followerList={followerList} followingList={followingList} tier={tier}></Sidebar>
        <div className='bg-centerDiv-blue w-full'>
          <Routes>
            <Route exact="true" path="" element={<ProfileUser isFollowing={isFollowing} setIsFollowing={setIsFollowing} tier={tier} profileName={profileName} isMyPage={isMyPage} userProfile={userProfile} followerList={followerList} followingList={followingList}/>} />
            <Route path="userupdate" element={<ProfileUserUpdate profileName={profileName} isMyPage={isMyPage} userProfile={userProfile}/>} />
            <Route path="myparty" element={<ProfileMyParty profileName={profileName} isMyPage={isMyPage}/>} />
            <Route path="curparty" element={<ProfileCurParty profileName={profileName} isMyPage={isMyPage}/>} />
            <Route path="pastparty" element={<ProfilePastParty profileName={profileName} isMyPage={isMyPage}/>} />
            <Route path="myreview" element={<ProfileMyReview profileName={profileName} isMyPage={isMyPage}/>} />
            <Route path="mywalkthrough" element={<ProfileMyWalk profileName={profileName} isMyPage={isMyPage}/>} />
            <Route path="*" element={<NotFound/>} />

          </Routes>
        </div>
      </div>
    </>
  );
};

export default Profile;
