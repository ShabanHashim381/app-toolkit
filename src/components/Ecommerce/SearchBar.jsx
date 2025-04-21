import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center border rounded-lg p-2 bg-white">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleInputChange}
        className="flex-1 p-2 text-gray-700 focus:outline-none"
      />
      <button
        onClick={() => onSearch(query)}
        className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
