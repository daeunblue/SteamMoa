import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { moaDetail } from '../../api/Moazone';
import MoaUserCard from '../../components/Moa/MoaUserCard';
import Navbar from '../../components/Navbar';

function MoaDetail() {

  const params=useParams();
  const partyId=params.party_id;
  const navigate = useNavigate();
  
  const [detailMoa,setDetailMoa]=useState({
    gameId: 1,
    gameImgPath:'',
    gameName: '',
    partyId: partyId,
    partyTitle: '',
    partyTags: [],
    maxPlayer: 0,
    curPlayer: 0,
    startTime: '',
    writeTime: '',
    partyStatus:'',
    partyPlayers: [{playerId: 0,
      playerName: '',
      leader: false,}],
    partyDescription:'',
    chatLink: '',
  });

  let statusMsg = ["마감임박", "모집중", "모집완료", "게임중", "게임완료", "모집실패"];

  const formatTime = () => {
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const dateTime = detailMoa.startTime.split("T");
    const date = dateTime[0].split("-");
    const month = date[1].startsWith("0") ? date[1].charAt(1) : date[1];
    const day = date[2].startsWith("0") ? date[2].charAt(1) : date[2];
    let dayOfWeek = week[new Date(dateTime[0]).getDay()];
    const result = ` ${date[0]}.${month}.${day}.(${dayOfWeek}) ${dateTime[1]}`;
    return result;
  };

  useEffect(
    () => {
     moaDetail(partyId)
    .then((res)=>{ //중괄호 언제붙이는지 궁금?
      setDetailMoa(res.data)
    }).catch(error=>console.log(error))
  }, [])


  console.log('detailMoa : ',detailMoa);
  // 파티 참여 (파티장 빼고 가능)
  const handlePartyJoin = (e) => {
    e.preventDefault();
    // partyPlayers에 userId 추가
    setDetailMoa()

  }
  // 파티 수정 (파티장만 가능)
  const handlePartyUpdate = (e) => {
    e.preventDefault();
    navigate(`/moazone/update/${partyId}`); //update 페이지로 이동

  }

  const handlePartyShare = (e) => {
    e.preventDefault();
    // 버튼 누르면 채팅 링크 공유하는 모달창 띄우기
  }



  return (
    <>
    <Navbar />
    <div className="w-per75 h-screen m-auto text-white font-sans"> 
    <div>
      {/* <MoaCard detailMoa={detailMoa}/> */}
    </div>
      <div className='overflow-hidden w-full relative pb-[25%] bg-gray-900 object opacity-[95%] hover:opacity-100 transition-transform ease-in-out duration-7000'>
        {/* 게임 이미지 */}
        <img className="w-screen absolute top-[-50%] left-0 hover:scale-[55%] hover:translate-y-[5%] hover:object-contain transition-transform delay-150 ease-in-out duration-700" src={detailMoa.gameImgPath} alt="게임 이미지" />
      </div>
      {/* 게임 이름 */}
      <div className="w-full h-4 tablet:h-5 bg-gradient-to-b from-bg-search-gradient-from via-bg-search-gradient-via to-bg-search-gradient-to font-blackSans text-xs my-1 whitespace-nowrap overflow-hidden text-ellipsis ">{detailMoa.gameName}</div>
      {/* 본문 */}
      <div className="p-[2.5%] mb-4">
        <div>
          <div className='grid grid-flow-col '>
            <span className='hover:cursor-pointer rounded-2xl font-bold text-white text-[2vw] tablet:text-[1.2vw] laptop:text-base px-1.5 tablet:px-2.5 py-0.5 bg-moa-blue hover:bg-moa-blue-dark drop-shadow-lg hover:scale-[102%] text-center flex items-center mr-2'>{detailMoa.partyIsUrgent ? statusMsg[0] : statusMsg[detailMoa.partyStatus]}</span>
            {/* <div name="partyStatus" value={detailMoa.partyStatus}>{detailMoa.partyStatus}</div> */}
            <div className="font-blackSans text-base whitespace-nowrap overflow-hidden text-ellipsis" name="partyTitle" value={detailMoa.partyTitle}>{detailMoa.partyTitle}</div>
            <button className="" onClick={handlePartyJoin}>파티 참여하기</button>
            <button onClick={handlePartyUpdate}>파티 수정하기</button>
          </div>
          <div className="flex">
            <div className="" name="partyTags" value={detailMoa.partyTags}>아아아 {detailMoa.partyTags}</div>
            <button className="" onClick={handlePartyShare}>파티 공유하기</button>
          </div>
          {/* <div className="text-xs font-sans font-semibold" name="startTime">파티시간: {formatTime()} </div> */}
          <div className="text-xs font-sans font-semibold">참가 파티원 ({detailMoa.curPlayer}/{detailMoa.maxPlayer})</div>
          <div>
            {detailMoa.partyPlayers.map((player)=>{
              <MoaUserCard player={player}/>
            })}
          </div>
          <div>파티 모집 내용</div>
          <div className="px-2 py-1 tablet:px-3 tablet:py-2 laptop:px-5 laptop:py-3 tablet rounded opacity-90 bg-detailContent-light w-full text-black"> {detailMoa.partyDescription}</div>
        </div>
      </div>

    </div>
    </>
  )
}

export default MoaDetail