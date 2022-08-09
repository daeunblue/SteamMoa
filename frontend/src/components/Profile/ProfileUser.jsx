import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';


const ProfileUser = (props) => {  
  const profileId = props.user
  const isMypage = props.isMypage
  const midLocation = (isMypage ? "mypage":"profile")
  const tier = 'Gold'
  const userProfileInfo = props.userProfile
  const percentBarStyle = `w-[${userProfileInfo.userPoint}%]`

  return (
    <div className='flex justify-center'>
      <div className='h-80 bg-gray-400 w-per75 mt-20 rounded-lg'>
        {/* 톱니바퀴 */}
        <div className={`w-full flex justify-end ${isMypage ? 'p-[4%]':'p-[6%]'}`}>
          {isMypage ? <Link to={`/${midLocation}/${profileId}/userupdate`}><FontAwesomeIcon icon={faGear} className='text-white hover:cursor-pointer'/></Link>
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
              <div className={`${percentBarStyle} bg-gray-500 h-1.5`}></div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ProfileUser