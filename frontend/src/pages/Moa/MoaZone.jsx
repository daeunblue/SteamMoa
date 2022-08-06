import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MoaSearchContainer from "../../components/Moa/MoaSearchContainer";
import MoaCardList from "../../components/MoaCardList";
import MoaPagination from "../../components/Moa/MoaPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChampagneGlasses } from "@fortawesome/free-solid-svg-icons";
import { getMoaListSearch } from "../../api/Moazone";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { moaMaxPage, moaPage, moaSearchWord, moaSearchSort, moaSearchFilter } from "../../recoil/Moazone";
import { useNavigate } from "react-router-dom";

function MoaZone() {
  const navigate = useNavigate();
  const [moaList, setMoaList] = useState([]);
  const page = useRecoilValue(moaPage);
  const setMaxPage = useSetRecoilState(moaMaxPage);
  const searchWord = useRecoilValue(moaSearchWord);
  const searchSort = useRecoilValue(moaSearchSort);
  const searchFilter = useRecoilValue(moaSearchFilter);

  useEffect(() => {
    getMoaListSearch(page, searchWord, searchSort, searchFilter)
      .then(({ data }) => {
        setMoaList([...data.data]);
        setMaxPage(parseInt(data.maxPage));
      })
      .catch();
  }, [page]);

  const handleNavigate = () => {
    navigate(`/moazone/create`);
  };

  return (
    <div>
      <Navbar />
      {/* 모아존 배너 */}
      <img src="../../ImgAssets/MoaZone_Main.gif" alt="MoaZon Main" className="w-per75 m-auto" />
      {/* 검색 컨테이너 */}
      <MoaSearchContainer setMoaList={setMoaList} />
      {/* 모아 만들기 버튼 */}
      <div className="w-per75 mx-auto my-3 flex justify-end">
        <button
          className=" bg-moa-pink hover:bg-moa-pink-dark text-white rounded-lg px-2 py-1 text-xs"
          onClick={handleNavigate}>
          <FontAwesomeIcon icon={faChampagneGlasses} className="mr-1" />
          파티 만들기
        </button>
      </div>
      {/* 모아 리스트 */}
      <div className="w-per75 m-auto">
        <MoaCardList moaList={moaList}></MoaCardList>
      </div>
      {/* 페이지네이션 */}
      <div className="w-per75 m-auto flex justify-center py-5">
        <MoaPagination setMoaList={setMoaList} />
      </div>
    </div>
  );
}

export default MoaZone;