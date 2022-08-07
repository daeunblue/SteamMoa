import React from 'react'
import Badge from '../Badge';

function MoaUserCard(moa) {

  

    const neonBox = {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        margin:"50px",
        width:"240px",
        height:"160px",
        border: "0.1rem solid #fff",
        borderRadius: "2rem",
        padding: "0.4em",
        // boxDhadow: 0 0 .1rem #fff,
        //             0 0 .1rem #fff,
        //             0 0 1rem #FA448C,
        //             0 0 0.8rem #FA448C,
        //             0 0 1.5rem #FA448C,
        //             inset 0 0 0.05rem #FA448C; 
                
    };
  return (
    // moaPartyUserCard
    <div className='w-per20 h-per15' style={neonBox}>
        {/* 뱃지 */}
        <Badge/>
        {/* 매너온도 */}
        
        {/* 유저아이디 */}

    </div>
    // 뱃지, 매너온도(숫자), 유저아이디 들어가야 함
    // 유저 강퇴도 가능해야 함 => x 버튼 만들어서 누르면 유저 리스트에서 삭제
  )
}

export default MoaUserCard;