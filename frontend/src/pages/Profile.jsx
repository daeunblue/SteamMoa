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
  const [tierColor, setTierColor] = useState({
    tierColor:'',
    tierColorLight:'',
    tierbg:'',
    tierborder:'',
    tiertext:'',
  })

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
          navigate(`/mypage/${userId}`, {replace:true})
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
      console.log(err)
        if(err.response.status===(400)||err.response.status===(403)){

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

  useEffect(
    () => {
      const tierCol = {
        tierColor:'',
        tierColorLight:'',
        tierbg:'',
        tierborder:'',
        tierManner:'',
        tierSide:'',
        tiertext:''
      }
      if (tier === 'Bronze'){
        tierCol.tierColor = 'yellow'
        tierCol.tierColorLight= 'bg-yellow-400'
        tierCol.tierbg = 'bg-orange-100'
        tierCol.tierborder = 'border-yellow-300'
        tierCol.tierManner = 'bg-yellow-600'
        tierCol.tierSide = 'bg-yellow-500'
        tierCol.tiertext = 'text-yellow-900'
        tierCol.tiertextLight = 'text-yellow-500'
    
      } else if (tier === 'Silver') {
        tierCol.tierColor = 'zinc'
        tierCol.tierColorLight= 'bg-zinc-400'
        tierCol.tierbg = 'bg-zinc-100'
        tierCol.tierborder = 'border-zinc-300'
        tierCol.tierManner = 'bg-zinc-600'
        tierCol.tierSide = 'bg-zinc-500'
        tierCol.tiertext = 'text-zinc-900'
        tierCol.tiertextLight = 'text-zinc-500'
        
      } else if (tier === 'Gold') {
        tierCol.tierColor = 'amber'
        tierCol.tierbg = 'bg-amber-100'
        tierCol.tierColorLight= 'bg-amber-400'
        tierCol.tierborder = 'border-amber-300'
        tierCol.tierManner = 'bg-amber-600'
        tierCol.tierSide = 'bg-amber-500'
        tierCol.tiertext = 'text-amber-900'
        tierCol.tiertextLight = 'text-amber-500'
    
      } else if (tier === 'Platinum') {
        tierCol.tierColor = 'emerald'
        tierCol.tierbg = 'bg-emerald-100'
        tierCol.tierColorLight= 'bg-emerald-400'
        tierCol.tierborder = 'border-emerald-300'
        tierCol.tierManner = 'bg-emerald-600'
        tierCol.tierSide = 'bg-emerald-500'
        tierCol.tiertext = 'text-emerald-900'
        tierCol.tiertextLight = 'text-emerald-500'
    
      } else {
        tierCol.tierColor = 'fuchsia'
        tierCol.tierbg = 'bg-fuchsia-100'
        tierCol.tierColorLight= 'bg-fuchsia-400'
        tierCol.tierborder = 'border-fuchsia-300'
        tierCol.tierManner = 'bg-fuchsia-600'
        tierCol.tierSide = 'bg-fuchsia-500'
        tierCol.tiertext = 'text-fuchsia-900'
        tierCol.tiertextLight = 'text-fuchsia-500'
    
      }
      setTierColor(tierCol)
    }, [tier]
  )


  return (
    <>
      <Navbar/>
      <div className='w-per75 m-auto flex'>
        <Sidebar setSubPage={setSubPage}isMyPage={isMyPage} userProfile={userProfile} followerList={followerList} followingList={followingList} tier={tier} tierColor={tierColor}></Sidebar>
        <div className='bg-centerDiv-blue w-full'>
          <Routes>
            <Route exact="true" path="" element={<ProfileUser tierColor={tierColor} isFollowing={isFollowing} setIsFollowing={setIsFollowing} tier={tier} profileName={profileName} isMyPage={isMyPage} userProfile={userProfile} followerList={followerList} followingList={followingList}/>} />
            <Route path="userupdate" element={<ProfileUserUpdate tierColor={tierColor} profileName={profileName} isMyPage={isMyPage} userProfile={userProfile}/>} />
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
