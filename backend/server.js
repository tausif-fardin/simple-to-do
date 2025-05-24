// server.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data", "todos.json");

// Ensure data directory exists
const ensureDataDir = async () => {
    const dataDir = path.join(__dirname, "data");
    try {
        await fs.access(dataDir);
    } catch (error) {
        // Directory doesn't exist, create it
        await fs.mkdir(dataDir, { recursive: true });
        await fs.writeFile(DATA_FILE, JSON.stringify([]), "utf-8");
    }
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Read todos from file
const getTodos = async () => {
    try {
        await ensureDataDir();
        const data = await fs.readFile(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading todos file:", error);
        return [];
    }
};

// Write todos to file
const saveTodos = async (todos) => {
    try {
        await ensureDataDir();
        await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), "utf-8");
    } catch (error) {
        console.error("Error writing todos file:", error);
    }
};

// Routes
// Get all todos
app.get("/api/todos", async (req, res) => {
    try {
        const todos = await getTodos();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch todos" });
    }
});

// Add a new todo
app.post("/api/todos", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || text.trim() === "") {
            return res.status(400).json({ error: "Todo text is required" });
        }

        const todos = await getTodos();
        const newTodo = {
            id: uuidv4(),
            text,
            completed: false,
            createdAt: new Date(),
        };

        todos.push(newTodo);
        await saveTodos(todos);

        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: "Failed to create todo" });
    }
});

// Update a todo
app.put("/api/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;

        if (completed === undefined) {
            return res
                .status(400)
                .json({ error: "Completed status is required" });
        }

        const todos = await getTodos();
        const todoIndex = todos.findIndex((todo) => todo.id === id);

        if (todoIndex === -1) {
            return res.status(404).json({ error: "Todo not found" });
        }

        todos[todoIndex] = { ...todos[todoIndex], completed };
        await saveTodos(todos);

        res.json(todos[todoIndex]);
    } catch (error) {
        res.status(500).json({ error: "Failed to update todo" });
    }
});

// Delete a todo
app.delete("/api/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const todos = await getTodos();
        const filteredTodos = todos.filter((todo) => todo.id !== id);

        if (filteredTodos.length === todos.length) {
            return res.status(404).json({ error: "Todo not found" });
        }

        await saveTodos(filteredTodos);

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete todo" });
    }
});

// Delete all completed todos
app.delete("/api/todos", async (req, res) => {
    try {
        const todos = await getTodos();
        const activeTodos = todos.filter((todo) => !todo.completed);

        await saveTodos(activeTodos);

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: "Failed to clear completed todos" });
    }
});

// Start server
app.listen(PORT, async () => {
    await ensureDataDir();
    console.log(`Server running on http://localhost:${PORT}`);
});
