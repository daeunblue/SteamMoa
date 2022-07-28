import React from 'react'
import Navbar from '../../components/Navbar';
import MoaPartyMember from '../../components/Moa/MoaPartyMember';


const MoaUpdate = (props) => {

  return (
    <>
      <Navbar />
        <div className="w-per75 h-screen m-auto text-white font-sans">
            <div className="m-auto">
                <img className="w-full" src="../../ImgAssets/MoaZone_UpdateVer.gif" alt="모아존 글수정 배너 이미지" />
            </div>
            <div className="box-content w-full bg-main-300 mb-2 text-main-300">공간채우기 용도 글씨</div>
            <form action="">
            <div className="m-auto mb-2 bg-main-400">
                <div className="createContainer p-4">
                <div className="mb-3">
                <span >파티 모집 글쓰기</span>
                </div>
                    <input className="w-full text-main-500 bg-mainBtn-disabled rounded-lg mb-3" type="text" placeholder="파티 모집 제목" disabled />
                <div className="grid grid-flow-col mb-3">
                    <span className="col-span-1 ">플레이 게임</span>
                    <input className="col-span-12 text-main-500 bg-mainBtn-disabled rounded-lg" type="text" placeholder="게임 제목을 검색하세요" disabled />
                </div>
                <div className="grid grid-flow-col mb-3">
                    <div className="grid grid-flow-col col-span-1 mx-2">
                        <span className="col-span-1">플레이 인원</span>
                        <input className="col-span-4 w-full text-main-500 bg-mainBtn-disabled rounded-lg" type="text" disabled />
                    </div>
                    <div className="grid grid-flow-col col-span-2">
                        <span className="col-span-1">시작시간</span>
                        <div className="col-span-7">
                        <input className="w-full text-main-500 bg-mainBtn-disabled rounded-lg" type="date" disabled />
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
                <div className='w-per-75 h-40 border-box bg-createInput-gray rounded-lg text-black'>
                  <MoaPartyMember />
                </div>
                </div>
            </div>
            <div className="flex mt-5">
                    <div className="m-auto">
                    <button className="w-32 h-14 mx-3 bg-mainBtn-disabled rounded-sm">취소</button>
                    <button className="w-32 h-14 mx-3 bg-moa-purple rounded-sm">수정 완료</button>
                    </div>
            </div>
            </form>
        </div>
     </>

  )
}

export default MoaUpdate;
