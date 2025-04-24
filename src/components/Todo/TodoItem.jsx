import React from "react";
import { format } from "date-fns";
import { FaStar, FaRegStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoItem = ({
  todo,
  toggleTodo,
  toggleFavorite,
  removeTodo,
  sortOption,
}) => {
  const { id, text, completed, favorite, createdAt, dueDate } = todo;

  const getDateLabel = () => {
    if (sortOption === "dueDate") {
      return `Due: ${format(new Date(dueDate), "MMM d, yyyy")}`;
    }
    return `Created: ${format(new Date(createdAt), "MMM d, yyyy")}`;
  };

  return (
    <div
      className={`flex items-center justify-between border border-gray-400 rounded px-4 py-3 bg-[#2a2a3d] transition-all ${
        completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleTodo(id)}
          className="form-checkbox h-5 w-5 accent-purple-500"
        />
        <div className="flex flex-col">
          <span
            className={`text-base ${
              completed ? "line-through text-white" : "text-white"
            }`}
          >
            {text}
          </span>
          <span className="text-sm text-gray-400">{getDateLabel()}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => toggleFavorite(id)}>
          {favorite ? (
            <FaStar className="text-yellow-400" />
          ) : (
            <FaRegStar className="text-gray-400" />
          )}
        </button>
        <button onClick={() => removeTodo(id)}>
          <MdDelete className="text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
