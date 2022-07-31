import React from 'react'

const SelectInput = (props) => {
  const options = props.options
  return (
    <select id="small" class="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option selected disabled>정렬 기준을 선택하세요</option>
      {/* <option value="US">United States</option>
      <option value="CA">Canada</option>
      <option value="FR">France</option>
      <option value="DE">Germany</option> */}
    </select>
  )
}

export default SelectInput