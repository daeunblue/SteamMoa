import React from "react";
import FilterItems from "./FilterItems";

const FilterCaterories = (props) => {
  const { id, name, items } = props.category;
  const { filter, setFilter } = props;

  const checkedItemHandler = (item, isChecked) => {
    if (isChecked) {
      //필터에 추가
      const list = [...filter, { category: id, item: item.id, name: item.name }];
      setFilter(list);
    } else if (!isChecked) {
        //필터에 있는 체크 삭제
      const list = filter.filter((filterItem) => {
          return (filterItem.category !== id || filterItem.item !== item.id) ? true : false;
      });
      setFilter(list);
    }
  };

  return (
    <div className="grid grid-cols-12 mb-2">
      <span className="col-span-2 font-semibold text-white ml-10">{name}</span>
      <div className=" col-span-10 grid grid-cols-7 gap-3">
        {items.map((item) => (
          <FilterItems key={item.id} item={item} checkedItemHandler={checkedItemHandler} />
        ))}
      </div>
    </div>
  );
};

export default FilterCaterories;
