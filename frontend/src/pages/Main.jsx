import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'

const Main = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className='w-per75 m-auto'>
        {/* 배너 Carousel*/}
        <Banner></Banner>
        {/* 미니 모아 */}
        {/* 게임존 */}
      </div>
    </>
    )
}

export default Main