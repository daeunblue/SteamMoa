import React from 'react'

function MoaCreateInput(props) {
    const MoaTitle = props.party.party_title;
    const MoaGameName = props.party.game_name;
    const MoaPlayer = props.party.max_player;
    const MoaStartTime = props.party.start_time;
    const MoaDescripttion = props.party.party_description;
    const MoaChatLink = props.party.chat_link;

  return (
    <div className='w-4/5 h-screen'>
        <input className="createInput-gray" type="text" />{MoaCreateInput}
        <label htmlFor="">플레이 게임</label>
        <input type="text" />{MoaGameName}
        <label htmlFor="">플레이 인원</label>
        <input type="text" />{MoaPlayer}
        <label htmlFor="">시작 시간</label>
        <input type="text" />
    </div>
  )
}

export default MoaCreateInput;