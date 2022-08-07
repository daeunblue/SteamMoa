import React from 'react'
import { Link } from 'react-router-dom'

const GameReviewItem = (props) => {
  const {review} = props
  function leftPad(value) {
    if (value >= 10) {
        return value;
    }

    return `0${value}`;
  }

  function toStringByFormatting(source, delimiter = '.') {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);}

  const time = toStringByFormatting(new Date(review.currentDate))
  let starCol= ""
  if (review.reviewScore <3){
    starCol = "text-moa-blue"
  } else if (review.reviewScore<4){
    starCol = "text-moa-purple"
  } else{
    starCol = "text-moa-pink"
  }



  return (
    <div className='border rounded p-2 drop-shadow-lg my-1'>
      {/* 작성자+시간 */}
      <div>
        {/* 작성자 */}
        <Link to={`/profile/${review.userServiceId}`} className='text-xs text-center font-semibold hover:cursor-pointer'>{review.userServiceId}</Link>
        <span className='text-xs text-center'> | </span>
        {/* 시간 */}
        <span className='text-xs text-center'>{time}</span>
      </div>
      {/* 평점관련 */}
      <div className='flex items-center h-5 overflow-hidden mb-2'>
        {/* 별 */}
        <div className='mr-2'>
          {(review.reviewScore ? [...Array(Math.floor(review.reviewScore))].map((_, index)=>{
            return (
            <>
              <span className={`text-lg tablet:text-xl laptop:text-3xl ${starCol} align-text-center py-1`}>&#9733;</span>
            </>)
          }) : <></>)}
          {[...Array(5-Math.floor(review.reviewScore))].map((_, index)=>{
            return (
            <>
              <span className={`text-lg tablet:text-xl laptop:text-3xl text-searchbar-gray algitn-text-center py-1`}>&#9733;</span>
            </>)
          })}
        </div>
        <div className='text-xs pt-1 font-semibold'>{review.reviewScore}</div>
      </div>
      {/* content */}
      <div className='text-sm'>{review.reviewContent}</div>
    </div>
  )
}

export default GameReviewItem