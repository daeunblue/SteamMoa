import React, { useEffect, useState } from 'react'
import { getTacticGame } from '../../api/Tactic';

function GameTacticListItem(props) {

    // const { gameId } = props.gameId;
    const [ game, setGame ] = useState({
        'gameId': '',
        'tacticTitle': '',
        'tacticContent': '',
        'userId': '',
    });

    useEffect((e) => {
        getTacticGame(props.gameId)
        .then((res) => {
            console.log(res)
            setGame(res);
        });
    });
    
  return (
    <div>
        {/* 공략글 제목 */}
        <div>{game.tacticTitle}</div>
        {/* 공략글 내용 */}
        <div>{game.tacticContent}</div>
    </div>
  )
}

export default GameTacticListItem