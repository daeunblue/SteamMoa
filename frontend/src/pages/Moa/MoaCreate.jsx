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
    //     'chat_link': 'https://www.figma.com/file/Zrl14ZgPRxZdzvOj1vSIpC/Untitled?node-id=265%3A841',
    //   }

  return (
    <div>
      <Navbar />
      <form action="">
        <div className="w-4/5 h-screen m-auto text-white">
            <div className="m-auto mb-2">
                {/* 모아존 배너 */}
                <img className="w-full" src="public/ImgAssets/MoaZone_CreateVer.gif" alt="모아존 글쓰기 배너 이미지" />/
            </div>
            <div className="m-auto mb-2">
                <div className="mb-2">
                <span>파티 모집 글쓰기</span>
                </div>
                <div className="">
                    <input className="w-full bg-createInput-gray rounded-lg" type="text" placeholder="파티 모집 제목"/>
                <div>
                    <div className="flex mb-3">
                    <label htmlFor="">플레이 게임</label>
                    <input className="w-5/6 bg-createInput-gray rounded-lg" type="text" placeholder="게임 제목을 검색하세요" />
                    <div className="w-1/6"> 
                        <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        {/* <span class="sr-only">Search</span> */}
                        </button>
                    </div>
                    </div>
                </div>
                {/* 플레이 인원, 데이트피커 컨테이너 */}
                <div className="flex justify-content-between mb-3">
                    <div className="w-1/2">
                        <label htmlFor="">플레이 인원</label>
                        <input className="w-full bg-createInput-gray rounded-lg" type="text" />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="">시작 시간</label>
                        <input className="w-full bg-createInput-gray rounded-lg" type="date" />
                    </div>
                </div>
                {/* 모집내용 쓰는곳 */}
                <div>
                    <input className="w-full bg-createInput-gray rounded-lg" type="text" placeholder="모집 내용 쓰는 곳"/>
                </div>
                </div>
                <div>
                {/* 디코 링크 컨테이너 */}
                <div className="flex">
                    <label htmlFor="">음성 채팅 링크</label>
                    <input className="bg-createInput-gray w-full rounded-lg" type="text" name="" id="" />
                </div>
                </div> 
                <div>
                {/* 취소버튼, 파티 만들기 버튼 */}
                <div className="grid justify-items-center">
                    <div className="flex">
                    <button className="w-32 bg-mainBtn-disabled rounded-lg">취소</button>
                    <button className="w-32 bg-moa-pink-dark rounded-lg">파티 만들기</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
     </form>
    </div>

  )
};

export default MoaCreate;