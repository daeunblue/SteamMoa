import React, { useEffect, useState } from 'react'
import { getUserInfo } from '../../api/User';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from '../Badge';
import { useNavigate } from 'react-router-dom';
import { moaUpdate } from '../../api/Moazone';
import { useRecoilState } from 'recoil';
import { auth } from '../../recoil/Auth';

function MoaUserCard(props) {

  const navigate = useNavigate();
  const currentUser = useRecoilState(auth);
  const currentUserServiceId = currentUser[0].userId;
  console.log("지금 이순간 접속하고 있는 사람의 아이디는", currentUserServiceId)

  const [ player, setPlayer ] = useState(props.player);
    // leader: true
    // playerId: 5
    // playerName: "수정이름"
    // userId: "dd"

  let leaderId = '';
  if (props.player.leader === true){
    leaderId = props.player.userId;
  }
  console.log('지금 리더는?', leaderId);
// 리더가 접속했을 때만 다른 사람들 카드에 x 보이게하기

// 리더랑 현재 접속중 유저랑 같은지 확인하기
if (currentUserServiceId === leaderId) {
  console.log('리더와 현재 접속 유저와 같습니다.')
} else {
  console.log('리더와 현재 접속중 유저와 다릅니다.')
}

  const [ user, setUser ] = useState({
    userId: 0,
    userServiceId: "",
    userPoint: 0,
    userTags: [],
  });

  console.log("현재 접속중 userServiceId는", user.userServiceId)
  // console.log("현재 이 파티의 리더는", props.player.leader === true && props.player.userId)

  // const [ updateMoa, setUpdateMoa ] = useState({
  //   chatLink: '',
  //   partyDescription: '',
  //   partyStatus: 1,
  //   partyTags: [],
  //   partyUsers: [],
  // })

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

    const onDeleteUser = () => {
      //파티원 삭제 모달창
      // detail axios 요청 보내기
      // moaUpdate(updateMoa, )

    }

    const onProfilePage = () => {
      navigate(`profile/${user.userServiceId}`)
    }

    
  return (
    <>
    <div onClick={onProfilePage} className='w-per20 h-per15 p-auto text-black' style={cardColor}>
      {/* 파티장 여부에 따라 파티원 삭제 버튼 표시 */}
      {/* 리더일 경우 x 없음. 파티원들은 x 있음 */}
      {/* 리더가 아닐 경우 자기 카드에만 x 있음 */}
        <div className="float-right mt-1 mr-3">
          { currentUserServiceId === leaderId && user.userServiceId !== leaderId &&
          <FontAwesomeIcon onClick={onDeleteUser} className="text-black hover:cursor-pointer" icon={ faX } />
          }
        </div>
        {/* 매너 온도에 따른 티어 이미지 */}
        <div className="w-full flex laptop:flex-row justify-between items-center text-white mb-3 tablet:flex-col mobile:flex-col">
        <div className="flex flex-row items-center">
          <img
            src={`../../ImgAssets/Tier${getTier()}.png`}
            alt=""
            className="w-14 h-14 mr-5"
          />
          <span className="font-blackSans text-black text-2xl mr-2">{user.userServiceId}</span>
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