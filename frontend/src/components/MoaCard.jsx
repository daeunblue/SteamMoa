import React from "react";
import { useNavigate } from "react-router-dom";

function MoaCard(props) {
  const navigate = useNavigate();
  const { partyId, gameId, gameImgPath, gameName, partyTitle, maxPlayer, curPlayer, startTime, writeTime, status } = props.party;
  let statusColor = "bg-moa-green";

  if (status === "마감임박") {
    statusColor = "bg-moa-pink";
  } else if (status === "모집중") {
    statusColor = "bg-moa-green";
  } else {
    statusColor = "bg-mainBtn-disabled";
  }

  const onClickCard = () => {
    console.log(1);
    //navigate('/moazone/detail/{party_id}')
  };
  return (
    <div
      id={partyId}
      className="flex flex-col bg-card-lightgray hover:cursor-pointer"
      onClick={onClickCard}>
      <img src={gameImgPath} alt="game image" />
      <div className="contentsContainer m-1.5">
        <div className="flex mb-1">
          <div
            className={`p-auto rounded flex justify-center items-center w-per25 text-xs font-blackSans text-white mr-2 ${statusColor}`}>
            <span>{status}</span>
          </div>
          <div className="font-blackSans text-base">{partyTitle}</div>
        </div>
        <div className="font-blackSans text-xs my-1">[{gameName}]</div>
        <div className="flex justify-between">
          <span className="text-xs font-sans font-semibold">~{startTime}</span>
          <span className="text-xs font-sans  font-semibold">
            {curPlayer}/{maxPlayer}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MoaCard;
