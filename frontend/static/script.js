document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    const tasksCount = document.getElementById("tasksCount");
    const clearCompletedBtn = document.getElementById("clearCompletedBtn");
    const filterButtons = document.querySelectorAll(".filter-btn");

    let currentFilter = "all";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Initialize the app
    function init() {
        renderTasks();
        updateTaskCount();

        // Add event listeners
        addTaskButton.addEventListener("click", addTask);
        taskInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                addTask();
            }
        });

        clearCompletedBtn.addEventListener("click", clearCompleted);

        filterButtons.forEach((btn) => {
            btn.addEventListener("click", function () {
                filterButtons.forEach((b) => b.classList.remove("active"));
                this.classList.add("active");
                currentFilter = this.dataset.filter;
                renderTasks();
            });
        });
    }

    // Add new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false,
                createdAt: new Date(),
            };

            tasks.push(newTask);
            saveTasks();
            renderTasks();
            updateTaskCount();

            taskInput.value = "";
            taskInput.focus();
        }
    }

    // Toggle task completion status
    function toggleTask(taskId) {
        tasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });

        saveTasks();
        renderTasks();
        updateTaskCount();
    }

    // Delete a task
    function deleteTask(taskId) {
        tasks = tasks.filter((task) => task.id !== taskId);
        saveTasks();
        renderTasks();
        updateTaskCount();
    }

    // Clear completed tasks
    function clearCompleted() {
        tasks = tasks.filter((task) => !task.completed);
        saveTasks();
        renderTasks();
        updateTaskCount();
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Render tasks based on current filter
    function renderTasks() {
        taskList.innerHTML = "";

        const filteredTasks = tasks.filter((task) => {
            if (currentFilter === "active") return !task.completed;
            if (currentFilter === "completed") return task.completed;
            return true; // 'all' filter
        });

        if (filteredTasks.length === 0) {
            const emptyMessage = document.createElement("li");
            emptyMessage.style.textAlign = "center";
            emptyMessage.style.color = "#9ca3af";
            emptyMessage.style.padding = "20px";
            emptyMessage.textContent =
                currentFilter === "all"
                    ? "No tasks yet! Add one above."
                    : `No ${currentFilter} tasks.`;
            taskList.appendChild(emptyMessage);
            return;
        }

        filteredTasks.forEach((task) => {
            const li = document.createElement("li");
            if (task.completed) {
                li.classList.add("completed");
            }

            // Create checkbox
            const checkbox = document.createElement("span");
            checkbox.classList.add("checkbox");
            if (task.completed) {
                checkbox.innerHTML = '<i class="fas fa-check"></i>';
            }
            checkbox.addEventListener("click", () => toggleTask(task.id));

            // Create task text
            const taskText = document.createElement("span");
            taskText.classList.add("task-text");
            taskText.textContent = task.text;

            // Create delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteTask(task.id);
            });

            // Create actions container
            const actions = document.createElement("div");
            actions.classList.add("task-actions");
            actions.appendChild(deleteBtn);

            // Append all elements
            li.appendChild(checkbox);
            li.appendChild(taskText);
            li.appendChild(actions);

            taskList.appendChild(li);
        });
    }

    // Update task count in the UI
    function updateTaskCount() {
        const activeCount = tasks.filter((task) => !task.completed).length;
        tasksCount.textContent = `${activeCount} task${
            activeCount !== 1 ? "s" : ""
        } remaining`;
    }

    // Initialize the app
    init();
});
