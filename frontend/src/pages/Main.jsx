import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Main/Banner'
import MiniMoa from '../components/Main/MiniMoa'
import MiniGameMoa from '../components/Main/MiniGameMoa'
// import axios from 'axios's

const Main = () => {
  // useEffect(
  //   axios({
  //     url: 'http://i7a303.p.ssafy.io:8080/v2/api/main', // 통신할 웹문서
  //     method: 'get', // 통신 방식
  //   }).then((res) => {
  //     const parties = res.parties
  //     const bestGames = res.bests
  //     const freeGames = res.frees
  //     const todayGames = res.today
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  // )

  return (
    <>
      <Navbar></Navbar>
      <div className='w-per75 m-auto'>
        {/* 배너 Carousel*/}
        <Banner></Banner>
        {/* 미니 모아 */}
        <MiniMoa></MiniMoa>
        {/* 게임존 */}
        <MiniGameMoa></MiniGameMoa>
      </div>

      <div className='h-20'></div>
    </>
    )
}

export default Main