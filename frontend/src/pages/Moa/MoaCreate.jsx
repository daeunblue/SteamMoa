import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { moaCreate } from "../../api/Moazone";
import Swal from "sweetalert2";
import { auth } from "../../recoil/Auth";
import { useRecoilState } from "recoil";
import GameSearchModal from "../../components/GameSearchModal/GameSearchModal";
import { getGame } from "../../api/Game";

function MoaCreate() {
  const user = useRecoilState(auth);
  const userId = user[0].userId;
  const [game, setGame] = useState({});
  const [modalHidden, setModalHidden] = useState(true);
  const [isFiexedGame, setIsFixedGame] = useState(false);

  const [moa, setMoa] = useState({
    chatLink: "",
    gameId: 0,
    maxPlayer: 0,
    partyDescription: "",
    partyTags: [],
    partyTitle: "",
    startTime: new Date(+new Date() + 3240 * 10000).toISOString().replace(/\..*/, ''),
    userId: userId,
  });

  console.log(moa);
  // 파티 태그 요소 하드 코딩
  const [searchParams] = useSearchParams();
  const game_id = searchParams.get("game") ? searchParams.get("game") : null;

  const items = ["즐겜", "빡겜", "공략겜", "무지성겜", "친목겜"];

  const navigate = useNavigate();

  const [checkedList, setCheckedList] = useState([]);

  const onCheckedElement = (event) => {
    const { checked, value } = event.target;

    if (checked) {
      let newChk = [...checkedList];
      newChk.push(value);
      setCheckedList(newChk);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== value));
    }
  };

  const onRemove = (item) => {
    setCheckedList(checkedList.filter((el) => el !== item));
  };

  useEffect(() => {
    if (!userId) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "먼저 로그인을 해 주세요 &#128521",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/login`);
    }
    if (game_id) {
      getGame(game_id)
        .then(({ data }) => {
          if (!data) return;
          const { name, imgpath } = data;
          setGame({
            userServiceId: userId,
            gameId: game_id,
            gameName: name,
            gameImgPath: imgpath,
          });
          setIsFixedGame(true);
        })
        .catch(() => {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "해당 게임을 불러올 수 없습니다. &#128521",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(-1);
        });
    }
  }, []);

  useEffect(() => {
    setMoa({
      ...moa,
      partyTags: checkedList,
    });
  }, [checkedList]);

  // 데이터 변경사항 저장
  const onChange = (event) => {
    let { name, value } = event.target;
    if (name === "maxPlayer") value = Number(value);
    setMoa({
      ...moa,
      [name]: value,
    });
  };

  const onGameChange = (gameId) => {
    setMoa({
      ...moa,
      gameId: gameId,
    });
  };

  // 데이터 보내기
  const handleSubmit = (e) => {
    e.preventDefault();
    moaCreate({
      ...moa,
      gameId: game.gameId,
    }).then((data) => {
      if (data.status === 200) {
        navigate("/moazone");
      } else {
        alert(data.message);
      }
    });
  };

  const handleCancel = () => {
    navigate("/moazone");
  };

  const onToggleModal = () => {
    setModalHidden(!modalHidden);
  };


  return (
    <>
      <Navbar />
      <div className="w-per75 min-h-full m-auto text-white font-sans pb-5">
        <div className="m-auto">
          <img
            className="w-full"
            src="../../ImgAssets/MoaZone_CreateVer.gif"
            alt="모아존 글쓰기 배너 이미지"
          />
        </div>
        <div className="w-full my-2 bg-main-300 text-main-300">
          공간채우기 용도 글씨
        </div>
        <div className="m-auto h-full mb-2 bg-main-400">
          <div className="createContainer p-4">
            <div className="font-blackSans text-xl mb-3 ">모아글 작성</div>
            <input
              name="partyTitle"
              value={moa.partyTitle}
              onChange={onChange}
              className="w-full text-main-500 bg-createInput-gray rounded mb-3"
              type="text"
              placeholder="파티 모집 제목을 입력해주세요."
            />
            {/* 게임 아이디 찾기 */}
            <div className="mb-3 grid grid-cols-7 gap-2">
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
                  <div className="bg-createInput-gray text-createInput-gray border-solid border-stone-700 w-full h-full p-1 rounded">
                    **
                  </div>
                )}
              </div>
              <button
                disabled={isFiexedGame}
                className={`${
                  isFiexedGame
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-moa-pink hover:bg-moa-pink-dark"
                } laptop:col-span-1 tablet:col-span-2 mobile:col-span-3 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                onClick={onToggleModal}>
                게임 검색
              </button>
              {/* 모달 */}
              {isFiexedGame ? (
                ""
              ) : (
                <GameSearchModal hidden={modalHidden} setHidden={onToggleModal} setGame={setGame} />
              )}
            </div>
            <div className="grid grid-flow-col mb-3">
              <div className="grid grid-flow-col col-span-1 mx-2">
                <span className="col-span-1 flex items-center">플레이 인원</span>
                <input
                  name="maxPlayer"
                  value={moa.maxPlayer}
                  onChange={onChange}
                  type="number"
                  className="col-span-4 w-full text-main-500 bg-createInput-gray rounded"
                />
              </div>
              <div className="grid grid-flow-col col-span-2">
                <span className="col-span-1 flex justify-center items-center mr-2">시작시간</span>
                <div className="col-span-7">
                  <input
                    name="startTime"
                    value={moa.startTime}
                    onChange={onChange}
                    className="w-full text-main-500 bg-createInput-gray rounded"
                    type="datetime-local"
                    min={new Date(+new Date() + 3240 * 10000).toISOString().replace(/\..*/, '')}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <textarea
                name="partyDescription"
                value={moa.partyDescription}
                onChange={onChange}
                className="w-full text-main-500 bg-createInput-gray rounded"
                id=""
                cols=""
                rows="10"
                placeholder="모집 내용을 입력해주세요."></textarea>
            </div>
            <div className="grid grid-flow-col mb-8">
              <span className="col-span-1">음성 채팅 링크</span>
              <input
                name="chatLink"
                value={moa.chatLink}
                onChange={onChange}
                className="col-span-11 text-main-500 bg-createInput-gray w-full rounded"
                type="text"
                placeholder="파티원에게 공유할 채팅 링크를 입력해주세요."
              />
            </div>
            {/* 파티 태그 하드 코딩 */}
            <div className="grid grid-flow-col">
              <div className="col-span-1">파티 태그</div>
              <div>
                <div className="grid grid-flow-col">
                  {
                    items.map((item, index) => (
                      <div key={index}>
                        <input
                          checked={checkedList.includes(`${index + 1}`) ? true : false}
                          onChange={onCheckedElement}
                          value={index + 1}
                          id={item}
                          name={item}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={item}
                          className="ml-2 text-sm font-medium text-main-100 dark:text-gray-300">
                          {item}
                        </label>
                      </div>
                    ))
                    //  checkedList.includes(item.id)
                  }
                </div>
              </div>
            </div>
          </div>
        <div className="flex my-5">
          <div className="m-auto my-5">
            <button
              onClick={handleCancel}
              className="w-32 h-12 mx-3 bg-mainBtn-blue hover:bg-mainBtn-blue-hover rounded-lg text-sm">
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="w-32 h-12 mx-3 bg-moa-pink hover:bg-moa-pink-dark rounded-lg text-sm">
              파티 만들기
            </button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default MoaCreate;

