document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    const tasksCount = document.getElementById("tasksCount");
    const clearCompletedBtn = document.getElementById("clearCompletedBtn");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // API URL - change when deploying to production
    const API_URL = "http://localhost:8000/api";

    let currentFilter = "all";
    let tasks = [];

    // Initialize the app
    function init() {
        fetchTasks(); // Fetch tasks from backend

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

    // Fetch all tasks from backend
    async function fetchTasks() {
        try {
            showLoader();
            const response = await fetch(`${API_URL}/todos`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            tasks = await response.json();
            renderTasks();
            updateTaskCount();
        } catch (error) {
            showError("Failed to fetch tasks");
            console.error("Error fetching tasks:", error);
        } finally {
            hideLoader();
        }
    }

    // Add new task
    async function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            try {
                showLoader();
                const response = await fetch(`${API_URL}/todos`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: taskText }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const newTask = await response.json();
                tasks.push(newTask);
                renderTasks();
                updateTaskCount();

                taskInput.value = "";
                taskInput.focus();
            } catch (error) {
                showError("Failed to add task");
                console.error("Error adding task:", error);
            } finally {
                hideLoader();
            }
        }
    }

    // Toggle task completion status
    async function toggleTask(taskId) {
        try {
            const task = tasks.find((t) => t.id === taskId);
            if (!task) return;

            showLoader();
            const response = await fetch(`${API_URL}/todos/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: !task.completed }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            tasks = tasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            });

            renderTasks();
            updateTaskCount();
        } catch (error) {
            showError("Failed to update task");
            console.error("Error updating task:", error);
        } finally {
            hideLoader();
        }
    }

    // Delete a task
    async function deleteTask(taskId) {
        try {
            showLoader();
            const response = await fetch(`${API_URL}/todos/${taskId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            tasks = tasks.filter((task) => task.id !== taskId);
            renderTasks();
            updateTaskCount();
        } catch (error) {
            showError("Failed to delete task");
            console.error("Error deleting task:", error);
        } finally {
            hideLoader();
        }
    }

    // Clear completed tasks
    async function clearCompleted() {
        try {
            showLoader();
            const response = await fetch(`${API_URL}/todos`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            tasks = tasks.filter((task) => !task.completed);
            renderTasks();
            updateTaskCount();
        } catch (error) {
            showError("Failed to clear completed tasks");
            console.error("Error clearing completed tasks:", error);
        } finally {
            hideLoader();
        }
    }

    // Helper functions for UI feedback
    function showLoader() {
        // For simplicity, we'll just disable the add button to indicate loading
        addTaskButton.disabled = true;
        addTaskButton.textContent = "Loading...";
    }

    function hideLoader() {
        addTaskButton.disabled = false;
        addTaskButton.innerHTML = '<i class="fas fa-plus"></i> Add';
    }

    function showError(message) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.textContent = message;

        const container = document.querySelector(".container");
        container.insertBefore(errorDiv, taskInput.parentElement);

        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
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
