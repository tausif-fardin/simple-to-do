# Backend for To-Do App

This directory contains the backend implementation for the To-Do application.

## Technology Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for creating the API
- **File-based storage**: JSON file for data persistence
- **UUID**: For generating unique IDs for tasks
- **CORS**: For handling cross-origin requests in development

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `DELETE /api/todos` - Delete all completed todos

## Data Storage

Tasks are stored in a JSON file at `data/todos.json`. The file structure is:

```json
[
  {
    "id": "unique-uuid",
    "text": "Task description",
    "completed": false,
    "createdAt": "2025-05-24T12:00:00.000Z"
  }
]
```

## Docker Details

The backend is containerized using:
- node:18-alpine as the base image
- Volume mount for data persistence
- Exposed on port 8000

## Setup Outside Docker

```bash
# Install dependencies
npm install

# Start development server with hot-reload
npm run dev

# Start production server
npm start
```

The server runs on port 8000 by default. You can change this by setting the PORT environment variable.

## API Details

### GET /api/todos
Returns all todos as a JSON array.

### POST /api/todos
Creates a new todo.
- Required body: `{ "text": "Task description" }`
- Returns: The created todo object

### PUT /api/todos/:id
Updates a todo's completion status.
- Required body: `{ "completed": true|false }`
- Returns: The updated todo object

### DELETE /api/todos/:id
Deletes a specific todo.
- Returns: 204 No Content on success

### DELETE /api/todos
Deletes all completed todos.
- Returns: 204 No Content on success
