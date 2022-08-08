import React, { useEffect, useState } from 'react'
import GameReviewCreate from './GameReviewCreate'
import GameReviewItem from './GameReviewItem'
import { getGameReviews } from '../../api/Review'
import { useParams } from 'react-router-dom'
import { range } from 'lodash'


const GameReviewList = () => {
  const params = useParams()
  const gameId = params.game_id
  const [reviewList, setReviewList] = useState([])
  const [reviewPage, setReviewPage] = useState(1)
  const [reviewCnt, setReviewCnt] = useState(0)
  const [totPage, setTotPage] = useState(0)
  const [viewablePages, setViewablePages] = useState([])
  const reviewsPerPage = 1
  const [showReviews, setShowReviews] = useState([])


  useEffect(() => {
    getGameReviews(gameId)
      .then((res) => {
        console.log(res)
        setReviewList(res.data.reviews)
      })
      .catch((err)=>{
        console.log(err)
      })
    }, [gameId])

  useEffect(()=>{
    setReviewCnt(reviewList.length)
    setTotPage(Math.ceil(reviewCnt/reviewsPerPage))
    setViewablePages((reviewList.length ? [...range(1,Math.min(totPage,5)+1)]: []))
    
    }, [reviewList, gameId, reviewCnt, totPage])

  useEffect(()=>{
    const tmp = reviewList.splice((reviewPage-1)*reviewsPerPage+1,reviewPage*reviewsPerPage+1)
    setShowReviews(tmp)
  },[reviewPage, reviewList])


  const onClickItem = (e) =>{
    const val = e.target.value
    const view = (Math.ceil(val/5)-1) * 5
    setReviewPage(val)
    setViewablePages(range(view+1,totPage+1))
  }

  return (
    <div className='p-4 w-full'>
      <GameReviewCreate></GameReviewCreate>

      <div>
        {showReviews.map((review, index)=>{
          return(
            <GameReviewItem review={review} key={index}/>
          )
        })}
      </div>

      {/* pagination */}
      <div id='pagination'
        className="w-per35 flex justify-between">
          {viewablePages.map((item, index)=>{
            return(
            <li
            value={item}
            key={index}
            onClick={onClickItem}
            className={`${
              reviewPage===item ? "bg-main-300" : ""
            } w-7 h-7  text-lg text-center list-none inline-block rounded-full hover:bg-main-100 hover:text-main-500`}
            >
              {item}
            </li>             
            )
          })}


      </div>
    </div>
  )
}

export default GameReviewList