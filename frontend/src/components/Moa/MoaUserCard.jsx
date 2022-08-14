import React, { useEffect, useState } from 'react'
import { getUserInfo } from '../../api/User';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from '../Badge';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { auth } from '../../recoil/Auth';
import Swal from 'sweetalert2';
import { moaLeave } from '../../api/Moazone';

function MoaUserCard(props) {

  const navigate = useNavigate();
  const currentUser = useRecoilState(auth);
  const currentUserServiceId = currentUser[0].userId;

  const [ player, setPlayer ] = useState(props.player);
    // leader: true
    // playerId: 5
    // playerName: "수정이름"
    // userId: "dd"
    // setPlayer({
    //   ...player, 

    // // })
    // console.log('현재 플레이어 리스트는?', player)
    // console.log('프롭받은거', props);
    // console.log('현재 접속중 아이디', currentUserServiceId)
    // console.log('지금 리더는?',partyLeader);

  // useEffect(() => {

  //   if (props.player.leader === true){
  //     setPartyLeader(props.player.userId)
  //   }

  // },[])

  const [ user, setUser ] = useState({
    userId: 0,
    userServiceId: "",
    userPoint: 0,
    userTags: [],
  });
  
  const tierMin = 33.5;
  const tierMax = 39.5;
  const tierNum = [34.5, 35.5, 37.5, 38.5];
  const tiersImg = ["Bronze", "Silver", "Gold", "Platinum", "Ruby"];
  const progressStyle = {
    width: ((user.userPoint - tierMin) / (tierMax - tierMin)) * 100 + "%",
  };

  const getTier = () => {
    for (let i = 0; i < tierNum.length; i++) {
      if (user.userPoint < tierNum[i]) {
        return tiersImg[i];
      }
    }
    return tiersImg[4];
  };


  useEffect((e) => {
    if(!props.player.userId) return;
    getUserInfo(props.player.userId)
    .then((res) => {
      setUser(res.data.user);
    })
  },[props])

  
    const pinkNeonBox = {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        margin:"50px",
        width:"13rem",
        height:"8rem",
        border: "0.1rem solid #fff",
        borderRadius: "2rem",
        padding: "0.9em",
        boxShadow: "0 0 1px, 0 0 .1rem #fff, 0 0 1rem #FA448C, 0 0 0.8rem #FA448C, 0 0 1.5rem #FA448C, inset 0 0 0.05rem #FA448C" 
    };

    const yellowNeonBox = {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        margin:"50px",
        width:"13rem",
        height:"8rem",
        border: "0.1rem solid #fff",
        borderRadius: "2rem",
        padding: "0.9em",
        boxShadow: "0 0 1px, 0 0 .1rem #fff, 0 0 1rem #FEC859, 0 0 0.8rem #FEC859, 0 0 1.5rem #FEC859, inset 0 0 0.05rem #FEC859" 
    }

    let cardColor = '';
    if (props.player.leader === true){
      cardColor = yellowNeonBox
    } else {
      cardColor = pinkNeonBox
    }

  return (
    <>
    <div className='w-per15 h-per10 p-auto text-black overflow-hidden hover:cursor-pointer hover:opacity-80' style={cardColor}>
      {/* 파티장이 접속했을 때만 x 아이콘 표시 */}
      { currentUserServiceId===props.leader  &&
        <div className="float-right mt-1 mr-3">
          {/* 파티장 아닌 멤버만 x 표기 */}
          { user.userServiceId!==props.leader  && 
          <FontAwesomeIcon onClick={()=>props.deleteUser(user.userServiceId)} className="text-black hover:cursor-pointer" icon={ faX } />
          }
        </div>
       }
        {/* 매너 온도에 따른 티어 이미지 */}
        <div className="w-full flex laptop:flex-row justify-between items-center text-white pt-3 mb-3 tablet:flex-col mobile:flex-col">
          <div className="flex flex-row items-center">
            <img
              src={`../../ImgAssets/Tier${getTier()}.png`}
              alt=""
              className="w-10 h-10 mr-5"
            />
            <Link
            to={`/profile/${user.userServiceId}`}
            className="font-blackSans text-black text-2xl mr-2">
              {user.userServiceId}
            </Link>
          </div>
      </div>
        {/* 유저 매너 온도 */}
        {/* 색깔 티어에 따라 맞춰서 */}
      <div className="bg-gray-400 text-xs font-medium text-blue-100 text-center leading-none rounded-full">
          <div
            className='bg-amber-600 text-xs font-medium text-blue-100 text-center leading-none rounded-full'
            style={progressStyle}>
            {`${user.userPoint}°C`}
          </div>
          
        </div>
    </div>
    </>
  )
}

export default MoaUserCard;

{/* <div className="w-per95 mx-auto bg-gray-200 rounded-full dark:bg-gray-700 mb-6">
            <div
              className="bg-amber-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={progressStyle}>
              {`${userProfileInfo.userPoint}°C`}
            </div>
          </div> */}