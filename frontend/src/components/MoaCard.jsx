import React from 'react'
import {useNavigate} from 'react-router-dom'

function MoaCard(props) {
  const navigate = useNavigate();
  const partyId = props.party.party_id
  const partyStatus = props.party.party_status
  const gameTitle = props.party.game_name
  const gameImg = props.party.game_img
  const partyTitle = props.party.party_title
  const gameDate = props.party.start_time
  const curPlayer = props.party.cur_player
  const maxPlayer = props.party.max_player
  let statusColor = "bg-moa-green"

  if (partyStatus==='마감임박'){
    statusColor = "bg-moa-pink"
  } else if (partyStatus==='모집중'){
    statusColor = "bg-moa-green"
  } else if (partyStatus==='모집완료'){
    statusColor="bg-mainBtn-disabled"
  }

  const onClickCard = () => {
    console.log(1)
    //navigate('/moazone/detail/{party_id}')
  }
  return (
    <div id={partyId} className='flex flex-col bg-card-lightgray hover:cursor-pointer' onClick={onClickCard}>
      <img src={gameImg} alt="game image" />
      <div className='contentsContainer m-1.5'>
        <div className='flex mb-1'>
          <div className={`p-auto rounded flex justify-center items-center w-per25 text-xs font-blackSans text-white mr-2 ${statusColor}`}>
            <span>{partyStatus}</span>
          </div>
          <div className='font-blackSans text-base'>{partyTitle}</div>
        </div>
        <div className='font-blackSans text-xs my-1'>[{gameTitle}]</div>
        <div className='flex justify-between'>
          <span className='text-xs font-sans font-semibold'>~{gameDate}</span>
          <span className='text-xs font-sans  font-semibold'>{curPlayer}/{maxPlayer}</span>
        </div>
      </div>
    </div>
  )
}

export default MoaCard