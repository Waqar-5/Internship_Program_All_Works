import { Trash2 } from "lucide-react";

function TaskCard({
  task,
  columnId,
  deleteTask,
  onDragStart,
}) {
  const priorityColor = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  return (
    <div
      draggable
      onDragStart={() =>
        onDragStart(task, columnId)
      }
      className="
      bg-white
      dark:bg-slate-900

      rounded-2xl

      p-4

      shadow-lg

      hover:scale-[1.02]
      transition-all
      duration-200

      cursor-grab
      "
    >
      <div
        className="
        flex
        justify-between
        "
      >
        <span
          className={`
          text-xs
          text-white

          px-2
          py-1

          rounded-full
          ${priorityColor[task.priority]}
          `}
        >
          {task.priority}
        </span>

        <button
          onClick={() =>
            deleteTask(
              columnId,
              task.id
            )
          }
          className="
          text-red-500
          hover:scale-110
          transition
          "
        >
          <Trash2 size={18} />
        </button>
      </div>

      <h3
        className="
        mt-3
        font-semibold

        dark:text-white
        "
      >
        {task.title}
      </h3>

      <p
        className="
        text-xs
        mt-3
        text-slate-500
        "
      >
        Created: {task.createdAt}
      </p>
    </div>
  );
}

export default TaskCard;