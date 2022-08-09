import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { moaDelete, moaUpdate } from '../../api/Moazone';
import MoaUserCard from '../../components/Moa/MoaUserCard';
import { moaDetail } from '../../api/Moazone';

const MoaUpdate = (props) => {
    
   const params = useParams();
   const partyId = params.party_id;
    const [ moa, setMoa ] = useState({})
    const [ updateMoa, setUpdateMoa ] = useState({
        partyDescription: '',
        chatLink: '',
        partyTags: [],
        partyStatus: '',
        partyUsers: [],
    });

    console.log("updateMoa는: ",updateMoa);

    // 파티 태그 하드코딩
    const items= [ '즐겜', '빡겜', '공략겜', '무지성겜', '친목겜', ]
    const [ checkedList, setCheckedList ] = useState([]);

    const onCheckedElement = (event) => {
        const {checked,value} = event.target

        if (checked) {
            let newChk=[...checkedList]
            newChk.push(value)
            setCheckedList(newChk);
        } else if (!checked) {
          setCheckedList(checkedList.filter(el => el !== value));
        }
        // setMoa({...moa,partyTags: checkedList }); 
    }

    const onRemove = (item) => {
        console.log(item);
        setCheckedList(checkedList.filter(el => el !== item));
      };

    const navigate = useNavigate();
    // 데이터 변경사항 저장
    const onChange = (event) => {
        let { name, value } = event.target;
        if(name === 'partyTags'){
            value=[...updateMoa.partyTags,value]
            console.log(value);
        }
        setUpdateMoa({
            ...updateMoa,
            [name]: value,
        })
    };

// 수정된 데이터 보내서 저장
const handleSubmit = (e) => {
    e.preventDefault();
    console.log("수정 완료 버튼 클릭시 : ",updateMoa); //파티유저 리스트에 파티장을 추가해야 함??
    moaUpdate(updateMoa, partyId)
    .then((res)=>{
        if (res.statusCode === 200 ){
            navigate(`/${moa.partyId}`)
        } else {
            alert(res.data.message);
        }
    });
}

const handleCancel = () => {
    navigate(`/`);
}

// 파티 삭제
const handleDeleteParty = (e) => {
    e.preventDefault();
    moaDelete(partyId)
    .then((res)=> {
        console.log(res);
        if (res.status === 200) {
            alert(res.data);
            //모달창 '파티를 정말 삭제하시겠습니까?'
            navigate('/moazone')
        }
    })
}

  useEffect((e) => {
    moaDetail(partyId)
    .then(({data}) => {
        setMoa(data);
        setUpdateMoa({...updateMoa,
            partyDescription: data.partyDescription,
            chatLink: data.chatLink,
            partyTags: data.partyTags,
            partyStatus: data.partyStatus
            })
        })
    },[]);
  
  return (
    <>
      <Navbar />
        <div className="w-per75 h-screen m-auto text-white font-sans">
            <div className="m-auto">
                <img className="w-full" src="../../ImgAssets/MoaZone_UpdateVer.gif" alt="모아존 글수정 배너 이미지" />
            </div>
            <div className="box-content w-full bg-main-300 mb-2 text-main-300">공간채우기 용도 글씨</div>
            <form>
            <div className="m-auto mb-2 bg-main-400">
                <div className="createContainer p-4">
                <div className="mb-3 flex justify-content-between">
                  <div className='flex-none'>
                    <span>파티 모집 수정하기</span>
                  </div>
                  <button className="rounded-lg "onClick={handleDeleteParty}>파티 삭제하기</button>
                </div>
                    <input 
                    name="partyTitle"
                    value={moa.partyTitle}
                    onChange={onChange}
                    className="w-full text-main-500 bg-mainBtn-disabled rounded-lg mb-3" type="text" placeholder="파티 모집 제목" disabled />
                <div className="grid grid-flow-col mb-3">
                    <span className="col-span-1 ">플레이 게임</span>
                    <input 
                    name="gameName"
                    value={moa.gameName}
                    onChange={onChange}
                    className="col-span-12 text-main-500 bg-mainBtn-disabled rounded-lg" type="text" placeholder="게임 제목을 검색하세요" disabled />
                </div>
                <div className="grid grid-flow-col mb-3">
                    <div className="grid grid-flow-col col-span-1 mx-2">
                        <span className="col-span-1">플레이 인원</span>
                        <input 
                        name="maxPlayer"
                        value={moa.maxPlayer}
                        onChange={onChange}
                        className="col-span-4 w-full text-main-500 bg-mainBtn-disabled rounded-lg" type="number" disabled />
                    </div>
                    <div className="grid grid-flow-col col-span-2">
                        <span className="col-span-1">시작시간</span>
                        <div className="col-span-7">
                        <input 
                        name="startTime"
                        value={moa.startTime}
                        onChange={onChange}
                        className="w-full text-main-500 bg-mainBtn-disabled rounded-lg" type="datetime-local" disabled />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <textarea 
                    name="partyDescription"
                    value={updateMoa.partyDescription}
                    onChange={onChange}
                    className="w-full text-main-500 bg-createInput-gray rounded-lg" rows="10" placeholder="모집 내용 쓰는 곳"></textarea>
                </div>
                <div className="grid grid-flow-col mb-8">
                    <span className="col-span-1">음성 채팅 링크</span>
                    <input 
                    name="chatLink"
                    value={updateMoa.chatLink}
                    onChange={onChange}
                    className="col-span-11 text-main-500 bg-createInput-gray w-full rounded-lg" type="text" id="" />
                </div>
                {/* 파티 태그 하드 코딩 */}
                <div className='grid grid-flow-col'>
                <div>파티 태그</div>
                <div>
                    <div className='grid grid-flow-col'>
                        {
                            items.map((item ,index)=>
                                <div key={index} >
                            <input
                            checked={checkedList.includes(`${index+1}`)? true : false}
                            onChange={onCheckedElement} value={index+1} id={item} name={item} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"/>
                            <label htmlFor={item} className="ml-2 text-sm font-medium text-main-100 dark:text-gray-300">{item}</label>
                            </div>
                            )
                            //  checkedList.includes(item.id)
                            }
                    </div>
                    <div className="w-full rounded-lg ml-2 font-medium grid-flow-col">
                        {checkedList.map((item)=>
                            <span key={item} onClick={()=>onRemove(item)}>{items[item-1]}</span>
                        )}
                    </div>
                </div>
                </div>
                
                {/* <PartyUsers /> */}
                <div 
                className='w-per-75 h-40 border-box bg-createInput-gray rounded-lg text-black'
                name="partyUsers"
                value={moa.partyUsers}
                onChange={onChange}
                >
                    <MoaUserCard />
                </div>
                </div>
            </div>
            <div className="flex mt-5">
                    <div className="m-auto">
                    <button onClick={handleCancel} className="w-32 h-14 mx-3 bg-mainBtn-disabled rounded-sm">취소</button>
                    <button onClick={handleSubmit} className="w-32 h-14 mx-3 bg-moa-purple rounded-sm">수정 완료</button>
                    </div>
            </div>
            </form>
        </div>
     </>

  )
}

export default MoaUpdate;
