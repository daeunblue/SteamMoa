import React from 'react'
import MoaCard from '../../components/MoaCard'

function MoaZone() {
  const party = {
    'party_id':1234567,
    'party_status': '모집중',
    'game_name': 'Goose Goose Duck',
    'game_img': 'https://sysrqmts.com/images/games/goose-goose-duck.jpg',
    'party_title': '구스구스덕 12인팟',
    'start_time': '2022.07.10',
    'cur_player': 10,
    'max_player': 12,
  }
  
  return (
    <>
      <MoaCard party={party}></MoaCard>
    </>
  )
}

export default MoaZone