import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { moaDetail } from '../../api/Moazone';
import Navbar from '../../components/Navbar';

function MoaDetail() {
  const navigate =useNavigate();
 const location= useLocation();
 const partyId=location.state.partyId
 const [detailMoa,setDetailMoa]=useState();

  useEffect(() => {
    moaDetail(partyId)
    .then((res)=>{
      setDetailMoa(res.data)
    console.log(res.data);
    })
  }, [])

  console.log(detailMoa);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/moazone/update/${partyId}`,{state:detailMoa})

  }
  return (

    // {/* 게시물 작성자에게만 수정 버튼 보이게 */}
    // <button onClick={handleSubmit}>수정하기</button>
    <>
    <Navbar />
    <div className="w-per75 h-screen m-auto text-white font-sans">
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