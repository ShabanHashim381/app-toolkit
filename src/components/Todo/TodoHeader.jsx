import React from "react";
import { IoSunnyOutline } from "react-icons/io5";

const TodoHeader = ({ isGridView, setIsGridView }) => (
  <div className="flex justify-between items-center mt-3">
    <div className="flex items-center gap-6">
      <div className="flex items-center text-3xl font-semibold gap-2">
        <IoSunnyOutline />
        <span>My Day</span>
      </div>
      <div className="flex gap-2 text-sm text-gray-500">
        <button
          onClick={() => setIsGridView(false)}
          className={`${
            !isGridView ? "font-semibold text-blue-600" : "text-gray-500"
          }`}
        >
          List View
        </button>
        <button
          onClick={() => setIsGridView(true)}
          className={`${
            isGridView ? "font-semibold text-blue-600" : "text-gray-500"
          }`}
        >
          Grid View
        </button>
      </div>
    </div>
  </div>
);

export default TodoHeader;
