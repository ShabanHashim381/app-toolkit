import React, { useEffect, useState } from "react";
import TodoInput from "../components/Todo/TodoInput";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import TodoHeader from "../components/Todo/TodoHeader";
import TodoItem from "../components/Todo/TodoItem";
import DatePicker from "react-datepicker";
import TodoSearch from "../components/Todo/TodoSearch";

const TodoApp = () => {
  const [todoList, setTodoList] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isGridView, setIsGridView] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedDueDate, setSelectedDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSortedOldestFirst, setIsSortedOldestFirst] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const handleToggleSortOrder = () => {
    const sorted = [...todoList].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return isSortedOldestFirst ? dateA - dateB : dateB - dateA;
    });
    setTodoList(sorted);
    setIsSortedOldestFirst((prev) => !prev);
  };

  const handleToggleTodo = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleToggleFavorite = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, favorite: !todo.favorite } : todo
      )
    );
  };

  const handleRemoveTodo = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const getFilteredTodos = () => {
    let filtered = [...todoList];
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
    } else if (sortOption === "alphabet") {
      filtered.sort((a, b) => a.text.localeCompare(b.text));
    }
    return filtered;
  };

  const filteredTodos = getFilteredTodos();
  const activeTodos = filteredTodos.filter((todo) => !todo.completed);
  const completedTodos = filteredTodos.filter((todo) => todo.completed);

  return (
    <div className="min-h-screen bg-[#1e1e2f] p-8 font-sans text-gray-200">
      <div className="max-w-3xl mx-auto h-[90vh] flex flex-col">
        <TodoSearch setSearchText={setSearchText} />

        {/* Header & Sorting */}
        <div className="mb-6">
          <div className="flex justify-between items-center mt-3">
            <TodoHeader isGridView={isGridView} setIsGridView={setIsGridView} />

            <div className="relative text-sm text-gray-300">
              <div className="flex items-center gap-4">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked={isSortedOldestFirst}
                    onChange={handleToggleSortOrder}
                  />
                </div>
                <button
                  onClick={() => setShowSortDropdown((prev) => !prev)}
                  className="text-gray-300 hover:text-white border border-gray-600 px-3 py-1 rounded text-sm flex items-center gap-2"
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
                <div className="absolute right-0 mt-2 w-40 bg-[#2a2a3d] border border-gray-600 rounded shadow-md z-10">
                  {[
                    { key: "important", label: "⭐ Importance" },
                    { key: "dueDate", label: "📅 Due Date" },
                    { key: "alphabet", label: "🔤 Alphabetically" },
                    { key: "createdAt", label: "🕓 Created At" },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => {
                        setSortOption(opt.key);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#3a3a4f] ${
                        sortOption === opt.key
                          ? "bg-[#3a3a4f] font-medium text-white"
                          : "text-gray-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start text-sm text-gray-400 mt-1">
            <span>{format(new Date(), "EEEE")}</span>
            <span>{format(new Date(), "MMMM d")}</span>
          </div>
        </div>

        {/* Input */}
        <div className="mb-4 relative">
          <TodoInput
            text={inputText}
            setText={setInputText}
            setShowCalendar={setShowDatePicker}
            inputText={inputText}
            selectedDueDate={selectedDueDate}
            setTodoList={setTodoList}
            setInputText={setInputText}
            setSelectedDueDate={setSelectedDueDate}
            setShowDatePicker={setShowDatePicker}
          />
          {showDatePicker && (
            <div className="absolute top-16 left-0 z-20">
              <DatePicker
                selected={selectedDueDate}
                onChange={(date) => setSelectedDueDate(date)}
                inline
                minDate={new Date()}
              />
            </div>
          )}
        </div>

        {/* Todo List */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 mt-4">
          <div
            className={`${isGridView ? "grid grid-cols-2 gap-4" : "space-y-4"}`}
          >
            {activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={handleToggleTodo}
                toggleFavorite={handleToggleFavorite}
                removeTodo={handleRemoveTodo}
                sortOption={sortOption}
              />
            ))}
          </div>

          {completedTodos.length > 0 && (
            <>
              <div className="text-sm font-semibold text-white pt-4 border-t border-gray-600">
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
                    toggleTodo={handleToggleTodo}
                    toggleFavorite={handleToggleFavorite}
                    removeTodo={handleRemoveTodo}
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
