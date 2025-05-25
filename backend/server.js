// server.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Define Todo Schema
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create Todo model
const Todo = mongoose.model("tasks", todoSchema);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
// Test route
app.get("/", (req, res) => {
    res.send("Todo API is running!");
});

// Get all todos
app.get("/api/todos", async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
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

        const newTodo = new Todo({
            text,
            completed: false,
        });

        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.error("Error creating todo:", error);
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
        
        // Validate that ID is present and valid
        if (!id || id === 'undefined' || id === 'null') {
            return res.status(400).json({ error: "Invalid todo ID" });
        }
        
        // Check if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid todo ID format" });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { completed },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json(updatedTodo);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Failed to update todo" });
    }
});

// Delete a todo
app.delete("/api/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate that ID is present and valid
        if (!id || id === 'undefined' || id === 'null') {
            return res.status(400).json({ error: "Invalid todo ID" });
        }
        
        // Check if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid todo ID format" });
        }
        
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.status(204).end();
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Failed to delete todo" });
    }
});

// Delete all completed todos
app.delete("/api/todos", async (req, res) => {
    try {
        await Todo.deleteMany({ completed: true });
        res.status(204).end();
    } catch (error) {
        console.error("Error clearing completed todos:", error);
        res.status(500).json({ error: "Failed to clear completed todos" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
