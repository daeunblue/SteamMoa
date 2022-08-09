import React, { useEffect, useState } from 'react'
import { getUserParty } from '../../api/User'
import { range, set } from 'lodash'
import MiniPagination from '../MiniPagination'
import MoaCard from '../MoaCard'
import { Link, useParams } from 'react-router-dom'

function ProfileMyParty(props) {
  const params = useParams
  const { profileName, isMyPage } = props
  const [render, setRender] = useState(1)
  const [contentList, setContentList] = useState([])
  const [page, setPage] = useState(1)
  const [contentCnt, setContentCnt] = useState(0)
  const [totPage, setTotPage] = useState(0)
  const [viewablePages, setViewablePages] = useState([])
  const reviewsPerPage = 6
  const [showContents, setShowContents] = useState([])
  const [rerender, setRerender] = useState(0) 

  const titleText = (isMyPage? 'MY':`${profileName}'s`)

  useEffect(
    ()=>{
      getUserParty(profileName)
        .then((res)=>{
          console.log(res)
          setContentList(res.data.parties)
          setRender(render=>render+1)
        }).catch((err) => {console.log(err)
        setRerender(rerender+1)})

    }, [isMyPage, params, rerender]
  )

  useEffect(()=>{
    setContentCnt(contentList.length)
    setTotPage(Math.ceil(contentCnt/reviewsPerPage))
    setViewablePages((contentList.length ? [...range(1,Math.min(totPage,5)+1)]: []))
    
    }, [contentList, contentCnt, totPage])

  useEffect(()=>{
    const tmp = contentList.slice((page-1)*reviewsPerPage,page*reviewsPerPage)
    setShowContents(tmp)
  },[page, contentList,rerender])

  return (
    <div className='my-10 flex flex-col justify-center'>
      {(!contentList.length&&!(render===1) ? 
        <div className='w-per90 flex flex-col justify-center drop-shadow-lg rounded-lg text-center bg-sidebar-dark mx-auto text-white font-semibold'>
          <div className="mb-2">아직 모은 파티가 없습니다.</div>
          {(isMyPage ? <div>지금 파티를 모으러 <Link to={'/moazone/create'} className="text-moa-pink font-bold text-lg">출발!</Link></div>: '')}
        </div>
        :
        // 컨텐츠
        <>
        <div className='text-center text-2xl text-white font-blackSans'>{titleText} Party</div>
         <div className='w-per90 mx-auto drop-shadow-lg rounded-lg py-7 px-5 bg-sidebar-dark my-5'>
          <div className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-2'>
            {showContents.map((party, index)=>{
              return(
                <MoaCard party={party} key={index}/>
              )
            })}
          </div>
        </div>
        {(contentList.length ? 
          <div className='flex justify-center'>
          <MiniPagination totPage={totPage} page={page} viewablePages={viewablePages} setPage={setPage} setViewablePages={setViewablePages}/>
          </div>
          : <></> )}
        </>)}    
    </div>

  )
}

export default ProfileMyParty