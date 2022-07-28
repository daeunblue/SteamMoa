import React from "react";
import Navbar from "../../components/Navbar";

function MoaCreate() {

    // const party = {
    //     'party_id':1234567,
    //     'party_title': '구스구스덕 12인팟',
    //     'game_name': 'Goose Goose Duck',
    //     'start_time': '2022.07.10',
    //     'cur_player': 10,
    //     'max_player': 12,
    //     'party_description': '울라불라 왈라발라 샬라샬라',
    //     'chat_link': 'https://www.sdfs.com',
    //   }

  return (
    <>
      <Navbar />
        <div className="w-per75 h-screen m-auto text-white font-sans">
            <div className="m-auto">
                <img className="w-full" src="../../ImgAssets/MoaZone_CreateVer.gif" alt="모아존 글쓰기 배너 이미지" />
            </div>
            <div className="box-content w-full bg-main-300 mb-2 text-main-300">공간채우기 용도 글씨</div>
            <form action="">
            <div className="m-auto mb-2 bg-main-400">
                <div className="createContainer p-4">
                <div className="mb-3">
                <span >파티 모집 글쓰기</span>
                </div>
                    <input className="w-full text-main-500 bg-createInput-gray rounded-lg mb-3" type="text" placeholder="파티 모집 제목"/>
                <div className="grid grid-flow-col mb-3">
                    <span className="col-span-1 ">플레이 게임</span>
                    <input className="col-span-12 text-main-500 bg-createInput-gray rounded-lg" type="text" placeholder="게임 제목을 검색하세요" />
                    <div> 
                        <button type="submit" className="h-10 p-2.5 ml-2 font-medium text-white bg-moa-pink-dark rounded-lg border focus:ring-4 focus:outline-none">
                        검색
                        </button>
                    </div>
                </div>
                <div className="grid grid-flow-col mb-3">
                    <div className="grid grid-flow-col col-span-1 mx-2">
                        <span className="col-span-1">플레이 인원</span>
                        <input className="col-span-4 w-full text-main-500 bg-createInput-gray rounded-lg" type="text" />
                    </div>
                    <div className="grid grid-flow-col col-span-2">
                        <span className="col-span-1">시작시간</span>
                        <div className="col-span-7">
                        <input className="w-full text-main-500 bg-createInput-gray rounded-lg" type="date" />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <textarea className="w-full text-main-500 bg-createInput-gray rounded-lg" name="" id="" cols="" rows="10" placeholder="모집 내용 쓰는 곳"></textarea>
                </div>
                <div className="grid grid-flow-col mb-8">
                    <span className="col-span-1">음성 채팅 링크</span>
                    <input className="col-span-11 text-main-500 bg-createInput-gray w-full rounded-lg" type="text" name="" id="" />
                </div>
                </div>
            </div>
            <div className="flex mt-5">
                    <div className="m-auto">
                    <button className="w-32 h-14 mx-3 bg-mainBtn-disabled rounded-sm">취소</button>
                    <button className="w-32 h-14 mx-3 bg-moa-pink-dark rounded-sm">파티 만들기</button>
                    </div>
            </div>
            </form>
        </div>
     </>

  )
};

export default MoaCreate;