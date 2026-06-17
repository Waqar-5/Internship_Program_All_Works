import { useEffect, useState } from "react";

import Header from "./components/Header";
import Column from "./components/Column";
import AddTaskModal from "./components/AddTaskModal";
import "./index.css";

const defaultTasks = {
  todo: [],
  doing: [],
  done: [],
};

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanbanTasks");
    return saved ? JSON.parse(saved) : defaultTasks;
  });

  const [showModal, setShowModal] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);

  // ⭐ DARK MODE STATE (ADD THIS)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  // ⭐ DARK MODE EFFECT (IMPORTANT)
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const addTask = (title, priority) => {
    const newTask = {
      id: Date.now(),
      title,
      priority,
      createdAt: new Date().toLocaleDateString(),
    };

    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  };

  const deleteTask = (columnId, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter(
        (task) => task.id !== taskId
      ),
    }));
  };

  const handleDragStart = (task, sourceColumn) => {
    setDraggedTask({ task, sourceColumn });
  };

  const handleDrop = (targetColumn) => {
    if (!draggedTask) return;

    const { task, sourceColumn } = draggedTask;

    if (sourceColumn === targetColumn) return;

    setTasks((prev) => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(
        (item) => item.id !== task.id
      ),
      [targetColumn]: [...prev[targetColumn], task],
    }));

    setDraggedTask(null);
  };

  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        dark:bg-slate-900
        transition-all duration-300
      "
    >
      <Header
        openModal={() => setShowModal(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="max-w-7xl mx-auto p-5">
        <div className="grid md:grid-cols-3 gap-6">

          <Column
            title="To Do"
            color="border-blue-500"
            tasks={tasks.todo}
            columnId="todo"
            deleteTask={deleteTask}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />

          <Column
            title="Doing"
            color="border-yellow-500"
            tasks={tasks.doing}
            columnId="doing"
            deleteTask={deleteTask}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />

          <Column
            title="Done"
            color="border-green-500"
            tasks={tasks.done}
            columnId="done"
            deleteTask={deleteTask}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />

        </div>
      </main>

      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          addTask={addTask}
        />
      )}
    </div>
  );
}

export default App;