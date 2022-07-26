import React from 'react'

function MoaCard(props) {
  // const tempGameImg = '../ImgAssets/TempGameImg.png'
  const partyId = props.party.party_id
  const partyStatus = props.party.party_status
  const gameTitle = props.party.game_name
  const gameImg = props.party.game_img
  const partyTitle = props.party.party_title
  const gameDate = props.party.start_time
  const curPlayer = props.party.cur_player
  const maxPlayer = props.party.max_player

  return (
    <div className='flex flex-col'>
      <img src={gameImg} alt="" />
      <div className='contentsContainer'>
        <div>
          <div className=''>모집상태</div>
          <div>{partyTitle}</div>
        </div>
        <div>[{gameTitle}]</div>
        <div>
          <span>~{gameDate}</span>
          <span>{curPlayer}/{maxPlayer}</span>
        </div>
      </div>
    </div>
  )
}

export default MoaCard