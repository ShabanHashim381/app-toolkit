import React, { useEffect, useState } from "react";
import TodoInput from "./components/Todo/TodoInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  HiMiniArrowsUpDown,
  HiOutlineCalendarDateRange,
} from "react-icons/hi2";
import { TbCalendarCancel } from "react-icons/tb";
import TodoHeader from "./components/Todo/TodoHeader";
import TodoItem from "./components/Todo/TodoItem";

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [text, setText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isGridView, setIsGridView] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [dueDate, setDueDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isDateSortedOldestFirst, setIsDateSortedOldestFirst] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDateSortToggle = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return isDateSortedOldestFirst ? dateA - dateB : dateB - dateA;
    });
    setTodos(sortedTodos);
    setIsDateSortedOldestFirst((prev) => !prev);
  };

  const handleAdd = () => {
    if (text.trim()) {
      const now = Date.now();
      const newTodo = {
        id: now,
        text,
        completed: false,
        createdAt: now,
        dueDate: dueDate ? dueDate.getTime() : now + 7 * 24 * 60 * 60 * 1000,
        favorite: false,
      };
      setTodos((prev) => [...prev, newTodo]);
      setText("");
      setDueDate(null);
      setShowCalendar(false);
    }
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleFavorite = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, favorite: !todo.favorite } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const getFilteredTodos = () => {
    let filtered = [...todos];

    if (searchText) {
      filtered = filtered.filter((todo) =>
        todo.text.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (sortOption === "createdAt") {
      filtered.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sortOption === "dueDate") {
      filtered.sort((a, b) => a.dueDate - b.dueDate);
    } else if (sortOption === "important") {
      filtered = filtered.filter((todo) => todo.favorite);
    }

    if (sortOption === "alphabet") {
      filtered.sort((a, b) => a.text.localeCompare(b.text));
    }

    return filtered;
  };

  let filteredTodos = getFilteredTodos();

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);
  const completedTodos = filteredTodos.filter((todo) => todo.completed);

  return (
    <div className="min-h-screen bg-[#eeeec8] p-8 font-sans text-gray-800">
      <div className="max-w-3xl mx-auto h-[90vh] flex flex-col">
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

        <div className="mb-6">
          <div className="flex justify-between items-center mt-3">
            <TodoHeader />
            <div className="relative text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchCheckChecked"
                    checked={isDateSortedOldestFirst}
                    onChange={handleDateSortToggle}
                  />
                </div>

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
              </div>

              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-10">
                  <button
                    onClick={() => {
                      setSortOption((prev) =>
                        prev === "important" ? "" : "important"
                      );
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${
                      sortOption === "important"
                        ? "bg-gray-100 font-medium text-blue-600"
                        : ""
                    }`}
                  >
                    <span>⭐</span>
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
          </div>

          <div className="flex flex-col items-start text-sm text-gray-500 mt-1">
            <span>{format(new Date(), "EEEE")}</span>
            <span>{format(new Date(), "MMMM d")}</span>
          </div>
        </div>

        <div className="mb-4 relative">
          <TodoInput
            text={text}
            setText={setText}
            handleAdd={handleAdd}
            setShowCalendar={setShowCalendar}
          />
          {showCalendar && (
            <div className="absolute top-16 left-0 z-20">
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                inline
                minDate={new Date()}
              />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6 mt-4">
          <div
            className={`${isGridView ? "grid grid-cols-2 gap-4" : "space-y-4"}`}
          >
            {incompleteTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                toggleFavorite={toggleFavorite}
                removeTodo={removeTodo}
                sortOption={sortOption}
              />
            ))}
          </div>

          {completedTodos.length > 0 && (
            <>
              <div className="text-sm font-medium text-gray-600 pt-4 border-t border-gray-200">
                Completed {completedTodos.length}
              </div>
              <div
                className={`${
                  isGridView ? "grid grid-cols-2 gap-4" : "space-y-4"
                }`}
              >
                {completedTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo}
                    toggleFavorite={toggleFavorite}
                    removeTodo={removeTodo}
                    sortOption={sortOption}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
