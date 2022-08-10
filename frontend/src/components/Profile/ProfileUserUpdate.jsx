import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { postPWCheck } from '../../api/Auth'


const ProfileUserUpdate = (props) => {
  const navigate = useNavigate()
  const { profileName, isMyPage } = props
  const userId = useState(profileName)
  const [trialCnt, setTrialCnt] = useState(1)
  const [updateInfo, setUpdateInfo] = useState({
    user_name:'', // 닉네임
    u_tag:[], // 유저 태그
    password:''
  })

  //비밀번호 확인 swal
  const pwCheckSwal = Swal.mixin({
    html: `<strong>${profileName}님</strong> <br><br>정보 수정을 위해 비밀번호를 입력해주세요.`,
    input: 'password',
    showCancelButton: true,
    confirmButtonText: '<strong>입력</strong>',
    cancelButtonText: '<strong>취소</strong>',
    confirmButtonColor: '#43B5A0',
    cancelButtonColor: '#A9ACB1',
    inputPlaceholder: '비밀번호를 입력하세요',
    inputAttributes: {
      maxlength: 30,
      autocapitalize: 'off',
      autocorrect: 'off'
    }
  })

  const SuccessToast = Swal.mixin({
    toast: true,
    position: 'center',
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const FailureToast = Swal.mixin({
    buttonsStyling: false,
    toast: true,
    position: 'center',
    showConfirmButton: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  useEffect(
    async() => {
      if (!isMyPage) {
        alert('잘못된 접근입니다.')
        navigate('/')
      }

      await pwCheckSwal.fire().then((res)=>{
        if(res.isConfirmed){
          const user = {
            "user_service_id": userId[0],
            "user_service_pw": res.value
          }
          postPWCheck(user)
            .then((response)=>{
              if (response.data.statusCode === 200) {
                SuccessToast.fire(
                  {
                    showConfirmButton: false,    
                    icon: 'success',
                    title: '회원 인증 성공'
                  }
                )
              } else if (response.data.statusCode === 401){
                if(trialCnt < 5){
                  FailureToast.fire(
                    {
                      customClass: {
                        confirmButton: 'mx-2 rounded py-1 px-5 bg-moa-pink text-white w-full',
                      },
                      icon: 'error',
                      title: `회원 인증 ${trialCnt}회 실패! <br> 비밀번호를 확인하세요.`
                    })
                    .then(()=>{
                      setTrialCnt(trialCnt+1)
                    }
                  ) 
                } else{
                  FailureToast.fire(
                    {
                      customClass: {
                        confirmButton: 'mx-2 rounded py-1 px-5 bg-moa-yellow text-white w-full',
                      },
                      icon: 'warning',
                      title: `비밀번호를 5회 틀렸습니다. <br> 비밀번호 확인 후 시도해주세요.`
                    })
                    .then(()=>{
                      navigate(`/mypage/${userId[0]}`)
                    }
                  ) 
                }
              }
            }
            ).catch((err)=>{
              console.log(err)
              FailureToast.fire(
                {
                  customClass: {
                    confirmButton: 'mx-2 rounded py-1 px-5 bg-moa-pink-dark text-white w-full',
                  },
                  icon: 'error',
                  title: `Server Error! 잠시 후 다시 시도해주세요`
                })
            })
        } else if (res.isDismissed){
          navigate(-1)
        }
      }
      )
    }, [trialCnt]
  )
  
  const [checkedInputs, setCheckedInputs] = useState([]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  };

  const utags = [
    { 
      id: 1,
      tag: '즐겜',
    },
    { 
      id: 2,
      tag: '빡겜',
    },
    { 
      id: 3,
      tag: '공략겜',
    },
    { 
      id: 4,
      tag: '친목겜',
    },
    { 
      id: 5,
      tag: '무지성겜',
    }
  ]


  return (
    <div className='py-8 px-12 w-full h-full'>
      <div className='flex mb-2'>
        <div className='w-2 bg-moa-green'></div>
        <div className='ml-3 text-2xl font-bold text-moa-green'>회원정보 수정</div>
      </div>
      <hr />

      <div className='rounded mt-3 w-full bg-searchbar-gray p-6'>
        <div>
          <span>닉네임</span>
          <input type="text" />
        </div>

        <div>
          <span>닉네임</span>
          <div>
            {utags.map((item,idx) =>{
              return(
                <label key={idx}>
                  <input type="checkbox" value={item.id}         
                  onChange={(e)=>{
                              changeHandler(e.currentTarget.checked, item.id)
                              }}
                  checked={checkedInputs.includes(item.id) ? true : false}/>{item.tag}
                </label>
              )
            })}
          </div>
        </div>

      </div>

    </div>
  )
}

export default ProfileUserUpdate