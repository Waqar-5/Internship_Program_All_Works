import TaskCard from "./TaskCard";

function Column({
  title,
  tasks,
  color,
  columnId,
  deleteTask,
  onDragStart,
  onDrop,
}) {
  return (
    <div
      onDragOver={(e) =>
        e.preventDefault()
      }
      onDrop={() => onDrop(columnId)}
      className={`
      min-h-[600px]

      rounded-3xl

      border-t-4
      ${color}

      bg-white/50
      dark:bg-slate-800/50

      backdrop-blur-lg

      shadow-lg

      p-5
      `}
    >
      <div
        className="
        flex
        justify-between
        items-center

        mb-5
        "
      >
        <h2
          className="
          font-bold
          text-xl
          dark:text-white
          "
        >
          {title}
        </h2>

        <span
          className="
          px-3
          py-1

          rounded-full

          bg-slate-200
          dark:bg-slate-700

          text-sm
          "
        >
          {tasks.length}
        </span>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div
            className="
            text-center
            text-slate-400
            mt-20
            "
          >
            Drop tasks here
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columnId={columnId}
              deleteTask={deleteTask}
              onDragStart={onDragStart}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Column;