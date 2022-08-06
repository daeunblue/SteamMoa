import React, { useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { moaCreate } from "../../api/Moazone";
import MoaGameSearchBox from "../../components/Moa/MoaGameSearchBox";

import { auth } from "../../recoil/Auth";
import { useRecoilState } from "recoil";

// 글을 작성하고 입력 버튼을 누르면 db에 저장
// update 페이지에서 db를 불러온 뒤 수정 후 다시 서버로 보내 db에 저장
function MoaCreate() {

    const user = useRecoilState(auth);
    const userId = user[0].userId;
    console.log("userId : ", userId);

    const [ moa, setMoa ] = useState({
        chatLink: '',
        gameId: 457,
        maxPlayer: 0,
        partyDescription: '',
        partyTags:[],
        partyTitle: '',
        startTime: '',
        userId: '',
    });

    // 파티 태그 요소 하드 코딩

    const items= [
        {
          id: '1',
          name: "즐겜",
        },
        {
          id: '2',
          name: "빡겜",
        },
        {
          id: '3',
          name: "공략겜",
        },
        {
          id: '4',
          name: "무지성겜",
        },
        {
          id: '5',
          name: "친목겜",
        },
      ]
    
    
    const navigate = useNavigate();
    
    const [ checkedList, setCheckedList ] = useState(new Set());

    console.log('Object.key(checkedList) ; ',Object.keys(checkedList));

    const onCheckedElement = (event) => {
        console.log('dfd');
        const {checked,value,name} =event.target
        console.log('checked : ',checked);
        console.log('value : ',value);
        console.log('name : ',name);

        if (checked) {
            console.log([...checkedList, {id:name,name:value}]);
          setCheckedList([...checkedList,{id:name,name:value}]);
        } else if (!checked) {
          setCheckedList(checkedList.filter(el => el.id !== name));
        }
        setMoa({...moa,partyTags: checkedList }); 
        
    }
    console.log('checkedList : ',checkedList);
    console.log('moa : ',moa);

    const onRemove = (itemId) => {
        console.log(itemId);
        setCheckedList(checkedList.filter(el => el.id !== itemId));
      };
    ////////////////////////////////////////////
    

    // 데이터 변경사항 저장
    const onChange = (event) => {
        let { name, value } = event.target;
        setMoa({
            ...moa,
            [name]: value,
        });
    }

    const onGameChange = (gameId) =>{
        console.log(gameId);
        setMoa({
            ...moa,
            gameId: gameId
        })

    }

    // 데이터 보내기
    const handleSubmit = (e) => {
        console.log(moa);
        e.preventDefault();
        // console.log(e.target)
        moaCreate(moa)
        .then((data) =>  {
            console.log('data : ',data)
            if (data.status === 200) {
                navigate('/');
            } else {
                alert(data.message);
            }
        });
    }
    
    const handleCancel = () => {
        //모아존 메인으로 이동
        navigate('/moazone');
    }

  return (
    <>
      <Navbar />
        <div className="w-per75 h-screen m-auto text-white font-sans">
            <div className="m-auto">
                <img className="w-full" src="../../ImgAssets/MoaZone_CreateVer.gif" alt="모아존 글쓰기 배너 이미지" />
            </div>
            <div className="box-content w-full bg-main-300 mb-2 text-main-300">공간채우기 용도 글씨</div>
            <div className="m-auto mb-2 bg-main-400">
                <div className="createContainer p-4">
                <div className="mb-3">
                <span>파티 모집 글쓰기</span>
                </div>
                    <input 
                    name="partyTitle" 
                    value={moa.partyTitle} 
                    onChange={onChange} 
                    className="w-full text-main-500 bg-createInput-gray rounded-lg mb-3" type="text" placeholder="파티 모집 제목"/>
                <div>
                    <MoaGameSearchBox onSearch={onGameChange} />
                </div>
                <div className="grid grid-flow-col mb-3">
                    <div className="grid grid-flow-col col-span-1 mx-2">
                        <span className="col-span-1">플레이 인원</span>
                        <input
                        name="maxPlayer" 
                        value={moa.maxPlayer} 
                        onChange={onChange} 
                        type="number"
                        className="col-span-4 w-full text-main-500 bg-createInput-gray rounded-lg"  />
                    </div>
                    <div className="grid grid-flow-col col-span-2">
                        <span className="col-span-1">시작시간</span>
                        <div className="col-span-7">
                        <input 
                        name="startTime" 
                        value={moa.startTime} 
                        onChange={onChange} 
                        className="w-full text-main-500 bg-createInput-gray rounded-lg" type="datetime-local" />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <textarea 
                    name="partyDescription" 
                    value={moa.partyDescription} 
                    onChange={onChange} 
                    className="w-full text-main-500 bg-createInput-gray rounded-lg" id="" cols="" rows="10" placeholder="모집 내용 쓰는 곳"></textarea>
                </div>
                <div className="grid grid-flow-col mb-8">
                    <span className="col-span-1">음성 채팅 링크</span>
                    <input 
                    name="chatLink" 
                    value={moa.chatLink} 
                    onChange={onChange} 
                    className="col-span-11 text-main-500 bg-createInput-gray w-full rounded-lg" type="text" id="" />
                </div>
                {/* 파티 태그 하드 코딩 */}
                <div>
                    {
                        items.map((item)=>
                            <div key={item.id} >
                        <input
                        //  checked={checkedList.ic? true : false}
                        onChange={onCheckedElement} value={item.name} id={item.id} name={item.id} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"/>
                        <label htmlFor={item.id} className="ml-2 text-sm font-medium text-main-100 dark:text-gray-300">{item.name}</label>
                        </div>
                         )
                        //  checkedList.includes(item.id)
                    }
                </div>
                <div>
                    {checkedList.map((item)=>
                         <span key={item.id} onClick={()=>onRemove(item.id)}>{item.name}</span>
                    )}
                </div>
                </div>
            </div>
            <div className="flex mt-5">
                    <div className="m-auto">
                    <button onClick={handleCancel} className="w-32 h-14 mx-3 bg-mainBtn-disabled rounded-sm">취소</button>
                    <button onClick={handleSubmit} className="w-32 h-14 mx-3 bg-moa-pink-dark rounded-sm">파티 만들기</button>
                    </div>
            </div>
        </div>
     </>

  )
};

export default MoaCreate;