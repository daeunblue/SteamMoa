import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar';
// import ProfileUser from 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const MoaUpdate = (props) => {
  // party_id가 같으면 수정 가능
  const [ moa, setMoa ] = useState({
    party_id: '',
    party_title: '',
    game_name: '',
    start_time: '',
    max_player: '',
    party_description: '',
    chat_link: '',
    user_id: '',
    ptag_content: '',
});

const navigate = useNavigate();
// 데이터 변경사항 저장
const onChange = (event) => {
    const { name, value } = event.target;
    setMoa({
        ...moa,
        [name]: value,
    })
}
// 수정된 데이터 보내서 저장
const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    axios.put("http://localhost:8080/api/moazone", {
        party_id: moa.party_id,
        party_title: moa.party_title,
        game_name: moa.game_name,
        start_time: moa.start_time,
        max_player: moa.max_player,
        party_description: moa.party_description,
        chat_link: moa.chat_link
    })
    .then(function (res) {
        //성공시 리다이렉트 어디로?
        if (res.status === 200 ){
            navigate('/')
        } else {
            alert(res.data.message);
        }
    });
}
    
  useEffect((e) => {
    // 라우터 쿼리 가져오기
    // party_id가 같은 데이터 가져오기
    // axios로 api 요청 보내서 다시 데이터 가져오기
  axios
    .get(`http://localhost:8080/api/moazone/`, {

  }).then(function (res) {
    
  })
  

  });
  // 파티원 강퇴 => 파티원 테이블에서 삭제 가능
  // 
  // 파티장이 파티 마감 => 모집중에서 모집완료로 바뀌어야 함

  return (
    <>
      <Navbar />
        <div className="w-per75 h-screen m-auto text-white font-sans">
            <div className="m-auto">
                <img className="w-full" src="../../ImgAssets/MoaZone_UpdateVer.gif" alt="모아존 글수정 배너 이미지" />
            </div>
            <div className="box-content w-full bg-main-300 mb-2 text-main-300">공간채우기 용도 글씨</div>
            <form>
            <div className="m-auto mb-2 bg-main-400">
                <div className="createContainer p-4">
                <div className="mb-3">
                <span >파티 모집 수정하기</span>
                </div>
                    <input 
                    name="party_title"
                    value={moa.party_title}
                    onChange={onChange}
                    className="w-full text-main-500 bg-mainBtn-disabled rounded-lg mb-3" type="text" placeholder="파티 모집 제목" disabled />
                <div className="grid grid-flow-col mb-3">
                    <span className="col-span-1 ">플레이 게임</span>
                    <input 
                    name="game_name"
                    value={moa.game_name}
                    onChange={onChange}
                    className="col-span-12 text-main-500 bg-mainBtn-disabled rounded-lg" type="text" placeholder="게임 제목을 검색하세요" disabled />
                </div>
                <div className="grid grid-flow-col mb-3">
                    <div className="grid grid-flow-col col-span-1 mx-2">
                        <span className="col-span-1">플레이 인원</span>
                        <input 
                        name="max_player"
                        value={moa.max_player}
                        onChange={onChange}
                        className="col-span-4 w-full text-main-500 bg-mainBtn-disabled rounded-lg" type="text" disabled />
                    </div>
                    <div className="grid grid-flow-col col-span-2">
                        <span className="col-span-1">시작시간</span>
                        <div className="col-span-7">
                        <input 
                        name="start_time"
                        value={moa.start_time}
                        onChange={onChange}
                        className="w-full text-main-500 bg-mainBtn-disabled rounded-lg" type="date" disabled />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <textarea 
                    name="game_description"
                    value={moa.game_description}
                    onChange={onChange}
                    className="w-full text-main-500 bg-createInput-gray rounded-lg" rows="10" placeholder="모집 내용 쓰는 곳"></textarea>
                </div>
                <div className="grid grid-flow-col mb-8">
                    <span className="col-span-1">음성 채팅 링크</span>
                    <input 
                    name="chat_link"
                    value={moa.chat_link}
                    onChange={onChange}
                    className="col-span-11 text-main-500 bg-createInput-gray w-full rounded-lg" type="text" id="" />
                </div>
                <div className='w-per-75 h-40 border-box bg-createInput-gray rounded-lg text-black'>
                  {/* <ProfileUser /> */}
                </div>
                </div>
            </div>
            <div className="flex mt-5">
                    <div className="m-auto">
                    <button className="w-32 h-14 mx-3 bg-mainBtn-disabled rounded-sm">취소</button>
                    <button onClick={handleSubmit} className="w-32 h-14 mx-3 bg-moa-purple rounded-sm">수정 완료</button>
                    </div>
            </div>
            </form>
        </div>
     </>

  )
}

export default MoaUpdate;
