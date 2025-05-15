import React, { useEffect, useState } from "react";
import TodoInput from "../components/Todo/TodoInput";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import TodoHeader from "../components/Todo/TodoHeader";
import TodoItem from "../components/Todo/TodoItem";
import TodoNavbar from "../components/Todo/TodoNavbar";
import SortDropdown from "../components/Todo/TodoSortdropdown";

const TodoApp = ({ isSidebarOpen }) => {
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
  const [selectedTask, setSelectedTask] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleTaskClick = (task) => {
    if (selectedTask?.id === task.id) {
      setSelectedTask(null);
      setShowSidebar(false);
    } else {
      setSelectedTask(task);
      setShowSidebar(true);
    }
  };

  const confirmAndRemove = () => {
    if (selectedTask) {
      handleRemoveTodo(selectedTask.id);
      setSelectedTask(null);
      setShowSidebar(false);
      setConfirmDelete(false);
    }
  };

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

  const handleSaveChanges = () => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === selectedTask.id) {
          return { ...todo, text: selectedTask.text };
        }
        return todo;
      })
    );
    setIsEditing(false);
  };

  const filteredTodos = getFilteredTodos();
  const activeTodos = filteredTodos.filter((todo) => !todo.completed);
  const completedTodos = filteredTodos.filter((todo) => todo.completed);

  return (
    <div className="h-full bg-gray-100 font-sans text-black">
      <TodoNavbar setSearchText={setSearchText} />
      <div
        className={`h-[90vh] flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "max-w-3xl mx-auto" : "w-full mx-auto px-4"
        }`}
      >
        {/* Header & Sort */}
        <div className="mb-6">
          <div className="flex justify-between items-center mt-3">
            <TodoHeader isGridView={isGridView} setIsGridView={setIsGridView} />

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                role="switch"
                checked={isSortedOldestFirst}
                onChange={handleToggleSortOrder}
              />
              <SortDropdown
                sortOption={sortOption}
                setSortOption={setSortOption}
                showSortDropdown={showSortDropdown}
                setShowSortDropdown={setShowSortDropdown}
              />
            </div>
          </div>

          <div className="flex flex-col items-start text-sm text-black mt-1">
            <span>{format(new Date(), "EEEE")}</span>
            <span>{format(new Date(), "MMMM d")}</span>
          </div>
        </div>

        {/* Input + DatePicker */}
        <div className="mb-4 relative">
          {sortOption && (
            <div className="absolute right-0 -top-7 bg-blue-100 text-blue-800 text-xs px-3 py-1 shadow-sm border border-blue-300">
              Sorted by
              {
                {
                  important: " Importance",
                  dueDate: " Due Date",
                  alphabet: " Alphabetically",
                  createdAt: " Creation Date",
                }[sortOption]
              }
            </div>
          )}

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
            showDatePicker={showDatePicker}
          />
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
                onTaskClick={handleTaskClick}
                selectedTask={selectedTask}
              />
            ))}
          </div>

          {completedTodos.length > 0 && (
            <>
              <div className="text-sm font-semibold text-black pt-4 border-t border-gray-400">
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

      {/* Sidebar Task Details */}
      {showSidebar && selectedTask && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl border-l z-50 p-4 overflow-y-auto transition-transform">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Task Details</h2>
            <button
              className="text-gray-600 hover:text-red-500"
              onClick={() => {
                setShowSidebar(false);
                setSelectedTask(null);
              }}
            >
              ✕
            </button>
          </div>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={selectedTask.text}
                onChange={(e) => {
                  setSelectedTask({ ...selectedTask, text: e.target.value });
                }}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleSaveChanges}
                className="mt-4 px-4 py-2 text-sm bg-blue-500 text-white rounded"
              >
                Save Changes
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="mt-4 ml-4 px-4 py-2 text-sm bg-gray-300 text-black rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold">Text:</span> {selectedTask.text}
              </div>
              {selectedTask.dueDate && (
                <div>
                  <span className="font-semibold">Due Date:</span>{" "}
                  {format(new Date(selectedTask.dueDate), "MMM d, yyyy")}
                </div>
              )}
              <div>
                <span className="font-semibold">Created At:</span>{" "}
                {format(new Date(selectedTask.createdAt), "MMM d, yyyy")}
              </div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                {selectedTask.completed ? "Completed" : "Incomplete"}
              </div>
            </div>
          )}
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => setConfirmDelete(true)}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded"
            >
              Delete Task
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded"
            >
              Edit Task
            </button>
          </div>
          {confirmDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[100]">
              <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
                <p className="text-gray-800 text-sm mb-4">
                  Are you sure you want to delete this task?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={confirmAndRemove}
                    className="px-4 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="px-4 py-1.5 text-sm bg-gray-300 text-black rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoApp;
