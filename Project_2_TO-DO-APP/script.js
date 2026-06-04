const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAll = document.getElementById("clearAll");
const searchInput = document.getElementById("searchInput");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// first render
renderTasks();

/* ---------------- ADD TASK ---------------- */

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("⚠️ Please write a task first!");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    taskInput.value = "";
    renderTasks();
}

/* ---------------- RENDER TASKS ---------------- */

function renderTasks() {
    taskList.innerHTML = "";

    const searchValue = searchInput.value.toLowerCase();

    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(searchValue)
    );

    filteredTasks.forEach((task) => {

        const index = tasks.indexOf(task); // FIXED IMPORTANT BUG

        const li = document.createElement("li");

        li.className = task.completed ? "task completed" : "task";

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">
                <button class="icon-btn" onclick="toggleTask(${index})">✔️</button>
                <button class="icon-btn" onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();

    document.getElementById("emptyState").style.display =
        tasks.length === 0 ? "block" : "none";
}

/* ---------------- TOGGLE COMPLETE ---------------- */

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks();
}

/* ---------------- DELETE TASK ---------------- */

function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}

/* ---------------- STATS ---------------- */

function updateStats() {
    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
}

/* ---------------- SAVE TO LOCAL STORAGE ---------------- */

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ---------------- CLEAR ALL ---------------- */

// clearAll.addEventListener("click", () => {
//     if (confirm("Delete all tasks?")) {
//         tasks = [];
//         saveTasks();
//         renderTasks();
//     }
// });

clearAll.addEventListener("click", () => {

    if (tasks.length === 0) {
        alert("No tasks to clear!");
        return;
    }

    if (confirm("Are you sure you want to delete all tasks?")) {
        tasks = [];
        saveTasks();
        renderTasks();

        alert("All tasks cleared successfully!");
    }
});


/* ---------------- SEARCH ---------------- */

searchInput.addEventListener("input", renderTasks);