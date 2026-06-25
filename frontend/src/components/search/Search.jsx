import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-2xl px-3 my-1 ml-4 bg-white shadow-sm min-w-[250px] min-h-[35px]">
      <BiSearch size={18} className="text-gray-500" />
      <input
        type="text"
        placeholder="بحث..."
        value={value}
        onChange={onChange}
        className="outline-none bg-transparent w-full text-sm text-gray-700 placeholder-gray-400"
      />
    </div>
  );
};

export default Search;
