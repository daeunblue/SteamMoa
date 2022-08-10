import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

import { useRecoilState } from "recoil";
import { auth } from "../../recoil/Auth.js";
import { deleteUserFollow, postUserFollow } from '../../api/User.js';

const ProfileUser = (props) => {  
  const {isFollowing, setIsFollowing, profileName, isMyPage, userProfile, followerList, followingList, tier} = props
  console.log(tier)
  const midLocation = (isMyPage ? "mypage":"profile")
  const userProfileInfo = props.userProfile
  const tierMin = 33.5;
  const tierMax = 39.5;
  const progressStyle = { width: ((userProfile.userPoint - tierMin) / (tierMax - tierMin)) * 100 + "%" };

  //로그인된 사람 (프로필 주인 말고 행동하고 있는 사람)
  const [userAuth, ] = useRecoilState(auth);
  const userId = userAuth.userId
  const isLoggedIn = userAuth.isLoggedIn

  const onFollowBtnClick = () => {
    // 로그인 여부 확인
    if(!isLoggedIn) {
      alert('로그인 후 사용 가능합니다. 로그인 진행하시겠습니까?')
    } else {
      // 로그인 되어있을 경우
      // 1. 팔로우 안하고 있을 경우
      if(!isFollowing){
        postUserFollow({
          "followerUserId": userId,
          "followingUserId": profileName
        }).then((res)=>{
          console.log(res)
          setIsFollowing(true)
        }).catch((err)=>{console.log(err)})
      } else{// 2. 팔로우 하고 있을 경우
        deleteUserFollow({
          "followerUserId": userId,
          "followingUserId": profileName
        }).then((res)=>{
          console.log(res)
          setIsFollowing(false)
        }).catch((err)=>{console.log(err)})
      }
    }
  }


  return (
      <div className='h-per50 bg-[#AAB0BA] w-per75 mt-20 rounded-lg mx-auto drop-shadow-md'>
        {/* 톱니바퀴 */}
        <div className={`w-full flex justify-end ${isMyPage ? 'px-[4%] py-[3.5%]':'p-[6%]'}`}>
          {isMyPage ? <Link to={`/${midLocation}/${profileName}/userupdate`}><FontAwesomeIcon icon={faGear} className='text-white hover:cursor-pointer'/></Link>
            : ''}
        </div>
        {/* 티어 이미지, username... */}
        <div className='px-[10%] flex mb-6'>
          <img src={`../../ImgAssets/Tier${tier}.png`} alt="" className='min-w-[100px] w-per25 mr-[5%] drop-shadow'/>
          <div className='w-full flex flex-col justify-center pb-[3%]'>
            {/* 프로필 이름 */}
            <div className='flex items-center mb-1'>
              <div className='font-blackSans text-lg mr-2.5'>{profileName}</div>
              <div className='font-Sans text-xs'>[{userProfile.userName}]</div>
            </div>
            {/* 팔로우 */}
            <div className='flex justify-between'>
              <div className='flex items-center'>
                <div className='text-[13.5px] mr-3 text-gray-700 font-semibold'>{`팔로잉: ${followingList.length}`}</div>
                <div className='text-[13.5px] text-gray-700 font-semibold'>{`팔로워: ${followerList.length}`}</div>
              </div>
              {!isMyPage && !(isFollowing===null) ? 
                <button className='py-1 px-3 bg-blue-500 text-white text-sm font-semibold 
                                   rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-2'
                        onClick={onFollowBtnClick}>
                                  {(isFollowing?'Unfollow':'Follow')}</button> : ''}
            </div>
          </div>
        </div>
        {/* 매너온도,  */}
        <div className="px-[10%]">
          <div className="w-per95 mx-auto bg-gray-200 rounded-full dark:bg-gray-700 mb-6">
            <div
              className="bg-amber-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={progressStyle}>
              {`${userProfileInfo.userPoint}°C`}
            </div>
          </div>
          <div className='flex flex-wrap w-per95 mx-auto'>
            {userProfile.userTags.map((tag, idx)=>{
              return(
                <div className='rounded bg-amber-100 border border-amber-300 text-amber-900 font-semibold px-2 py-0.5 text-sm mr-1.5 my-1' key={idx}>#{tag}</div>
              )
            })}
          </div>
        </div>
      <div className='p-[6%]'></div>
      </div>
      
  )
}

export default ProfileUser