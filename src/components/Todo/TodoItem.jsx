import React from "react";
import { CheckCircle, Circle, Star } from "lucide-react";

const TodoItem = ({
  todo,
  toggleTodo,
  toggleFavorite,
  removeTodo,
  sortOption,
}) => {
  const displayDate =
    sortOption === "createdAt"
      ? `Created: ${new Date(todo.createdAt).toLocaleDateString()}`
      : sortOption === "dueDate" && todo.dueDate
      ? `${new Date(todo.dueDate).toLocaleDateString()}`
      : `${new Date(todo.createdAt).toLocaleDateString()}`;

  const isNew = Date.now() - todo.createdAt < 10000;

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={() => toggleTodo(todo.id)}>
          {todo.completed ? (
            <CheckCircle className="text-blue-500" />
          ) : (
            <Circle className="text-gray-400" />
          )}
        </button>
        <div>
          <div className="text-sm flex items-center gap-2">
            {todo.text}
            {isNew && (
              <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
                NEW
              </span>
            )}
          </div>
          <div className="text-xs text-gray-400">{displayDate}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Star
          onClick={() => toggleFavorite(todo.id)}
          className={`cursor-pointer ${
            todo.favorite
              ? "text-yellow-400"
              : "text-gray-300 hover:text-gray-500"
          }`}
        />
        <button
          onClick={() => removeTodo(todo.id)}
          className="text-red-400 hover:text-red-600 text-xs"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
