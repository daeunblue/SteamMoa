import React from 'react'
import { useRecoilState } from "recoil";
import { auth } from "../../recoil/Auth";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'
import { deleteReviews } from '../../api/Review';


const GameReviewItem = (props) => {
  const {review, setRerender} = props
  const [userAuth, ] = useRecoilState(auth);
  const isMine = (review.userServiceId === userAuth.userId)
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

  const onDelete = () => {
    Swal.fire({
      width:300,
      text: '리뷰를 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: '#FA448C',
      cancelButtonColor: '#A9ACB1',
      confirmButtonText: 'OK',
      cancelButtonText: 'NO',
      customClass: {
        confirmButton: 'btn bg-moa-pink px-4 py-0.5 mr-3 rounded text-white text-lg',
        cancelButton: 'btn bg-mainBtn-disabled px-4 py-0.5 rounded text-white text-lg'
      },
      buttonsStyling: false
    })
      .then((res) => {
        if (res.isConfirmed){
          deleteReviews(review.reviewId)
            .then((res)=> {setRerender(rerender => rerender+1)})
            .catch((err)=>{console.log(err)})
        } 
      }) .catch((err) =>{
        console.log(err)
      }
      )
  
  }

  const onEdit = () => {

  }

  return (
    <div className='border rounded p-3 drop-shadow-lg my-1'>
      {/* 작성자+시간 */}
      <div className='w-full flex justify-between'>
        {/* 작성자 */}
        <div>
          <Link to={`/profile/${review.userServiceId}`} className='text-xs text-center font-semibold hover:cursor-pointer'>{review.userServiceId}</Link>
          <span className='text-xs text-center'> | </span>
          {/* 시간 */}
          <span className='text-xs text-center'>{time}</span>
        </div>
        {(isMine ? 
          <div>
            <FontAwesomeIcon
              icon={faPencil}
              onClick={onEdit}
              className="w-3 h-3 text-center text-gray-500 hover:text-gray-800 mr-2"
              />
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={onDelete}
              className="w-3 h-3 text-center text-gray-500 hover:text-gray-800"
              />
          </div>: '')}
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