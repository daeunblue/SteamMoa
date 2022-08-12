import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { moaDelete, moaUpdate } from "../../api/Moazone";
import MoaUserCard from "../../components/Moa/MoaUserCard";
import { moaDetail } from "../../api/Moazone";
import Swal from "sweetalert2";

const MoaUpdate = (props) => {

  const navigate = useNavigate();
  const params = useParams();
  const partyId = params.party_id;
  const [moa, setMoa] = useState({});

  const [updateMoa, setUpdateMoa] = useState({
    partyDescription: "",
    chatLink: "",
    partyTags: [],
    partyStatus: "",
    partyUsers: [],
  });

  console.log("moa: ", moa);
  console.log("updateMoa는: ", updateMoa);

  const items = ["즐겜", "빡겜", "공략겜", "무지성겜", "친목겜"];
  const [checkedList, setCheckedList] = useState([]);
  console.log("updateMoa는: ", updateMoa);
  console.log("checkedList: ", checkedList);

  const onCheckedElement = (event) => {
    const { checked, value } = event.target;

    if (checked) {
      let newChk = [...checkedList];
      newChk.push(value);
      setCheckedList(newChk);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== value));
    }
    // setMoa({...moa,partyTags: checkedList });
  };

  const onRemove = (item) => {
    console.log(item);
    setCheckedList(checkedList.filter((el) => el !== item));
  };

  

  const onChange = (event) => {
    let { name, value } = event.target;
    if (name === "partyTags") {
      value = [...updateMoa.partyTags, value];
      console.log(value);
    }
    setUpdateMoa({
      ...updateMoa,
      [name]: value,
    });
  };

  // 수정된 데이터 보내서 저장
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("수정 완료 버튼 클릭시 : ", updateMoa);
    moaUpdate(updateMoa, partyId).then((res) => {
      if (res.status === 200) {
        navigate(`/moazone/detail/${moa.partyId}`);
      } else {
        alert(res.data.message);
      }
    });
  };

  const handleCancel = () => {
    navigate(`/`);
  };

  // 파티 삭제
  const handleDeleteParty = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "모아글을 정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네. 삭제할래요",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        moaDelete(partyId)
        .then((res) => {
          if (res.status === 200) {
            console.log("삭제됨", moa.partyId);
            navigate(`/moazone`);
          }
        });
      }
    });
  };

  useEffect((e) => {
    moaDetail(partyId).then(({ data }) => {
      setMoa(data);
      console.log(data.partyPlayers);
      console.log(data.partyPlayers[0].userId);
      setUpdateMoa({
        ...updateMoa,
        partyDescription: data.partyDescription,
        chatLink: data.chatLink,
        partyTags: data.partyTags,
        partyStatus: data.partyStatus,
        partyUsers: [data.partyPlayers[0].userId],
      });
      setCheckedList(() => {
        const list = [];
        data.partyTags.forEach((tag) => {
          const idx = items.findIndex((item) => item === tag);
          list.push(`${idx + 1}`);
        });
        return list;
      });
    });
  }, []);

  useEffect(() => {
    setUpdateMoa({
      ...updateMoa,
      partyTags: checkedList,
    });
  }, [checkedList]);

  return (
    <>
      <Navbar />
      <div className="w-per75 min-h-full m-auto text-white font-sans pb-5">
        <div className="m-auto">
          <img
            className="w-full"
            src="../../ImgAssets/MoaZone_UpdateVer.gif"
            alt="모아존 글수정 배너 이미지"
          />
        </div>
        <div className="w-full my-2 bg-main-300 text-main-300">
          공간채우기 용도 글씨
        </div>
        <form>
          <div className="m-auto h-full mb-2 bg-main-400">
            <div className="createContainer p-4">
              <div className="mb-3 flex justify-between">
                <div className="font-blackSans text-xl ">모아글 수정</div>
                <button className="bg-moa-purple hover:bg-moa-purple-dark rounded py-2 px-4 text-center" onClick={handleDeleteParty}>
                  모아글 삭제
                </button>
              </div>
              <input
                name="partyTitle"
                value={moa.partyTitle}
                onChange={onChange}
                className="w-full text-main-500 bg-mainBtn-disabled rounded-lg mb-3"
                type="text"
                placeholder="파티 모집 제목"
                disabled
              />
              <div className="grid grid-flow-col mb-3">
                <span className="col-span-1 ">플레이 게임</span>
                <input
                  name="gameName"
                  value={moa.gameName}
                  onChange={onChange}
                  className="col-span-12 text-main-500 bg-mainBtn-disabled rounded-lg"
                  type="text"
                  placeholder="게임 제목을 검색하세요"
                  disabled
                />
              </div>
              <div className="grid grid-flow-col mb-3">
                <div className="grid grid-flow-col col-span-1 mx-2">
                  <span className="col-span-1">플레이 인원</span>
                  <input
                    name="maxPlayer"
                    value={moa.maxPlayer}
                    onChange={onChange}
                    className="col-span-4 w-full text-main-500 bg-mainBtn-disabled rounded-lg"
                    type="number"
                    disabled
                  />
                </div>
                <div className="grid grid-flow-col col-span-2">
                  <span className="col-span-1">시작시간</span>
                  <div className="col-span-7">
                    <input
                      name="startTime"
                      value={moa.startTime}
                      onChange={onChange}
                      className="w-full text-main-500 bg-mainBtn-disabled rounded-lg"
                      type="datetime-local"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <textarea
                  name="partyDescription"
                  value={updateMoa.partyDescription}
                  onChange={onChange}
                  className="w-full text-main-500 bg-createInput-gray rounded-lg"
                  rows="10"
                  placeholder="모집 내용 쓰는 곳"
                ></textarea>
              </div>
              <div className="grid grid-flow-col mb-8">
                <span className="col-span-1">음성 채팅 링크</span>
                <input
                  name="chatLink"
                  value={updateMoa.chatLink}
                  onChange={onChange}
                  className="col-span-11 text-main-500 bg-createInput-gray w-full rounded-lg"
                  type="text"
                  id=""
                />
              </div>
              <div className="grid grid-flow-col">
                <div>파티 태그</div>
                <div>
                  <div className="grid grid-flow-col">
                    {items.map((item, index) => (
                      <div key={index}>
                        <input
                          checked={
                            checkedList.includes(`${index + 1}`) ? true : false
                          }
                          onChange={onCheckedElement}
                          value={index + 1}
                          id={item}
                          name={item}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={item}
                          className="ml-2 text-sm font-medium text-main-100 dark:text-gray-300"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4">참가 파티원</div>
              <div
                className="w-per-75 h-40 border-box bg-createInput-gray rounded-lg text-black"
                name="partyUsers"
                value={moa.partyUsers}
                onChange={onChange}
              >
                {moa.partyPlayers &&
                  moa.partyPlayers.map((player, playerId) => {
                    return <MoaUserCard key={playerId} player={player} />;
                  })}
              </div>
            </div>
          <div className="flex my-5">
            <div className="m-auto my-5">
              <button
                onClick={handleCancel}
                className="w-32 h-14 mx-3 bg-mainBtn-blue hover:bg-mainBtn-blue-hover rounded-lg text-sm"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                className="w-32 h-14 mx-3 bg-moa-purple hover:bg-moa-purple-dark rounded-lg text-sm"
              >
                수정 완료
              </button>
            </div>
          </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MoaUpdate;
