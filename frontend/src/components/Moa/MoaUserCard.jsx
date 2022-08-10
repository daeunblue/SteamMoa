import React, { useEffect, useState } from 'react'
import { getUserInfo } from '../../api/User';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from '../Badge';

function MoaUserCard(props) {

  const [ player, setPlayer ] = useState(props.player);
    //   leader: true
    // playerId: 5
    // playerName: "수정이름"
    // userId: "dd"

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
      // console.log("player로 가져온 객체는: ",res.data.user);
      setUser(res.data.user);
    })
  },[props])

    const neonBox = {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        margin:"50px",
        width:"240px",
        height:"160px",
        border: "0.1rem solid #fff",
        borderRadius: "2rem",
        padding: "0.4em",
        // boxDhadow: 0 0 .1rem #fff,
        //             0 0 .1rem #fff,
        //             0 0 1rem #FA448C,
        //             0 0 0.8rem #FA448C,
        //             0 0 1.5rem #FA448C,
        //             inset 0 0 0.05rem #FA448C; 
                
    };

    const onDeleteUser = () => {
      //파티원 삭제

    }

    
  return (
    <div className='w-per20 h-per15 p-auto text-black' style={neonBox}>
      {/* 파티장 여부에 따라 파티원 삭제 버튼 표시 */}
      {!props.player.leader === true &&
        <div className="float-right mt-1 mr-3">
          <FontAwesomeIcon onClick={onDeleteUser} className="text-black hover:cursor-pointer" icon={ faX } />
        </div>}
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
        <div className="flex flex-row justify-center">
          {user.userTags.map((tag) => (
            <Badge key={tag} name={tag} />
          ))}
        </div>
      </div>
        {/* 리더 여부 표시 */}
        { props.player.leader === true && <span className='p-auto rounded flex justify-center items-center w-per25 text-xs font-blackSans text-black mr-2'>파티장</span>}
        {/* 유저 매너 온도 */}
        <div
            className="bg-moa-purple ml-20 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={progressStyle}
          >
            {`${user.userPoint}°C`}
          </div>

    </div>
    // 유저 강퇴도 가능해야 함 => x 버튼 만들어서 누르면 유저 리스트에서 삭제
  )
}

export default MoaUserCard;