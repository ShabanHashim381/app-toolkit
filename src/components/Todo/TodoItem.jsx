import React from "react";
import { format } from "date-fns";
import { Star, Trash2 } from "lucide-react";
import { BsCheckCircle, BsCircle } from "react-icons/bs";

const TodoItem = ({
  todo,
  toggleTodo,
  toggleFavorite,
  removeTodo,
  sortOption,
  onTaskClick,
  selectedTask,
}) => {
  const { id, text, completed, favorite, createdAt, dueDate } = todo;

  return (
    <div
      className={`p-4 rounded-lg shadow-md bg-white border border-gray-300 cursor-pointer transition-all duration-200 ${
        selectedTask?.id === id ? "border-blue-500 ring-2 ring-blue-300" : ""
      }`}
      onClick={() => onTaskClick(todo)}
    >
      <div className="flex justify-between items-center mb-2">
        <div
          className="cursor-pointer flex gap-2"
          onClick={(e) => {
            e.stopPropagation();
            toggleTodo(id);
          }}
        >
          {completed ? (
            <BsCheckCircle className="text-green-600 w-5 h-5" />
          ) : (
            <BsCircle className="text-black w-5 h-5" />
          )}
          <div className="text-sm font-medium text-black break-words">
            {text}
          </div>

          <div className="text-xs mt-1 text-black">
            {sortOption === "dueDate" && dueDate ? (
              <>Due: {format(new Date(dueDate), "MMM d, yyyy")}</>
            ) : createdAt ? (
              <>Created: {format(new Date(createdAt), "MMM d, yyyy")}</>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(id);
            }}
          >
            <Star
              className={`w-5 h-5 ${
                favorite ? "text-yellow-500 fill-yellow-500" : "text-black"
              }`}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeTodo(id);
            }}
          >
            <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
