import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import MoaCard from './MoaCard';
import '../assets/neon.css'


const MiniMoa = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640 ? true:false)
  
  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 640) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }
  const [index, setIndex] = useState(0);
  useEffect(()=>{
    window.addEventListener("resize", handleResize)
  }  , 
  [index, isMobile]
  )

  const party = {
    'party_id':1234567,
    'party_status': '마감임박',
    'game_name': 'Goose Goose Duck',
    'game_img': 'https://sysrqmts.com/images/games/goose-goose-duck.jpg',
    'party_title': '구스구스덕 12인팟',
    'start_time': '2022.07.10',
    'cur_player': 10,
    'max_player': 12,
  }
  const party1 = {
    'party_id':1234567,
    'party_status': '마감임박',
    'game_name': 'Goose Goose Duck',
    'game_img': 'https://cdn.akamai.steamstatic.com/steam/apps/1426210/header_koreana.jpg?t=1654700680',
    'party_title': '구스구스덕 12인팟',
    'start_time': '2022.07.10',
    'cur_player': 10,
    'max_player': 12,
  }
  const parties = [party, party, party, party1, party1, party1, party, party, party, party1, party1, party1, party, party, party, ]
 
  return (
    <div className='mini-moa bg-miniMoa-dark rounded flex justify-center items-center mt-8 tablet:mt-12'>
      <div 
        className='w-10 tablet:w-14 laptop:w-16 hover:cursor-pointer text-center'
        onClick={() => {
          if (index===4){
            setIndex(0);
          } else {
            setIndex(index+1);
          }
        }}>
        <FontAwesomeIcon icon={faChevronLeft} className='text-white mobile:text-xl tablet:text-2xl laptop:text-3xl'/>
      </div>
      <div className='mini-moa-content flex flex-col justify-around items-center w-per80 tablet:w-per95'>
        <div className='font-Sans font-semibold text-lg tablet:text-xl laptop:text-2xl my-3 tablet:my-6 miniMoa-neonText text-white'>MOA PARTY</div>
        <div className='carousel-container w-full overflow-hidden mb-3 tablet:mb-6'>
          <div
            className='carousel-items w-per500 flex ease-in duration-700'
            // translate3d() 메소드는 현재 위치에서 해당 요소를 주어진 x축과 y축, z축의 거리만큼 이동시킵니다.
            style={{transform: `translate3d(${-index*20}%,0,0)`}}
            >
            { [...Array(5)].map((_, index) => {
              if (isMobile) {
                  return(
                      <MoaCard party={parties[index]} key={index}></MoaCard>
                  )
                } else {
                  
                  return(
                  <div className='flex w-full grid grid-cols-3 gap-1' key={index}>
                    {[...Array(3)].map((_, idx)=>{
                      {console.log(3*index+idx)}
                      return(
                      <MoaCard party={parties[3*index+idx]} key={3*index+idx}></MoaCard>)
                    })}
                  </div>
                  )
              }
            })}
          </div>
          <div className="slideshowDots flex justify-center mt-2">
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className={index === idx ? " rounded-full w-1.5 h-1.5 bg-gray-500 mx-1" : "rounded-full w-1.5 h-1.5 bg-white mx-1"}
                onClick={() => {
                  setIndex(idx);
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div 
        className='w-10 tablet:w-14 laptop:w-16 hover:cursor-pointer text-center'
        onClick={() => {
          if (index===4){
            setIndex(0);
          } else {
            setIndex(index+1);
          }
        }}>
      <FontAwesomeIcon icon={faChevronRight} className='text-white mobile:text-xl tablet:text-2xl laptop:text-3xl'/>
      </div>

    </div>
  )
}

export default MiniMoa