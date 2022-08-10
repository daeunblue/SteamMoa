import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { moaDetail, moaUpdate } from '../../api/Moazone';
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
    partyPlayers: [{playerId: 0,
      playerName: '',
      leader: false,
      userId: '',
    }],
    partyDescription:'',
    chatLink: '',
    writerId: '',
    partyIsUrgent: false,
  });

  const items= [ '즐겜', '빡겜', '공략겜', '무지성겜', '친목겜', ]

  console.log(user);
  console.log(detailMoa);
  console.log("detailMoa 객체의 스타트 타임은: ",detailMoa.startTime)
 
  let statusMsg = ["마감임박", "모집중", "모집완료", "게임중", "게임완료", "모집실패"];
  let bgColors = [
    "bg-moa-pink",
    "bg-moa-green",
    "bg-mainBtn-disabled",
    "moa-yellow",
    "bg-moa-purple",
    "bg-mainBtn-disabled",
  ];


  const formatTime = () => {
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const dateTime = detailMoa.startTime.split("T");
    console.log('dateTime', dateTime)
    const date = dateTime[0].split("-");
    const month = date[1].startsWith("0") ? date[1].charAt(1) : date[1];
    const day = date[2].startsWith("0") ? date[2].charAt(1) : date[2];
    let dayOfWeek = week[new Date(dateTime[0]).getDay()];
    const result = ` ${date[0]}.${month}.${day}.(${dayOfWeek}) ${dateTime[1]}`;
    return result;
  };
  // console.log('포맷 적용하면 : ', formatTime(detailMoa.startTime));


  const [ updateMoa, setUpdateMoa ] = useState({
    partyDescription: '',
    chatLink: '',
    partyTags: [],
    partyStatus: '',
    partyUsers: [],
  });

const [ reRender, setReRender ] = useState();
// console.log(updateMoa);

useEffect(() => {
  moaDetail(partyId)
  .then(({data}) => {
    setDetailMoa(data);

      const list=[];
      data.partyTags.forEach((tag)=>{
      const idx= items.findIndex((item)=>item===tag);
      list.push(`${idx+1}`);
    })

      const users=[];
      data.partyPlayers.forEach((player)=>{
      users.push(player.userId)
    })

      setUpdateMoa({...updateMoa,
          partyDescription: data.partyDescription,
          chatLink: data.chatLink,
          partyTags: list,
          partyStatus: Number(data.partyStatus),
          partyUsers: users,
      })
      })
  },[reRender]);


  const handlePartyJoin = (e) => {
    e.preventDefault();
    const newPartyPlayers=[...updateMoa.partyUsers]
    newPartyPlayers.push(userId)
    console.log("뉴 파티플레이어 리스트: ", newPartyPlayers)
    setUpdateMoa((updateMoa)=>{
      return ({...updateMoa, partyUsers:newPartyPlayers})
    })
    // onUpdate()
  }

  useEffect(() => {
    console.log(updateMoa);
    moaUpdate(updateMoa, partyId)
      .then((res)=> {
      console.log("moaUpdate 호출 후: ", res);
      setReRender(res)})

  }, [])

  // const onUpdate=()=>{
  //   console.log(updateMoa);
  //   moaUpdate(updateMoa, partyId)
  //     .then((res)=> {
  //     console.log("moaUpdate 호출 후: ", res);
  //     setReRender(res)
  //   });
  // }
  // 파티 수정 (파티장만 가능)
  const handlePartyUpdate = (e) => {
    e.preventDefault();
    navigate(`/moazone/update/${partyId}`);
  }

  const partyShareModal = Swal.mixin({
    html: `<strong>${user}님</strong> <br><br>정보 수정을 위해 비밀번호를 입력해주세요.`,
    input: 'password',
    okBtn: true,
    showCancelButton: true,
    confirmButtonText: '<strong>입력</strong>',
    cancelButtonText: '<strong>취소</strong>',
    confirmButtonColor: '#43B5A0',
    cancelButtonColor: '#A9ACB1',
    inputPlaceholder: '비밀번호를 입력하세요',
    inputAttributes: {
      maxlength: 30,
      autocapitalize: 'off',
      autocorrect: 'off'
    }
  })

  const handlePartyShare = (e) => {
    e.preventDefault();
    // 버튼 누르면 채팅 링크 공유하는 모달창 띄우기
    partyShareModal();
  }


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
          <div className='grid grid-flow-col '>
            <div
              className={`p-auto rounded flex justify-center items-center w-per35 font-blackSans text-white col-span-1
              ${detailMoa.partyIsUrgent ? bgColors[0] : bgColors[detailMoa.partyStatus]}`}>
              <span>{detailMoa.partyIsUrgent ? statusMsg[0] : statusMsg[detailMoa.partyStatus]}</span>
            </div>
            <div 
              className="font-blackSans text-xl tablet:text-2xl laptop:text-[32px] text-whitetext-base whitespace-nowrap overflow-hidden text-ellipsis col-span-4" 
              name="partyTitle" 
              value={detailMoa.partyTitle}>
                {detailMoa.partyTitle}
            </div>
            <div>{detailMoa.writerId === userId && <button className="hover:cursor-pointer hover:text-white rounded-2xl font-semibold text-[2vw] tablet:text-[1.1vw] laptop:text-sm px-1.5 tablet:px-2.5 py-0.5 bg-searchbar-gray hover:bg-moa-blue-dark drop-shadow-lg hover:scale-[102%] text-center flex items-center mr-2 text-black" onClick={handlePartyUpdate}>파티 수정하기</button>}</div>
            <div>{detailMoa.writerId !== userId && <button className="hover:cursor-pointer hover:text-white rounded-2xl font-semibold text-[2vw] tablet:text-[1.1vw] laptop:text-sm px-1.5 tablet:px-2.5 py-0.5 bg-searchbar-gray hover:bg-moa-blue-dark drop-shadow-lg hover:scale-[102%] text-center flex items-center mr-2 text-black" onClick={handlePartyJoin}>파티 참여하기</button>}</div>
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
          {/* <div className="text-base font-sans font-semibold" name="startTime">파티시간: {formatTime(detailMoa.startTime)} </div> */}
          <div className="text-base font-blackSans font-semibold my-3">참가 파티원 ({detailMoa.curPlayer}/{detailMoa.maxPlayer})</div>
          <div>
            {detailMoa.partyPlayers.map((player, playerId)=>{
              // console.log('detail player :',player);
              return <MoaUserCard key={playerId} player={player}/>
            })}
          </div>
          <hr />
          <div className='text-base font-blackSans font-semibold my-3'>파티 모집 내용</div>
          <div className="w-full h-48 px-2 py-1 tablet:px-3 tablet:py-2 laptop:px-5 laptop:py-3 tablet rounded opacity-90 bg-detailContent-light w-full text-black"> {detailMoa.partyDescription}</div>
        </div>
      </div>

    </div>
    </>
  )
}

export default MoaDetail;