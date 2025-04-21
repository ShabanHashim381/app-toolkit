import React from "react";

const SearchBar = ({ searchText, setSearchText }) => (
  <div className="mb-4">
    <div className="bg-white shadow-sm border border-gray-200 rounded px-4 py-3 flex items-center">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full outline-none text-sm"
      />
    </div>
  </div>
);

export default SearchBar;
