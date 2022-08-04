import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";


// 글을 작성하고 입력 버튼을 누르면 db에 저장
// update 페이지에서 db를 불러온 뒤 수정 후 다시 서버로 보내 db에 저장
function MoaCreate() {
    const [ moa, setMoa ] = useState({
        partyTitle: '',
        gameName: '',
        startTime: '',
        maxPlayer: '',
        partyDescription: '',
        chatLink: '',
        partyTags: '',
    });
    // 파티 태그 요소 하드 코딩
    const partyTagList = {

    };

    const navigate = useNavigate();

    // 데이터 변경사항 저장
    const onChange = (event) => {
        const { name, value } = event.target;
        setMoa({
            ...moa,
            [name]: value,
        })
    }
    // 데이터 보내기
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e.target)
        axios.post("http://i7a303.p.ssafy.io:8080/api/moazone", {
            partyTitle: moa.partyTitle,
            gameName: moa.gameName,
            startTime: moa.startTime,
            maxPlayer: moa.maxPlayer,
            partyDescription: moa.partyDescription,
            chatLink: moa.chatLink,
            partyTags: moa.partyTags,
        })
        .then(function (res) {
            console.log(res)
            //성공시
            if (res.status === 200) {
                navigate('/');
            //실패시
            } else {
                alert(res.data.message);
            }
        });
    }
    
    const handleCancel = () => {
        navigate('/');
    }

  return (
    <>
      <Navbar />
        <div className="w-per75 h-screen m-auto text-white font-sans">
            <div className="m-auto">
                <img className="w-full" src="../../ImgAssets/MoaZone_CreateVer.gif" alt="모아존 글쓰기 배너 이미지" />
            </div>
            <div className="box-content w-full bg-main-300 mb-2 text-main-300">공간채우기 용도 글씨</div>
            <form>
            <div className="m-auto mb-2 bg-main-400">
                <div className="createContainer p-4">
                <div className="mb-3">
                <span>파티 모집 글쓰기</span>
                </div>
                    <input 
                    name="party_title" 
                    value={moa.partyTitle} 
                    onChange={onChange} 
                    className="w-full text-main-500 bg-createInput-gray rounded-lg mb-3" type="text" placeholder="파티 모집 제목"/>
                {/* 게임 검색 요청 보내기 */}
                <div className="grid grid-flow-col mb-3">
                    <span className="col-span-1">플레이 게임</span>
                    {/* Search 컴포넌트 삽입 */}
                    <input 
                    name="game_name" 
                    value={moa.gameName} 
                    onChange={onChange}  
                    className="col-span-12 text-main-500 bg-createInput-gray rounded-lg" type="text" placeholder="게임 제목을 검색하세요" />
                    <div> 
                        <button type="submit" className="h-10 p-2.5 ml-2 font-medium text-white bg-moa-pink-dark rounded-lg border focus:ring-4 focus:outline-none">
                        검색
                        </button>
                    </div>
                </div>
                <div className="grid grid-flow-col mb-3">
                    <div className="grid grid-flow-col col-span-1 mx-2">
                        <span className="col-span-1">플레이 인원</span>
                        <input 
                        name="max_player" 
                        value={moa.maxPlayer} 
                        onChange={onChange} 
                        className="col-span-4 w-full text-main-500 bg-createInput-gray rounded-lg" type="text" />
                    </div>
                    <div className="grid grid-flow-col col-span-2">
                        <span className="col-span-1">시작시간</span>
                        <div className="col-span-7">
                        <input 
                        name="start_time" 
                        value={moa.startTime} 
                        onChange={onChange} 
                        className="w-full text-main-500 bg-createInput-gray rounded-lg" type="date" />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <textarea 
                    name="party_description" 
                    value={moa.partyDescription} 
                    onChange={onChange} 
                    className="w-full text-main-500 bg-createInput-gray rounded-lg" id="" cols="" rows="10" placeholder="모집 내용 쓰는 곳"></textarea>
                </div>
                <div className="grid grid-flow-col mb-8">
                    <span className="col-span-1">음성 채팅 링크</span>
                    <input 
                    name="chat_link" 
                    value={moa.chatLink} 
                    onChange={onChange} 
                    className="col-span-11 text-main-500 bg-createInput-gray w-full rounded-lg" type="text" id="" />
                </div>
                {/* 파티 태그 하드 코딩 */}
                <div className="grid grid-flow-col mb-8">
                    <span className="col-span-1">파티 태그</span>
                    <input 
                    name="p_tags" 
                    value={moa.partyTags} 
                    onChange={onChange} 
                    className="col-span-11 text-main-500 bg-createInput-gray w-full rounded-lg" type="text" id="" />
                </div>
                </div>
            </div>
            <div className="flex mt-5">
                    <div className="m-auto">
                    <button onClick={handleCancel} className="w-32 h-14 mx-3 bg-mainBtn-disabled rounded-sm">취소</button>
                    <button onClick={handleSubmit} className="w-32 h-14 mx-3 bg-moa-pink-dark rounded-sm">파티 만들기</button>
                    </div>
            </div>
            </form>
        </div>
     </>

  )
};

export default MoaCreate;