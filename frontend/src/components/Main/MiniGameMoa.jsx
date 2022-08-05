import React from 'react'
import MainGameComponent from './MainGameComponent'
import {useState, useEffect} from 'react'

const MiniGameMoa = (props) => {
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

  if (!isMobile){
    return (
      <>
        <div className='w-full text-center font-Sans font-semibold text-lg tablet:text-xl laptop:text-2xl my-4 tablet:mt-6 miniGameMoa-neonText text-white'>GAME+</div>
        <hr className='bg-createInput-gray mb-2'/>
        <div className='grid grid-cols-5 gap-3'>
          <div className='col-span-2 p-2'>
            <div className='w-full h-full flex flex-col justify-between items-center'>
              <MainGameComponent/>
              <MainGameComponent/>
              <MainGameComponent/>
            </div>
    
          </div>
          <div className='col-span-3'>
            <img src="https://cdn.akamai.steamstatic.com/steam/apps/9010/header.jpg?t=1573221747" alt="" className='rounded w-full drop-shadow-md'/>
          </div>
        </div>
      
      </>
    )
  } else {
    return (
      <></>
    )
  }
}

export default MiniGameMoa