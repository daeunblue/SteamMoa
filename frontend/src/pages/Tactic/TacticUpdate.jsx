import React, { useCallback, useEffect, useState } from "react";
import GameSearchModal from "../../components/GameSearchModal/GameSearchModal";
import Navbar from "../../components/Navbar";
import { auth } from "../../recoil/Auth";
import { useRecoilValue } from "recoil";
import { postTactics } from "../../api/Tactic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TacticUpdate = () => {
  const navigate = useNavigate();
  const [tacticTitle, setTacticTitle] = useState("");
  const [tacticContent, setTacticContent] = useState("");
  const [game, setGame] = useState({});
  const [modalHidden, setModalHidden] = useState(true);

  const user = useRecoilValue(auth);
  const { userId } = user;

  useEffect(() => {
    if (!userId) { 
      Swal.fire({
        position: "center",
        icon: "error",
        title: "잘못된 접근입니다! &#128529",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/`);
    } else {
        //get
    }
  },[]);

  const handleChangeTitle = useCallback(
    (e) => {
      setTacticTitle(e.target.value);
    },
    [tacticTitle]
  );

  const handleChangeContents = (e) => {
    setTacticContent(e.target.value);
  };

  const onToggleModal = () => {
    setModalHidden(!modalHidden);
  };

  const check = () => {
    if (tacticTitle || tacticContent || game.gameId || userId) return true;
    return false;
  };

  const onClickUpload = () => {
    const tactic = {
      gameId: game.gameId,
      tacticContent: tacticContent,
      tacticTitle: tacticTitle,
      userServiceId: userId,
    };

    if (!tactic.gameId || !tactic.tacticTitle || !tactic.tacticContent) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "제목, 게임, 공략글을 작성해주세요 &#129394",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (!tactic.userServiceId) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "잘못된 접근입니다! &#128529",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    postTactics(tactic)
      .then(({ data }) => {
        const { msg } = data;
        if (msg === "Success") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "공략글 업로드 성공! &#128521",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(`/gamemoa/detail/${tactic.gameId}`);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "공략글 업로드 실패... &#129394",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch();
  };

  return (
    <div className="w-full min-h-full">
      <Navbar />
      <div className="w-per75 min-h-full mx-auto my-5 rounded flex flex-col">
        <div className="w-full h-full bg-main-300 mb-2 text-main-300">**</div>
        <div className="w-full h-full m-aut p-5 mb-2 bg-main-400">
          <input
            id="tacticTitle"
            onChange={handleChangeTitle}
            className="w-full text-main-500 bg-createInput-gray text-lg rounded p-1 px-2 mb-2"
            placeholder="공략글 제목을 작성해주세요"
          />
          {/* 게임 아이디 찾기 */}
          <div className="grid grid-cols-7 gap-2">
            <div className="laptop:col-span-6 tablet:col-span-5 mobile:col-span-4">
              {game.gameId ? (
                <div className="w-full max-h-10 border-solid border-stone-700 bg-createInput-gray rounded flex p-1">
                  <img
                    src={game.gameImgPath}
                    alt="게임 이미지"
                    className="laptop:w-per10 tablet:w-per30 mobile:w-per50 rounded"
                  />
                  <span className="laptop:w-per90 tablet:w-per70 mobile:w-per50 whitespace-nowrap p-1.5 text-gray-900 align-center pt-1 overflow-hidden text-ellipsis">
                    {game.gameName}
                  </span>
                </div>
              ) : (
                <div className="bg-white text-white border-solid border-stone-700 w-full h-full p-1 rounded">
                  **
                </div>
              )}
            </div>
            <button
              className="laptop:col-span-1 tablet:col-span-2 mobile:col-span-3 text-white bg-moa-pink hover:bg-moa-pink-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={onToggleModal}>
              게임 검색
            </button>
            {/* 모달 */}
            <GameSearchModal hidden={modalHidden} setHidden={onToggleModal} setGame={setGame} />
          </div>
          <div className="flex flex-col justify-start items-start mt-2">
            <label htmlFor="tacticContent" className="text-white text-lg font-semibold">
              공략글 내용
            </label>
            <textarea
              className="w-full h-[32rem] bg-createInput-gray rounded"
              id="tacticContent"
              placeholder="공략글을 작성해 주세요."
              onChange={handleChangeContents}></textarea>
          </div>
          <div className="flex justify-center mt-4">
            <button className="mr-2 text-white bg-gray-500 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              취소
            </button>
            <button
              onClick={onClickUpload}
              className={`text-white bg-moa-pink hover:bg-moa-pink-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
              업로드
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticUpdate;
