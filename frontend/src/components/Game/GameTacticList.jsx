import React, { useState } from 'react'
import GameTacticListItem from './GameTacticListItem';

const GameTacticList = (props) => {
  const tactics = props.tactic;

  return (
    <div>
      {tactics.map((tactic) => {
        <GameTacticListItem gameId={tactic.gameId} />
      })}
    </div>
  )
}

export default GameTacticList