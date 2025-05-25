# 🚀 Todo App Backend Service

This directory contains the robust, MongoDB-backed backend implementation for the Todo application.

## 💻 Technology Stack

- **Node.js**: JavaScript runtime for server-side execution
- **Express.js**: Fast, minimalist web framework for the API
- **MongoDB**: NoSQL database for data persistence
- **Mongoose**: Elegant MongoDB object modeling
- **dotenv**: Environment variable management
- **CORS**: Cross-Origin Resource Sharing middleware
- **Morgan**: HTTP request logger for API debugging

## 🔄 API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| GET | `/api/todos` | Get all todos | - | `200 OK` with array of todo objects |
| POST | `/api/todos` | Create a new todo | `{ "text": "Task description" }` | `201 Created` with new todo object |
| PUT | `/api/todos/:id` | Update a todo | `{ "completed": true\|false }` | `200 OK` with updated todo object |
| DELETE | `/api/todos/:id` | Delete a todo | - | `204 No Content` |
| DELETE | `/api/todos` | Delete all completed | - | `204 No Content` |

## 🗄️ Data Schema

Tasks are stored in MongoDB using the following schema:

```javascript
// Todo Schema
{
  _id: ObjectId,             // MongoDB document ID
  text: {
    type: String,           // Task description text
    required: true          // Text field is mandatory
  },
  completed: {
    type: Boolean,         // Task completion status
    default: false         // Default value is false
  },
  createdAt: {
    type: Date,            // Timestamp of creation
    default: Date.now      // Default to current time
  }
}
```

## 🐳 Docker Implementation

The backend is containerized using:
- **Base Image**: `node:18-alpine` for minimal size and security
- **Environment Variables**: Configurable via `.env` file
- **MongoDB Connection**: Connects to the MongoDB container
- **Exposed Port**: Service available on port 8000

## 🛠️ Local Development Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env file to configure MongoDB connection

# Start development server with hot-reload
npm run dev

# Start production server
npm start
```

The server runs on port 8000 by default. You can change this by setting the PORT environment variable.

## 🔍 API Error Handling

The API implements robust error handling with appropriate HTTP status codes:

- **400 Bad Request**: Invalid input data
- **404 Not Found**: Todo item not found
- **500 Server Error**: Internal server issues

Example error response:
```json
{
  "error": "Todo not found"
}
```

## 🧪 MongoDB Connection

The application uses Mongoose to connect to MongoDB with the following features:

- Connection string configured via environment variables
- Proper error handling for failed connections
- Connection logging for debugging
- MongoDB ObjectId validation

## 🔒 Security Considerations

- Environment variables for sensitive information
- Input validation to prevent injection attacks
- CORS configuration for frontend access
- No sensitive data exposure in responses
