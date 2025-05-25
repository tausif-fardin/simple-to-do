# 🚀 Dockerized Full-Stack To-Do Application

A professional-grade containerized application demonstrating modern web development and DevOps practices.

## Overview

This project showcases a complete microservices architecture with:
- **Frontend**: HTML5, CSS3, and JavaScript ES6+ with a modern, responsive UI
- **Backend**: Node.js Express API with RESTful endpoints and MongoDB integration
- **Database**: MongoDB NoSQL database with persistent storage
- **DevOps**: Complete containerization using Docker and Docker Compose

## What You'll See Running

![To-Do List Application](frontend/public/readme/test-site-demo.png)

*The to-do list application running in Docker containers with three microservices: frontend, backend, and database.*

## Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │      │   Backend   │      │  Database   │
│  (Nginx)    │─────▶│  (Node.js)  │─────▶│  (MongoDB)  │
│   Port 8080 │      │   Port 8000 │      │   Port 27017│
└─────────────┘      └─────────────┘      └─────────────┘
       │                    │                    │
       │                    │                    │
       ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────┐
│                   Docker Network                    │
└─────────────────────────────────────────────────────┘
```

## 🔧 Technical Highlights

- **Microservices Architecture:** Separate frontend, backend, and database services
- **Docker Compose:** Orchestrating multiple containers with dependencies
- **Nginx as API Gateway:** Configured as a reverse proxy for backend communication
- **MongoDB Integration:** NoSQL database with Mongoose ODM
- **Data Persistence:** Docker volumes for persisting database between container restarts
- **Environment Configuration:** Secure credential management
- **Container Networking:** Proper service discovery and communication

## Prerequisites

- Docker and Docker Compose installed on your system
- Basic understanding of terminal/command line
- A web browser for viewing the application

## 🧰 Project Structure

```
├── frontend/                # Frontend application
│   ├── static/              # Static web files (HTML, CSS, JS)
│   ├── Dockerfile           # Frontend container definition
│   └── nginx.conf           # Nginx configuration with API proxy
│
├── backend/                 # Backend application
│   ├── server.js            # Express REST API server with MongoDB
│   ├── package.json         # Node.js dependencies
│   ├── .env                 # Environment configuration
│   └── Dockerfile           # Backend container definition
│
├── mongodb/                 # MongoDB configuration
│   └── .env                 # Database credentials
│
└── docker-compose.yml       # Multi-container orchestration
```

## 📚 Implementation Details

This project demonstrates several key concepts in modern web application development:

1. **Three-Tier Architecture:** Clean separation of presentation, logic, and data layers
2. **API Gateway Pattern:** Using Nginx to proxy API requests to the backend
3. **Database Integration:** MongoDB with Mongoose for structured data access
4. **Environment Variables:** Secure configuration management for different environments
5. **Persistent Storage:** Using Docker volumes to persist MongoDB data
6. **Docker Compose Orchestration:** Managing multi-container deployment
7. **RESTful API Design:** Well-structured endpoints following REST principles

## 🚀 Deployment Instructions

### Using Docker Compose (Recommended)

1. **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd test-site
    ```

2. **Configure Environment Variables:**
    ```bash
    # MongoDB environment configuration is already set up in mongodb/.env
    # You can modify these values if needed
    ```

3. **Build and Run with Docker Compose:**
    ```bash
    # Build and start all services (frontend, backend, and MongoDB)
    docker-compose up -d
    ```

4. **Access the Application:**
    Open your web browser and visit `http://localhost:8080` to see the full-stack application running.

### Manual Container Building (For Advanced Users)

If you want to build and run containers individually:

1. **Create a Docker Network:**
    ```bash
    docker network create todo-app-network
    ```

2. **Run MongoDB Container:**
    ```bash
    docker run -d --name mongodb \
      --network todo-app-network \
      -v mongodb_data:/data/db \
      -e MONGO_INITDB_ROOT_USERNAME=admin \
      -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
      mongo:8.0
    ```

3. **Build and Run Backend:**
    ```bash
    # Build backend image
    docker build -t todo-backend ./backend
    
    # Run backend container
    docker run -d --name todo-backend \
      --network todo-app-network \
      -p 8000:8000 \
      -e MONGODB_URI=mongodb://admin:admin123@mongodb:27017/todoapp?authSource=admin \
      todo-backend
    ```

4. **Build and Run Frontend:**
    ```bash
    # Build frontend image
    docker build -t todo-frontend ./frontend
    
    # Run frontend container
    docker run -d --name todo-frontend \
      --network todo-app-network \
      -p 8080:80 \
      todo-frontend
    ```

## ⚙️ DevOps Commands Reference

Here are some useful commands for managing this containerized application:

### Docker Compose Commands

```bash
# Start all services in detached mode
docker-compose up -d

# View logs of all containers
docker-compose logs

# View logs of a specific service
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongo

# Stop all services
docker-compose stop

# Stop and remove containers, networks (preserves volumes)
docker-compose down

# Stop and remove containers, networks AND volumes
docker-compose down -v

# Rebuild images and start containers
docker-compose up -d --build

# Check container status
docker-compose ps
```

### Individual Docker Commands

```bash
# List all running containers
docker ps

# Stop a running container
docker stop <container-id>

# Remove a container
docker rm <container-id>

# List all images
docker images

# Remove images
docker rmi test-site-frontend
docker rmi test-site-backend

# View container logs
docker logs <container-id>

# Access shell in the containers
docker exec -it test-site-frontend /bin/sh
docker exec -it test-site-backend /bin/sh
docker exec -it test-site-mongodb mongosh -u admin -p admin123

# Inspect volumes
docker volume ls
docker volume inspect mongodb-data

# Inspect networks
docker network ls
docker network inspect test-site_default
```

## 📊 API Documentation

### RESTful Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| GET | `/api/todos` | Get all todos | - | Array of todo objects |
| POST | `/api/todos` | Create new todo | `{ "text": "Task" }` | Created todo object |
| PUT | `/api/todos/:id` | Update todo | `{ "completed": true\|false }` | Updated todo object |
| DELETE | `/api/todos/:id` | Delete todo | - | `204 No Content` |
| DELETE | `/api/todos` | Delete completed | - | `204 No Content` |

### Data Schema

```javascript
{
  _id: ObjectId,         // MongoDB document ID
  text: String,          // Task description
  completed: Boolean,    // Task completion status
  createdAt: Date        // Task creation timestamp
}
```

## 🧠 Key Learnings Demonstrated

- **Microservices Architecture**: Properly separating concerns between services
- **MongoDB Integration**: Using a proper database instead of file-based storage
- **Docker Compose**: Orchestrating multiple containers with proper dependencies
- **Nginx Configuration**: Setting up an API gateway/reverse proxy pattern
- **Environment Management**: Securing credentials in environment files
- **Volume Persistence**: Ensuring database data persists across container restarts
- **Container Networking**: Establishing proper communication between services
- **Modern JavaScript**: ES6+ syntax and async/await for clean code structure

## 📈 Future Enhancements

- Add user authentication and authorization
- Implement automated testing with CI/CD pipelines
- Add Docker health checks for improved reliability
- Create separate development and production environments
- Implement API versioning for better maintainability
- Add monitoring and logging solutions for production use
- Implement WebSockets for real-time updates

## 📚 Documentation Links

- [Frontend Documentation](frontend/README.md) - Details about the frontend implementation
- [Backend Documentation](backend/README.md) - Details about the backend API implementation

---

Developed with ❤️ using modern containerization practices and microservices architecture