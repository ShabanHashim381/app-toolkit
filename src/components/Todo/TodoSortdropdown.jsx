import React from "react";
import {
  HiMiniArrowsUpDown,
  HiOutlineCalendarDateRange,
} from "react-icons/hi2";
import { TbCalendarCancel } from "react-icons/tb";
import { ChevronDown, ChevronUp, Star } from "lucide-react";

const SortDropdown = ({
  sortOption,
  setSortOption,
  showSortDropdown,
  setShowSortDropdown,
}) => (
  <div className="relative text-sm text-gray-500">
    <button
      onClick={() => setShowSortDropdown((prev) => !prev)}
      className="text-gray-600 hover:text-blue-600 border px-3 py-1 rounded text-sm flex items-center gap-2"
    >
      {showSortDropdown ? (
        <ChevronUp className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      )}
      <HiMiniArrowsUpDown className="w-4 h-4" />
      <span>Sort by</span>
    </button>

    {showSortDropdown && (
      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-10">
        <button
          onClick={() => {
            setSortOption((prev) => (prev === "important" ? "" : "important"));
            setShowSortDropdown(false);
          }}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${
            sortOption === "important"
              ? "bg-gray-100 font-medium text-blue-600"
              : ""
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Importance</span>
        </button>

        <button
          onClick={() => {
            setSortOption("dueDate");
            setShowSortDropdown(false);
          }}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${
            sortOption === "dueDate"
              ? "bg-gray-100 font-medium text-blue-600"
              : ""
          }`}
        >
          <HiOutlineCalendarDateRange className="w-4 h-4" />
          <span>Due Date</span>
        </button>

        <button
          onClick={() => {
            setSortOption("alphabet");
            setShowSortDropdown(false);
          }}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${
            sortOption === "alphabet"
              ? "bg-gray-100 font-medium text-blue-600"
              : ""
          }`}
        >
          <HiMiniArrowsUpDown className="w-4 h-4" />
          <span>Alphabetically</span>
        </button>

        <button
          onClick={() => {
            setSortOption("createdAt");
            setShowSortDropdown(false);
          }}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${
            sortOption === "createdAt"
              ? "bg-gray-100 font-medium text-blue-600"
              : ""
          }`}
        >
          <TbCalendarCancel className="w-4 h-4" />
          <span>Creation Date</span>
        </button>
      </div>
    )}
  </div>
);

export default SortDropdown;
