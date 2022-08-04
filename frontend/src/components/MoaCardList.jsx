import React from 'react'
import MoaCard from './MoaCard'

function MoaCardList(props) {
  const parties = props.parties;


  return (
    <>
      <div className='grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 laptop:gap-4 tablet:gap-2 mobile:gap-2'>
        {parties.map((party)=>{
          return (<MoaCard key={ party.partyId } party={party}></MoaCard>)
        })}
      </div>
    </>

  )
}

export default MoaCardList