import React from "react";
import MoaCard from "./MoaCard";

function MoaCardList(props) {
  const parties = props.moaList;

  return (
    <>
      <div className="w-full grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 laptop:gap-4 tablet:gap-2 mobile:gap-2">
        {parties.length ? (
          parties.map((party) => {
            return <MoaCard key={party.partyId} party={party}></MoaCard>;
          })
        ) : (
          <div className="text-white text-2xl mx-auto my-16 laptop:col-span-5 tablet:col-span-3">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </>
  );
}

export default MoaCardList;
