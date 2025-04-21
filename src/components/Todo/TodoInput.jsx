import { useRef, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { BsCalendar4Week } from "react-icons/bs";
import { MdToday, MdOutlineDateRange } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { PiCalendarCheckDuotone } from "react-icons/pi";
import { GoBell } from "react-icons/go";
import { BsRepeat } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TodoInput = ({
  text,
  setText,
  handleAdd,
  dueDate,
  setDueDate,
  showCalendar,
  setShowCalendar,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const calendarRef = useRef(null);
  const today = new Date();

  const formattedDueDate = dueDate
    ? new Date(dueDate).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const setRelativeDate = (days) => {
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + days);
    setDueDate(targetDate);
    setDropdownOpen(false);
  };

  return (
    <div className="mb-4">
      <div className="bg-white shadow-sm border border-gray-200 rounded-t px-4 py-3 flex items-center justify-between relative">
        <div className="flex items-center gap-3 flex-1">
          <FiPlus className="text-gray-600" title="Add icon" />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a task"
            className="w-full outline-none text-sm ml-2"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
        </div>

        {/* ➕ Add Button */}
        <button
          onClick={handleAdd}
          className="text-sm text-gray-500 hover:text-gray-700 ml-3"
        >
          Add
        </button>

        {/* 📅 Due Date Label */}
        {dueDate && (
          <div className="absolute bottom-[-20px] left-4 text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
            Due: {formattedDueDate}
          </div>
        )}
      </div>

      <div className="bg-gray-50 border-x border-b border-gray-200 rounded-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3 text-gray-500">
          <div className="relative" ref={calendarRef}>
            <BsCalendar4Week
              className="hover:text-blue-500 cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />

            {dropdownOpen && (
              <div className="absolute left-0 top-8 bg-white border border-gray-200 rounded shadow-md w-48 z-20">
                <button
                  className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setRelativeDate(0)}
                >
                  <MdToday className="mr-2 text-blue-500" /> Today
                </button>
                <button
                  className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setRelativeDate(1)}
                >
                  <LuCalendarDays className="mr-2 text-yellow-500" /> Tomorrow
                </button>
                <button
                  className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setRelativeDate(7)}
                >
                  <PiCalendarCheckDuotone className="mr-2 text-green-500" />{" "}
                  Next Week
                </button>
                <button
                  className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => {
                    setShowCalendar(true);
                    setDropdownOpen(false);
                  }}
                >
                  <MdOutlineDateRange className="mr-2 text-purple-500" /> Pick
                  Date
                </button>
              </div>
            )}

            {showCalendar && (
              <div className="absolute left-0 top-[160px] z-30">
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => {
                    setDueDate(date);
                    setShowCalendar(false);
                  }}
                  inline
                  minDate={new Date()}
                />
              </div>
            )}
          </div>

          {/* 🔔 and ♻️ icons remain unchanged */}
          <GoBell className="hover:text-yellow-500 cursor-pointer" />
          <BsRepeat className="hover:text-green-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default TodoInput;
