import React, { useEffect, useState } from 'react'
import { getUserInfo } from '../../api/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MoaUserCard(props) {

  const [player,setPlayer]=useState(props.player);
  // user 정보 가져오는 api 호출 후 user 객체 가지고있기
  // player.userId로 회원정보 조회해서 매너온도 가져오고 싶은데 안 불러와짐
  

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

  useEffect((e) => {
    if(!props.player.userId) return;
    getUserInfo(props.player.userId)
    .then((res) => {
      // console.log("player로 가져온 객체는: ",res.data.user);
      setUser(res.data.user);
    })
  },[props] )

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

    const onDelete = () => {

    }

    
  return (
    // moaPartyUserCard
    <div className='w-per20 h-per15 text-black' style={neonBox}>

{/* <div className={`w-full flex justify-end ${isMypage ? 'p-[4%]':'p-[6%]'}`}>
          {isMypage ? <Link to={`/${midLocation}/${profileId}/userupdate`}><FontAwesomeIcon icon={faGear} className='text-white hover:cursor-pointer'/></Link>
            : ''}
        </div> */}

        <button onClick={onDeleteUser}><FontAwesomeIcon icon="fa-solid fa-square-xmark" /></button>


      {/* 엑스 버튼 만들고 온클릭 달아서 그거 누르면 파티원 삭제되게끔 */}

      
        {/* 매너 온도에 따른 티어 이미지 */}
        <div>여기에는 티어 이미지가 보여야 함</div>
        {/* 유저 매너 온도 */}
        <div>{user.userPoint}</div>
        {/* 유저아이디 */}
        <div>{user.userServiceId}</div>

    </div>
    // 유저 강퇴도 가능해야 함 => x 버튼 만들어서 누르면 유저 리스트에서 삭제
  )
}

export default MoaUserCard;