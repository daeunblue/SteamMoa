import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { moaDetail, moaJoin, moaLeave } from '../../api/Moazone';
import MoaUserCard from '../../components/Moa/MoaUserCard';
import Navbar from '../../components/Navbar';
import { auth } from '../../recoil/Auth';
import { formatTime } from '../../util/FormatTime';
import Swal from 'sweetalert2';

function MoaDetail() {

  const user = useRecoilState(auth);
  const userId = user[0].userId;
  const params = useParams();
  const partyId = params.party_id;
  const navigate = useNavigate();
  
  const [ detailMoa, setDetailMoa ] = useState({
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
    partyPlayers: [],
    partyDescription:'',
    chatLink: '',
    writerId: '',
    partyIsUrgent: false,
  });

  const items = [ '즐겜', '빡겜', '공략겜', '무지성겜', '친목겜', ]

  let statusMsg = ["마감임박", "모집중", "모집완료", "게임중", "게임완료", "모집실패"];

  let bgColors = [
    "bg-moa-pink",
    "bg-moa-green",
    "bg-mainBtn-disabled",
    "moa-yellow",
    "bg-moa-purple",
    "bg-mainBtn-disabled",
  ];

  useEffect(() => {
    moaDetail(partyId)
    .then(({data}) => {
      console.log("moaDetail 호출 후", data)
      setDetailMoa(data);
      
        const lst=[];
        data.partyTags.forEach((tag)=>{
        const idx= items.findIndex((item)=>item===tag);
        lst.push(`${idx+1}`);
      })
        const users=[];
        data.partyPlayers.forEach((player)=>{
        users.push(player.userId)
      })
        })
    },[]);

  const handlePartyJoin = (e) => {
    e.preventDefault();
    moaJoin(detailMoa, partyId, userId)
    .then((res) => {
      console.log("참여하기 누른 뒤", res);
      setDetailMoa(res.data);
    })
  }

  const handlePartyUpdate = (e) => {
    e.preventDefault();
    navigate(`/moazone/update/${partyId}`);
  }

  const handlePartyLeave = (e) => {
    e.preventDefault();
    moaLeave(detailMoa, partyId, userId)
        .then((res) => {
          setDetailMoa(res.data)
        })
  }

  const handlePartyShare = (e) => {
    e.preventDefault();
    Swal.fire({
      title: `${detailMoa.chatLink}`,
      icon: 'success',
      position: 'center',
      showCloseButton: true,
    })
    .then((res) => {

    })
  }

  const handlePrevPage = (e) => {
    e.preventDefault();
    navigate(`/moazone`);
  }

  const playerList = []
   detailMoa.partyPlayers.forEach((player) => {
    playerList.push(player.userId);
  })
  console.log("현재까지 플레이어 리스트 :", playerList)

  return (
    <>
    <Navbar />
    <div className="w-per75 h-screen m-auto mb-2 text-white font-sans"> 
    <div>
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
          <div className='flex '>
            <div className="flex justify-content-around">
              {/* 파티 모집 상태 */}
              <div
                className={`p-auto rounded flex justify-center items-center w-per35 font-blackSans text-white
                ${detailMoa.partyIsUrgent ? bgColors[0] : bgColors[detailMoa.partyStatus]}`}>
                <span>{detailMoa.partyIsUrgent ? statusMsg[0] : statusMsg[detailMoa.partyStatus]}</span>
              </div>
              {/* 파티 제목 */}
              <div 
                className="font-blackSans text-xl tablet:text-2xl laptop:text-[32px] text-whitetext-base whitespace-nowrap overflow-hidden text-ellipsis" 
                name="partyTitle" 
                value={detailMoa.partyTitle}>
                  {detailMoa.partyTitle}
              </div>
            </div>
            <div className=''>
              <div>
                {
                  detailMoa.writerId === userId ? <button className="hover:cursor-pointer hover:text-white rounded-2xl font-semibold text-[2vw] tablet:text-[1.1vw] laptop:text-sm px-1.5 tablet:px-2.5 py-0.5 bg-searchbar-gray hover:bg-moa-blue-dark drop-shadow-lg hover:scale-[102%] text-center flex items-center mr-2 text-black" onClick={handlePartyUpdate}>파티 수정하기</button> : 
                  (playerList.includes(userId) ? <button className="hover:cursor-pointer hover:text-white rounded-2xl font-semibold text-[2vw] tablet:text-[1.1vw] laptop:text-sm px-1.5 tablet:px-2.5 py-0.5 bg-searchbar-gray hover:bg-moa-blue-dark drop-shadow-lg hover:scale-[102%] text-center flex items-center mr-2 text-black" onClick={handlePartyLeave}> 파티 나가기 </button> : 
                  <button className="hover:cursor-pointer hover:text-white rounded-2xl font-semibold text-[2vw] tablet:text-[1.1vw] laptop:text-sm px-1.5 tablet:px-2.5 py-0.5 bg-searchbar-gray hover:bg-moa-blue-dark drop-shadow-lg hover:scale-[102%] text-center flex items-center mr-2 text-black" onClick={handlePartyJoin}>파티 참여하기</button>)
                }
              </div>
            </div>
          </div>

          <div className="flex my-5">
            <div className="flex">
            {detailMoa.partyTags.map((item, idx) => {
              return (
                <div key={idx}
                name="partyTags"
                className="rounded-2xl font-semibold text-white text-[2vw] tablet:text-[1.1vw] laptop:text-sm px-2.5 py-1 bg-moa-green-dark drop-shadow-lg text-center flex items-center mr-2">{item}</div>
                )
              })}
            </div>
            <div className='flex justify-content-end'>
              <button className="hover:cursor-pointer hover:text-white rounded-2xl font-bold text-[2vw] tablet:text-[1.1vw] laptop:text-sm px-1.5 tablet:px-2.5 py-0.5 bg-searchbar-gray hover:bg-moa-pink-dark drop-shadow-lg hover:scale-[102%] text-center flex items-center text-black" onClick={handlePartyShare}>파티 공유하기</button>
            </div>
          </div>
          <hr />
          {detailMoa.partyPlayers.length !== 0 &&<div className="my-3 text-base font-blackSans font-semibold" name="startTime">파티 시작 시간 : {formatTime(detailMoa.startTime)} </div>}
          <div className="text-base font-blackSans font-semibold my-3">참가 파티원 ({detailMoa.curPlayer}/{detailMoa.maxPlayer})</div>
          <div className='flex'>
            {detailMoa.partyPlayers.map((player, playerId)=>{
              return <MoaUserCard key={playerId} player={player} />
            })}
          </div>
          <hr />
          <div className='text-base font-blackSans font-semibold my-3'>파티 모집 내용</div>
          <div className="w-full h-48 px-2 py-1 tablet:px-3 tablet:py-2 laptop:px-5 laptop:py-3 tablet rounded opacity-90 bg-detailContent-light w-full text-black"> {detailMoa.partyDescription}</div>
          <div className='grid place-items-center mt-4'>
            <button onClick={handlePrevPage} className="w-32 h-12 mx-3 bg-mainBtn-disabled rounded-sm text-black text-sm">파티 목록 보기</button>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default MoaDetail;