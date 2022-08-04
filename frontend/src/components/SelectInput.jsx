import React from "react";

const SelectInput = (props) => {
  const { options, handleSelectChange } = props;

  return (
    <select
      id="small"
      className="col-span-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={handleSelectChange}
    >
      <option selected disabled>
        정렬 기준을 선택하세요
      </option>
      {options.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

export default SelectInput;
