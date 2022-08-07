import React from 'react'
import MainGameComponent from './MainGameComponent'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const MiniGameMoa = (props) => {
  const navigate = useNavigate()
  const {bests, frees, today} = props

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640 ? true:false)

  
  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }
  useEffect(()=>{
    window.addEventListener("resize", handleResize)
  }, 
  [isMobile]
  )

  const onClickToday = ()=>{
    navigate(`/gamemoa/detail/${today[14].gameId}`)
  }

  if (!isMobile){
    return (
      <>
        <div className='w-full text-center font-Sans font-semibold text-lg tablet:text-xl laptop:text-2xl my-4 tablet:mt-6 miniGameMoa-neonText text-white'>GAME+</div>
        <hr className='bg-createInput-gray mb-3'/>
        <div className='grid grid-cols-5 gap-2'>
          <div className='col-span-2 py-2 px-3'>
            <div className='w-full h-full flex flex-col justify-between items-center'>
              {bests.length ?<MainGameComponent game={bests[Math.floor(Math.random() * 15)]} type="best"/>:''}
              {frees.length ?<MainGameComponent game={frees[Math.floor(Math.random() * 15)]} type="free"/>:''}
              {today.length ?<MainGameComponent game={today[Math.floor(Math.random() * 14)]} type="today"/>:''}
            </div>
    
          </div>
          <div className='col-span-3'>
            {today.length ? <img src={today[14].gameImgpath} alt="" className='rounded w-full drop-shadow-md hover:cursor-pointer' onClick={onClickToday}/> : ""}
          </div>
        </div>
      
      </>
    )
  } else {
    return (
      <>
        <div className='w-full text-center font-Sans font-semibold text-lg tablet:text-xl laptop:text-2xl my-4 tablet:mt-6 miniGameMoa-neonText text-white'>GAME+</div>
        <hr className='bg-createInput-gray mb-3'/>
        <div className='w-full'>
          {today.length ? <img src={today[14].gameImgpath} alt="" className='rounded w-full drop-shadow-md hover:cursor-pointer' onClick={onClickToday}/> : ""}
        </div>
      
      </>
    )
  }
}

export default MiniGameMoa