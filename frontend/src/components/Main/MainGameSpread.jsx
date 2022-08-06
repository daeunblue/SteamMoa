import React from 'react'
import { useNavigate } from 'react-router-dom'
import SquareGameComponent from './SquareGameComponent'

const MainGameSpread = (props) => {
  const navigate = useNavigate()
  const {bests, frees, today} = props
  const games = [...bests, ...frees, ...today]

  const onClickMore = ()=>{
    navigate('/gamemoa')
  }

  return (
    <div className='mt-10 tablet:mt-14'>
      <div className='flex justify-end text-white text-xs tablet:text-sm font-semibold hover:cursor-pointer hover:font-bold'
        onClick={onClickMore}>for MORE +</div>
      <div className='grid grid-cols-3 w-full p-3 bg-miniMoa-dark tablet:grid-cols-5 gap-x-2 gap-y-5 tablet:gap-y-7 mt-2'>
        {games.map((game, index)=>{
          return <SquareGameComponent game={game} key={index}/>
        })}
      </div>
    
    </div>
  )
}

export default MainGameSpread