import React from "react";
import { useNavigate } from "react-router-dom";

function MoaCard(props) {
  const navigate = useNavigate();
  const {
    partyId,
    gameImgPath,
    gameName,
    partyTitle,
    maxPlayer,
    curPlayer,
    startTime,
    partyIsUrgent,
    partyStatus,
  } = props.party;

  console.log(props.party.partyId);

  let bgColors = [
    "bg-moa-pink",
    "bg-moa-green",
    "bg-mainBtn-disabled",
    "moa-yellow",
    "bg-moa-purple",
    "bg-mainBtn-disabled",
  ];
  let statusMsg = ["마감임박", "모집중", "모집완료", "게임중", "게임완료", "모집실패"];

  const formatTime = () => {
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const dateTime = startTime.split("T");
    const date = dateTime[0].split("-");
    const month = date[1].startsWith("0") ? date[1].charAt(1) : date[1];
    const day = date[2].startsWith("0") ? date[2].charAt(1) : date[2];
    let dayOfWeek = week[new Date(dateTime[0]).getDay()];
    const result = `~ ${date[0]}.${month}.${day}.(${dayOfWeek}) ${dateTime[1]}`;
    return result;
  };

  const onClickCard = () => {
    // navigate(`/moazone/detail/${partyId}`);
    navigate(`/moazone/detail/${partyId}`);
  };
  return (
    <div
      id={partyId}
      className="flex flex-col opacity-90 bg-card-lightgray hover:cursor-pointer hover:opacity-100"
      onClick={onClickCard}>
      <img src={gameImgPath} alt="게임이미지" />
      <div className="flex flex-col justify-between m-2">
        <div className="flex">
          <div
            className={`p-auto rounded flex justify-center items-center w-per25 text-xs font-blackSans text-white mr-2 ${
              partyIsUrgent ? bgColors[0] : bgColors[partyStatus]
            }`}>
            <span>{partyIsUrgent ? statusMsg[0] : statusMsg[partyStatus]}</span>
          </div>

          <div className="font-blackSans text-base whitespace-nowrap overflow-hidden text-ellipsis">{partyTitle}</div>
        </div>
        <div className=" font-blackSans text-xs my-1 whitespace-nowrap overflow-hidden text-ellipsis">[{gameName}]</div>
        <div className=" flex justify-between">
          <span className="text-xs font-sans font-semibold">{formatTime()}</span>
          <span className="text-xs font-sans  font-semibold">
            {curPlayer}/{maxPlayer}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MoaCard;