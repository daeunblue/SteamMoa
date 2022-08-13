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
  console.log('현재 여기에 접속한 사용자', currentUserServiceId)

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
        padding: "0.4em",
        boxShadow: "0 0 1px, 0 0 .1rem #fff, 0 0 1rem #FA448C, 0 0 0.8rem #FA448C, 0 0 1.5rem #FA448C, inset 0 0 0.05rem #FA448C" 
    };

    const yellowNeonBox = {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        margin:"50px",
        width:"13rem",
        height:"8rem",
        border: "0.1rem solid #fff",
        borderRadius: "2rem",
        padding: "0.4em",
        boxShadow: "0 0 1px, 0 0 .1rem #fff, 0 0 1rem #FEC859, 0 0 0.8rem #FEC859, 0 0 1.5rem #FEC859, inset 0 0 0.05rem #FEC859" 
    }

    let cardColor = '';
    if (props.player.leader === true){
      cardColor = yellowNeonBox
    } else {
      cardColor = pinkNeonBox
    }

   
    // const leaderId=props.leader

    // console.log('리더 아이디',leaderId);
  return (
    <>
    <div className='w-per20 h-per15 p-auto text-black overflow-hidden' style={cardColor}>
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
        <div className="w-full flex laptop:flex-row justify-between items-center text-white mb-3 tablet:flex-col mobile:flex-col">
        <div className="flex flex-row items-center">
          <img
            src={`../../ImgAssets/Tier${getTier()}.png`}
            alt=""
            className="w-14 h-14 mr-5"
          />
          <Link
          to={`/profile/${user.userServiceId}`}
          className="font-blackSans text-black text-2xl mr-2">
            {user.userServiceId}
          </Link>
        </div>
      </div>
        {/* 유저 매너 온도 */}
        <div
            className="bg-moa-purple ml-20 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={progressStyle}
          >
            {`${user.userPoint}°C`}
          </div>

    </div>
    {/* 유저 강퇴도 가능해야 함 => x 버튼 만들어서 누르면 유저 리스트에서 삭제 */}
    </>
  )
}

export default MoaUserCard;