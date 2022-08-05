import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const ProfileUser = (props) => {
  
  const profileId = props.profileId
  const isMypage = props.isMypage
  const tier = 'Gold'
  const [userProfile, setUserProfile] = useState({
    userPoint:'',
    userTier:'',
  });

  useEffect(
    () => {
      axios
       .get(`http://i7a303.p.ssafy.io:8080/api/user/profile/${profileId}`)
       .then((res) => {
         setUserProfile({
            userPoint: String(res.data.user.userPoint),
            userTier:'',
          }
         )
       }) .catch((err)=>{
         console.log(err)
       })
    }, []
  )

  return (
    <div className='flex justify-center'>
      <div className='h-80 bg-gray-400 w-per75 mt-20 rounded-lg'>
        {/* 톱니바퀴 */}
        <div className={`w-full flex justify-end ${isMypage ? 'p-[4%]':'p-[6%]'}`}>
          {isMypage ? <NavLink to={`/profile/${profileId}/userupdate`}><FontAwesomeIcon icon={faGear} className='text-white'/></NavLink>
            : ''}
        </div>
        {/* 티어 이미지, username... */}
        <div className='px-[10%] flex'>
          <img src={`../../ImgAssets/Tier${tier}.png`} alt="" className='min-w-[100px] w-per25 mr-[5%]'/>
          <div className='w-full flex flex-col justify-end pb-[4%]'>
            <div className='flex justify-between'>
              <div>
                <div className='font-blackSans text-lg'>{profileId}</div>
                <div className='font-Sans text-xs'>{profileId}</div>
              </div>
              {!isMypage ? <button className='h-per50 py-0.5 px-3 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>Follow</button> : ''}
            </div>
            <div className='w-full bg-gray-200 h-1.5 mt-3'>
              <div className={`w-[${userProfile.userPoint}%] bg-gray-500 h-1.5`}></div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ProfileUser