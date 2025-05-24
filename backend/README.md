# Backend for To-Do App

This directory contains the backend implementation for the To-Do application.

## Stack

- Node.js
- Express.js
- File-based storage (JSON)

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `DELETE /api/todos` - Delete all completed todos

## Setup

```bash
# Install dependencies
npm install

# Start development server with hot-reload
npm run dev

# Start production server
npm start
```

The server runs on port 3000 by default. You can change this by setting the PORT environment variable.
