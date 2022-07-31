import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import MiniMoa from '../components/MiniMoa'

const Main = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className='w-per75 m-auto'>
        {/* 배너 Carousel*/}
        <Banner></Banner>
        {/* 미니 모아 */}
        <MiniMoa></MiniMoa>
        {/* 게임존 */}
      </div>
    </>
    )
}

export default Main