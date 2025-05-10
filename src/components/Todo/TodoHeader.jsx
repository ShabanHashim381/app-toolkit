import React from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { VscListSelection } from "react-icons/vsc";
import { BsFillGridFill } from "react-icons/bs";

const TodoHeader = ({ isGridView, setIsGridView }) => (
  <div className="flex justify-between items-center mt-3">
    <div className="flex items-center gap-6">
      <div className="flex items-center text-3xl font-semibold gap-2">
        <IoSunnyOutline />
        <span>My Day</span>
      </div>
      <div className="flex gap-4 text-sm text-gray-500">
        <button
          onClick={() => setIsGridView(true)}
          className={`flex items-center gap-2 ${
            isGridView ? "font-semibold text-blue-600" : "text-gray-500"
          }`}
        >
          <BsFillGridFill className="w-4 h-4" />
          Grid View
        </button>
        <button
          onClick={() => setIsGridView(false)}
          className={`flex items-center gap-2 ${
            !isGridView ? "font-semibold text-blue-600" : "text-gray-500"
          }`}
        >
          <VscListSelection className="w-4 h-4" />
          List View
        </button>
      </div>
    </div>
  </div>
);

export default TodoHeader;
