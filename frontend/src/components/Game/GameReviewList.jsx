import React, { useEffect, useState } from 'react'
import GameReviewCreate from './GameReviewCreate'
import GameReviewItem from './GameReviewItem'
import { useRecoilState } from "recoil";
import { auth } from "../../recoil/Auth";
import MiniPagination from '../MiniPagination'
import { getGameReviews, getUserHasReviews } from '../../api/Review'
import { useParams } from 'react-router-dom'
import { has, range } from 'lodash'


const GameReviewList = () => {
  const params = useParams()
  const gameId = params.game_id
  const [userAuth, ] = useRecoilState(auth);

  const [contentList, setContentList] = useState([])
  const [page, setPage] = useState(1)
  const [contentCnt, setContentCnt] = useState(0)
  const [totPage, setTotPage] = useState(0)
  const [viewablePages, setViewablePages] = useState([])
  const reviewsPerPage = 4
  const [showContents, setShowContents] = useState([])
  const [errMsg, setErrMsg] = useState('')
  const [rerender, setRerender] = useState(0)

  const [hasReview, setHasReview] = useState(false)
  const [isEditting, setIsEditting] = useState(false)


  useEffect(() => {
    getGameReviews(gameId)
      .then((res) => {
        console.log(res)
        setContentList(res.data.reviews)
        setErrMsg('')

      })
      .catch((err)=>{
        setErrMsg('리뷰가 존재하지 않습니다. 첫번째 리뷰를 작성해주세요 :)')
      })
    if (userAuth.isLoggedIn){
      getUserHasReviews(userAuth.userId, gameId).
        then((res) => {
          console.log(res)
          setHasReview(res.data.review)
        }).catch((err)=>{
          console.log(err)
        })

    }
    }, [gameId, rerender])

  useEffect(()=>{
    setContentCnt(contentList.length)
    setTotPage(Math.ceil(contentCnt/reviewsPerPage))
    setViewablePages((contentList.length ? [...range(1,Math.min(totPage,5)+1)]: []))
    
    }, [contentList, gameId, contentCnt, totPage])

  useEffect(()=>{
    const tmp = contentList.slice((page-1)*reviewsPerPage,page*reviewsPerPage)
    setShowContents(tmp)
  },[page, contentList,])


  return (
    <div className='p-4 w-full'>
      {(hasReview? 
        <div className='p-2'>
          <span>나의 리뷰</span>
          <GameReviewItem review={hasReview} setIsEditting={setIsEditting} setRerender={setRerender}/>
        </div>
        : <GameReviewCreate setRerender={setRerender} setIsEditting={setIsEditting} isEditting={isEditting} review={hasReview}></GameReviewCreate>)}

      <div className='my-5'>
        {(!contentList.length ? <div>{errMsg}</div>:<></>)}
        {showContents.map((review, index)=>{
          return(
            <GameReviewItem review={review} key={index}/>
          )
        })}
      </div>
      {(contentList.length ? 
        <MiniPagination setRerender={setRerender} totPage={totPage} page={page} viewablePages={viewablePages} setPage={setPage} setViewablePages={setViewablePages}/> : <></> )}
      
    </div>
  )
}

export default GameReviewList