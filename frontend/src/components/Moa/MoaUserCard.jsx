import React, { useEffect, useState } from 'react'
import { getUserInfo } from '../../api/User';

function MoaUserCard(player) {
  // user 정보 가져오는 api 호출 후 user 객체 가지고있기
  const [ user, setUser ] = useState({
    userPoint: '',
  });

  console.log(user);

  useEffect((e) => {
    getUserInfo(player.playerName)
    .then((res) => {
      console.log(res);
      setUser(res);
    })
  }, [])

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

    
  return (
    // moaPartyUserCard
    <div className='w-per20 h-per15 text-black' style={neonBox}>
        {/* 유저 매너 온도 */}
        <div>{user.userPoint}</div>
        {/* 유저아이디 */}
        <div>{player.playerId}</div>

    </div>
    // 유저 강퇴도 가능해야 함 => x 버튼 만들어서 누르면 유저 리스트에서 삭제
  )
}

export default MoaUserCard;