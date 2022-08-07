import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { moaDetail } from '../../api/Moazone';
import MoaCard from '../../components/MoaCard';
import Navbar from '../../components/Navbar';

function MoaDetail (props) {

  // {
  //   "gameId": 1,
  //   "gameImgPath": "https://cdn.akamai.steamstatic.com/steam/apps/2069590/header.jpg?t=1658197219",
  //   "gameName": "Radial Flow Playtest",
  //   "partyId": 4,
  //   "partyTitle": "게임 같이 하실 분~",
  //   "partyTags": [],
  //   "maxPlayer": 5,
  //   "curPlayer": 1,
  //   "startTime": "2021-11-08 11:44:30.327959",
  //   "writeTime": "2022-08-02 23:47:20.381272",
  //   "partyStatus": "1",
  //   "partyPlayers": [
  //   {
  //   "playerId": 1,
  //   "playerName": "김싸피",
  //   "leader": true
  //   }
  //   ],
  //   "partyDescription": "new party_description",
  //   "chatLink": "https new chat_link"
  //   }
   
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const partyId = location.state.partyId;

  const [ detailMoa, setDetailMoa ] = useState();
  // const { 
  //   gameId, 
  //   gameImgPath, 
  //   gameName, 
  //   partyTitle, 
  //   maxPalyer, 
  //   curPlayer, 
  //   startTime, 
  //   partyIsUrgent, 
  //   partyStatus,
  //   partyPlayers,
  //   partyDescription,
  //   chatLink,
  // } = props.party;


  useEffect(() => {
    moaDetail(partyId)
    .then((res)=>{
      console.log('res: ', res)
      setDetailMoa(res.data)
    console.log(res.data);
    })
  }, [partyId])
  console.log(detailMoa);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/moazone/update/${partyId}`, {state: partyId})

  }
  return (

    // {/* 게시물 작성자에게만 수정 버튼 보이게 */}
    // <button onClick={handleSubmit}>수정하기</button>
    <>
    <Navbar />
    <p>여기는 detail 페이지</p>
    <div className="w-per75 h-screen m-auto text-white font-sans"> 
    <div>
      <MoaCard detailMoa={detailMoa}/>
    </div>
      <div className='m-auto'>
        <img className="w-full" src={detailMoa.gameImgPath} alt="게임 이미지" />
      </div>
      <div>
        <div>
          <div className='flex justify-content-between'>
            <div name="partyStatus" value={detailMoa.partyStatus}>파티 상태</div>
            <div name="partyTitle" value={detailMoa.partyTitle}>파티 제목</div>
            {/* partyId 같으면 파티 수정, 아니면 파티 참여 */}
            <div name="partyJoin">파티 참여 or 파티 수정</div>
          </div>
          <div>파티 태그</div>
          <div>파티 공유하기</div>
        </div>
        <div>
          <div>파티 시간</div>
          <div>참가 파티원</div>
        </div>
        <div 
        className=''
        name="partyDescription"
        value={detailMoa.partyDescription}
        >파티 모집 내용</div>
      </div>

    </div>
    </>
  )
}



export default MoaDetail