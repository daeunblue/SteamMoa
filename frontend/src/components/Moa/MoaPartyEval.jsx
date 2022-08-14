import React from 'react'

const MoaPartyEval = (props) => {
  const {setShowEvalModal, showEvalModal } = props

  const onCloseEvalModal = () => {
    setShowEvalModal(false)
  }

  return (
    // modal
    <div id="following-modal" className={`${(showEvalModal ? "bg-black bg-opacity-40":"hidden")} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}>
    <div className="relative p-4 top-[120px] w-full max-w-md h-full  md:h-[400px] mx-auto">
      {/* <!-- Modal content --> */}
      <div className="relative bg-white rounded-lg shadow w-full">
        {/* <!-- Modal header --> */}
        <div className="flex justify-between items-center p-5 rounded-t border-b">
            <h3 className="text-base font-medium text-gray-800">
              님의 Followings
            </h3>
            <button  onClick={onCloseEvalModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
        {/* <!-- Modal body --> */}
        <div className="p-6 space-y-6  h-[400px]">
            {/* 팔로잉 리스트 */}
            dddd
        </div>
      </div>
    </div>
  </div>
  )
}

export default MoaPartyEval