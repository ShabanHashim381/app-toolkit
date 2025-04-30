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
}) => {
  const { id, text, completed, favorite, createdAt, dueDate } = todo;

  return (
    <div
      className={`p-4 rounded-lg shadow-md bg-[#2a2a3d] border ${
        completed ? "border-green-600" : "border-gray-600"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="cursor-pointer" onClick={() => toggleTodo(id)}>
          {completed ? (
            <BsCheckCircle className="text-green-400 w-5 h-5" />
          ) : (
            <BsCircle className="text-gray-400 w-5 h-5" />
          )}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => toggleFavorite(id)}>
            <Star
              className={`w-5 h-5 ${
                favorite ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
              }`}
            />
          </button>
          <button onClick={() => removeTodo(id)}>
            <Trash2 className="w-5 h-5 text-red-400 hover:text-red-500" />
          </button>
        </div>
      </div>

      <div className="text-sm font-medium text-gray-200 break-words">
        {text}
      </div>

      <div className="text-xs mt-1 text-gray-400">
        {sortOption === "dueDate" && dueDate ? (
          <>Due: {format(new Date(dueDate), "MMM d, yyyy")}</>
        ) : createdAt ? (
          <>Created: {format(new Date(createdAt), "MMM d, yyyy")}</>
        ) : null}
      </div>
    </div>
  );
};

export default TodoItem;
