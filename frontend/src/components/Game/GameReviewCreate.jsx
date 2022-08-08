import React, { useEffect, useState } from 'react'
import '../../assets/reviewStar.css'
import { useRecoilState } from "recoil";
import { auth } from "../../recoil/Auth";
import {useParams} from 'react-router-dom'


const GameReviewCreate = (props) => {
  const params = useParams()
  const gameId = params.game_id
  const [userAuth, ] = useRecoilState(auth);
  const [reviewData, setReviewData] = useState({
    "gameId": gameId,
    "reviewContent": '',
    "reviewScore": 0,
    "userServiceId": userAuth.userId,
  })

  const onChange = (event) => {
    const { name, value } = event.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  const onSubmit = () => {

  }


  return (
    <div className="w-full px-[3%] py-2 tablet:py-4 bg-slate-500 rounded">
      <div className='mb-0.5 text-[1em] font-semibold'>리뷰 작성하기</div>
      <div className="flex items-center h-10">
        {/* 별점 label */}
        <div className='text-center mb-1 mr-2 text-[0.85em] font-bold'>만족도</div>
        {/* 별점 5점척도 */}
        <div className="star-rating mb-2 max-h-10 max-w-144">
          {[...Array(5)].map((_, index)=>{
            return(
              <>
                <input key={index} type="radio" id={`${5-index}-stars-edit`} name="reviewScore" value={5-index} disabled={!userAuth.isLoggedIn} onChange={onChange} />
                <label htmlFor={`${5-index}-stars-edit`} className="star text-center drop-shadow-md
                ">&#9733;</label>
              </> 
            )
          })}
        </div>
      </div>
      {/* input */}
      <textarea className='w-full rounded mb-1 text-[0.8em]' value={reviewData.reviewContent} onChange={onChange} name="reviewContent" placeholder="게임에 대한 의견을 남겨주세요"/>
      
      <div className='flex justify-end'>
        <div className='min-w-[80px] w-[8%] bg-moa-blue-dark text-center py-1 tablet:py-1.5 drop-shadow-lg rounded text-white text-[0.7em] font-bold hover:scale-[102%] hover:bg-moa-blue' onClick={onSubmit}>SUBMIT</div>
      </div>

    </div>
  )
}

export default GameReviewCreate