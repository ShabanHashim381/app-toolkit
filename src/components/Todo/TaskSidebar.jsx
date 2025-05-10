import React from "react";
import { Trash, Pencil } from "lucide-react";

const TaskSidebar = ({ task, onClose, onDelete }) => {
  const handleDelete = () => {
    const confirmed = window.confirm(
      "You want to delete the task permanently?"
    );
    if (confirmed) onDelete(task.id);
  };

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-50 border-l border-gray-300">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Task Details</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-black">
          X
        </button>
      </div>
      <div className="mt-4 space-y-2">
        <p>
          <strong>Task:</strong> {task.text}
        </p>
        <p>
          <strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}
        </p>
        {task.dueDate && (
          <p>
            <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
        <p>
          <strong>Favorite:</strong> {task.favorite ? "Yes" : "No"}
        </p>
        <p>
          <strong>Status:</strong> {task.completed ? "Completed" : "Pending"}
        </p>
      </div>

      <div className="mt-6 flex gap-4">
        <button className="flex items-center gap-1 px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300">
          <Pencil className="w-4 h-4" /> Edit
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1 bg-red-200 rounded hover:bg-red-300"
          onClick={handleDelete}
        >
          <Trash className="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
  );
};

export default TaskSidebar;
