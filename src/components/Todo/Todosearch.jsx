import React from "react";
import SearchInput from "../common/SearchInput";

const TodoSearch = ({ searchText, setSearchText }) => {
  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  return (
    <div className="mb-4">
      <SearchInput
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search tasks..."
      />
    </div>
  );
};

export default TodoSearch;
