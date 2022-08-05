import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

import Banner from '../components/Main/Banner'
import MiniMoa from '../components/Main/MiniMoa'
import MiniGameMoa from '../components/Main/MiniGameMoa'
import { getMainInfo } from '../api/Main'


const Main = () => {
  const [parties, setParties] = useState([]);
  const [bestGames, setBestGames] = useState([]);
  const [freeGames, setFreeGames] = useState([]);
  const [todayGames, setTodayGames] = useState([]);

  useEffect(
    ()=>{
      getMainInfo()
        .then((res)=> {
          console.log(res)
          setParties([...res.data.parties])
          setBestGames([...res.data.bests])
          setFreeGames([...res.data.frees])
          setTodayGames([...res.data.today])
        }).catch((err)=>{
          console.log(err)
        })
    }, []
  )

  return (
    <>
      <Navbar></Navbar>
      <div className='w-per75 m-auto'>
        {/* 배너 Carousel*/}
        <Banner/>
        {/* 미니 모아 */}
        <MiniMoa parties={parties}/>
        {/* 게임존 */}
        <MiniGameMoa bests={bestGames} frees={freeGames} today={todayGames}/>
      </div>

      <div className='h-20'></div>
    </>
    )
}

export default Main