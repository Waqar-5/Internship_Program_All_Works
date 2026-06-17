import { useEffect, useState } from "react";

function AddTaskModal({ onClose, addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  // ESC key close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("⚠️ Please enter a task title!");
      return;
    }

    addTask(title, priority);
    setTitle("");
    setPriority("Medium");
    setError("");
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0
        bg-black/50
        flex items-center justify-center
        z-50
      "
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md
          bg-white dark:bg-slate-900
          rounded-3xl
          p-6
          shadow-2xl
          transform transition-all
        "
      >
        <h2 className="text-2xl font-bold mb-5 dark:text-white">
          Add New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Title Input */}
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            className="
              w-full
              p-3
              rounded-xl
              border
              dark:bg-slate-800
              dark:text-white
            "
          />

          {/* Priority */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="
              w-full
              p-3
              rounded-xl
              border
              dark:bg-slate-800
              dark:text-white
            "
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            
            <button
              type="button"
              onClick={onClose}
              className="
                px-4 py-2
                rounded-xl
                bg-gray-200
                hover:bg-gray-300
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                px-4 py-2
                rounded-xl
                bg-blue-600
                text-white
                hover:bg-blue-700
              "
            >
              Add Task
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;