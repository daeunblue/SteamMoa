import React, { useState } from "react";

const FilterItems = (props) => {
  const { checkedItemHandler, item } = props;
  const [checked, setChecked] = useState(false);

  const checkHandler = (e) => {
    setChecked(!checked);
    checkedItemHandler(item, e.target.checked);
  };

  return (
    <div>
      <input
        id="filter-checkbox"
        type="checkbox"
        onChange={checkHandler}
        checked={checked}
        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
      />
      <span className="ml-2 text-sm font-medium text-main-100 dark:text-gray-300">{item.name}</span>
    </div>
  );
};

export default FilterItems;
