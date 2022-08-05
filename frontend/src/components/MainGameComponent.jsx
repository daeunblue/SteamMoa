import React from 'react'

const MainGameComponent = (props) => {
  const size = props.size
  const type = props.type
  let titlesize;
  if (size==='lg'){
    titlesize = "text-sm"
  } else {
    titlesize = "text-xs"
  }
  const game = {
      "gameId": 63,
      "gameName": "Alone Again: The Countryside",
      "gameTags": [
        "Action",
        "Strategy",
        "Indie",
        "Early Access"
      ],
      "gameImgpath": "https://cdn.akamai.steamstatic.com/steam/apps/9010/header.jpg?t=1573221747",
      "gameReviewScore": 100,
      "gamePrice": 11500
    }
    
  return (
    <div className='w-full flex h-[30%]'>
      <div className='overflow-hidden w-per20 relative pt-[20%] mr-2.5 rounded'>
        <img src={game.gameImgpath} alt="" className='drop-shadow-md object-cover h-full absolute top-0 left-0'/>
      </div>
      <div className='whitespace-nowrap text-ellipsis overflow-hidden text-white '>{game.gameName}</div>
      {/* <div className='w-full bg-mainBtn-disabled'>
        <div className={`font-Sans font-bold ${titlesize}`}>{game.gameName}</div>
        <div className='tags'>
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Default</span>
          <span class="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Dark</span>
          <span class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Red</span>
        </div>
      </div> */}
    </div>
  )
}

export default MainGameComponent