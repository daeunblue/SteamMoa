import React from 'react'
import { range } from 'lodash'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


const MiniPagination = (props) => {
  const {viewablePages, setViewablePages, setPage, page, totPage} =props
  
  const onClickItem = (e) =>{
    const val = e.target.value
    const view = (Math.ceil(val/5)-1) * 5
    setPage(val)
    setViewablePages(range(view+1,Math.min(view+6,totPage+1)))
    }  

  const onClickPrev = () => {
    let newPage = page - 1 > 1 ? page - 1 : 1;
    const view = (Math.ceil(newPage/5)-1) * 5
    setPage(newPage);
    setViewablePages(range(view+1,Math.min(view+6,totPage+1)))

  };
  const onClickNext = () => {
    let newPage = page + 1 <= totPage ? page + 1 : totPage;
    const view = (Math.ceil(newPage/5)-1) * 5
    setPage(newPage);
    setViewablePages(range(view+1,Math.min(view+6,totPage+1)))
  };


  return (
    <div id='pagination'
    className="w-per35 flex justify-between items-center">
      <FontAwesomeIcon
        icon={faAngleLeft}
        onClick={onClickPrev}
        className="w-4 h-4 rounded-full hover:bg-main-100 hover:text-main-500"
      />
    {viewablePages.map((item, index)=>{
        return(
        <li
        value={item}
        key={index}
        onClick={onClickItem}
        className={`${
        page===item ? "bg-moa-purple-light  text-white" : ""
        } w-6 h-6  text-lg text-center list-none inline-block rounded-full hover:bg-moa-purple-dark hover:text-main-500 hover:cursor-pointer`}
        >
        {item}
        </li>             
        )
    })}
    <FontAwesomeIcon
        icon={faAngleRight}
        onClick={onClickNext}
        className="w-4 h-4 rounded-full hover:bg-main-100 hover:text-main-500"
      />

    </div>
  )
}

export default MiniPagination