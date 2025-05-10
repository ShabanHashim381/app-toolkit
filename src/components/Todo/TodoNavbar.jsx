import React from "react";
import { FiSearch } from "react-icons/fi";

const TodoNavbar = ({ setSearchText, isSidebarOpen }) => {
  return (
    <nav className="bg-sky-600 rounded-sm w-full h-17 mb-6">
      <div
        className={`${
          isSidebarOpen ? "max-w-3xl" : "w-full"
        } mx-auto flex justify-between items-center px-6 py-3`}
      >
        <h1 className="text-white text-(10px)">To Do</h1>

        <div className="flex-1 flex justify-center">
          <div className="relative w-2/3 max-w-xl">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-md" />
            <input
              type="text"
              placeholder="Search tasks..."
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 rounded-md border border-white bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TodoNavbar;
