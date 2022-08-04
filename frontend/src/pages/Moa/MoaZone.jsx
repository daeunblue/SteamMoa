import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MoaSearchContainer from "../../components/Moa/MoaSearchContainer";
import MoaCardList from "../../components/MoaCardList";
import MoaPagination from "../../components/Moa/MoaPagination";
import { getMoaListSearch } from "../../api/Moazone";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { moaMaxPage, moaPage } from "../../recoil/Moazone";

function MoaZone() {
  const [moaList, setMoaList] = useState([
    {
      partyId: 1,
      gameId: 12858,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg?t=1654259241",
      gameName: "ELDEN RING",
      partyTitle: "빨리 모여라~",
      maxPlayer: 3,
      curPlayer: 1,
      startTime: "2021-08-08 02:44:30.327959",
      writeTime: "2022-08-03 07:03:56.087559",
      status: "2",
    },
    {
      partyId: 2,
      gameId: 33992,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/373420/header.jpg?t=1589968419",
      gameName: "Divinity: Original Sin - Enhanced Edition",
      partyTitle: "한판만",
      maxPlayer: 4,
      curPlayer: 1,
      startTime: "2021-08-09 02:44:30.327959",
      writeTime: "2022-08-04 07:09:46.807443",
      status: "2",
    },
    {
      partyId: 3,
      gameId: 15790,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg?t=1656615305",
      gameName: "Red Dead Redemption 2",
      partyTitle: "들어오셈",
      maxPlayer: 5,
      curPlayer: 1,
      startTime: "2021-08-10 02:48:30.327959",
      writeTime: "2022-08-04 07:14:14.634554",
      status: "2",
    },
    {
      partyId: 4,
      gameId: 12665,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1250410/header.jpg?t=1655148097",
      gameName: "Microsoft Flight Simulator Game of the Year Edition",
      partyTitle: "세판쫑",
      maxPlayer: 4,
      curPlayer: 1,
      startTime: "2021-08-11 03:34:30.327959",
      writeTime: "2022-08-03 07:14:19.059434",
      status: "2",
    },
    {
      partyId: 5,
      gameId: 16474,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1158310/header.jpg?t=1655466184",
      gameName: "Crusader Kings III",
      partyTitle: "생존겜ㄱㄱ",
      maxPlayer: 4,
      curPlayer: 1,
      startTime: "2021-08-12 04:44:30.327959",
      writeTime: "2022-08-03 07:15:27.459654",
      status: "2",
    },
    {
      partyId: 6,
      gameId: 12858,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg?t=1654259241",
      gameName: "ELDEN RING",
      partyTitle: "파티 1분 모집해요",
      maxPlayer: 3,
      curPlayer: 1,
      startTime: "2021-08-08 02:37:30.327959",
      writeTime: "2022-08-03 07:03:56.087559",
      status: "2",
    },
    {
      partyId: 7,
      gameId: 33992,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/373420/header.jpg?t=1589968419",
      gameName: "Divinity: Original Sin - Enhanced Edition",
      partyTitle: "40 키캐릭 있어용",
      maxPlayer: 4,
      curPlayer: 1,
      startTime: "2021-08-09 02:44:30.327959",
      writeTime: "2022-08-04 07:09:46.807443",
      status: "2",
    },
    {
      partyId: 8,
      gameId: 13084,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1238820/header.jpg?t=1614945737",
      gameName: "Battlefield 3™",
      partyTitle: "무엇이든 도와드립니다",
      maxPlayer: 5,
      curPlayer: 1,
      startTime: "2021-08-10 02:44:30.327959",
      writeTime: "2022-08-04 07:14:14.634554",
      status: "2",
    },
    {
      partyId: 9,
      gameId: 13084,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1238820/header.jpg?t=1614945737",
      gameName: "Battlefield 3™",
      partyTitle: "기사분 모십니다.",
      maxPlayer: 4,
      curPlayer: 1,
      startTime: "2021-08-10 02:34:30.327959",
      writeTime: "2022-08-03 07:14:19.059434",
      status: "2",
    },
    {
      partyId: 10,
      gameId: 13084,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1238820/header.jpg?t=1614945737",
      gameName: "Battlefield 3™",
      partyTitle: "인원모집~",
      maxPlayer: 4,
      curPlayer: 1,
      startTime: "2021-08-12 06:29:30.327959",
      writeTime: "2022-08-03 07:15:27.459654",
      status: "2",
    },
    {
      partyId: 11,
      gameId: 13084,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1238820/header.jpg?t=1614945737",
      gameName: "Battlefield 3™",
      partyTitle: "1~4까지 밀어주실분!",
      maxPlayer: 3,
      curPlayer: 1,
      startTime: "2021-08-08 02:44:30.327959",
      writeTime: "2022-08-03 07:03:56.087559",
      status: "2",
    },
    {
      partyId: 12,
      gameId: 15364,
      gameImgPath: "https://cdn.akamai.steamstatic.com/steam/apps/1184480/header.jpg?t=1655372474",
      gameName: "Inertial Drift",
      partyTitle: "돠주실분 구해요",
      maxPlayer: 4,
      curPlayer: 1,
      startTime: "2021-08-09 07:44:30.327959",
      writeTime: "2022-08-04 07:09:46.807443",
      status: "2",
    },
  ]);
  const page = useRecoilValue(moaPage);
  const setMaxPage = useSetRecoilState(moaMaxPage);

  // useEffect(() => {
  //   getMoaListSearch()
  //     .then(({ data }) => {
  //       setMoaList([...data.data]);
  //       setMaxPage(parseInt(data.maxPage));
  //     })
  //     .catch();
  // }, []);
  
  return (
    <div>
      <Navbar />
      {/* 모아존 배너 */}
      <img src="../../ImgAssets/MoaZone_Main.gif" alt="MoaZon Main" className="w-per75 m-auto" />
      {/* 검색 컨테이너 */}
      <MoaSearchContainer />
      {/* 개임 리스트 */}
      <div className="w-per75 m-auto">
        <MoaCardList parties={moaList}></MoaCardList>
      </div>
      {/* 페이지네이션 */}
      <div className="w-per75 m-auto flex justify-center py-5">
        <MoaPagination setMoaList={setMoaList} />
      </div>
    </div>
  );
}

export default MoaZone;
