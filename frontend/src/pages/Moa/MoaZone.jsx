import React from 'react'
import Navbar from '../../components/Navbar'
import SearchContainer from '../../components/SearchContainer'
import MoaCardList from '../../components/MoaCardList'

function MoaZone() {
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
  const parties = [party, party, party, party, party, party, party, party]
  
  return (
    <>
      <Navbar/>
      <img src="../../ImgAssets/MoaZone_Main.gif" alt="MoaZon Main" className='w-per75 m-auto' />
      <SearchContainer/>
      <div className='w-per75 m-auto'>
        <MoaCardList parties={parties}></MoaCardList>
        

      </div>
    </>
  )
}

export default MoaZone