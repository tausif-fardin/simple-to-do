# Docker Full-Stack To-Do Application

Welcome to this learning repository. This project demonstrates how to containerize a full-stack web application (frontend and backend) using Docker and Docker Compose.

## Overview

This repository was created primarily to learn Docker containerization principles. It contains a to-do list application with:
- **Frontend**: HTML, CSS, and JavaScript with a modern UI
- **Backend**: Node.js Express API with RESTful endpoints
- **Docker**: Complete containerization of both services

## What You'll See Running

![To-Do List Application](frontend/public/readme/test-site-demo.png)

*The to-do list application running in Docker containers, with both frontend and backend services.*

## Architecture

```
┌─────────────┐      ┌─────────────┐
│   Frontend  │      │   Backend   │
│  (Nginx)    │─────▶│  (Node.js)  │
│   Port 80   │      │   Port 8000 │
└─────────────┘      └─────────────┘
       │                    │
       │                    │
       ▼                    ▼
┌──────────────────────────────────┐
│          Docker Network          │
└──────────────────────────────────┘
```

## Learning Focus

- **Multi-Container Applications:** Running frontend and backend services together
- **Docker Compose:** Defining and running multi-container Docker applications
- **Nginx Configuration:** Using Nginx as a web server and API proxy
- **Data Persistence:** Using volumes to persist data between container restarts
- **Container Communication:** Setting up networking between containers

## Prerequisites

- Docker installed on your system
- Basic understanding of terminal/command line
- A web browser for viewing the result

## Project Structure

```
├── frontend/                # Frontend application
│   ├── static/              # Static web files (HTML, CSS, JS)
│   ├── Dockerfile           # Frontend container definition
│   └── nginx.conf           # Nginx configuration with API proxy
│
├── backend/                 # Backend application
│   ├── server.js            # Express REST API server
│   ├── package.json         # Node.js dependencies
│   └── Dockerfile           # Backend container definition
│
└── docker-compose.yml       # Multi-container orchestration
```

## Docker Implementation Details

This project demonstrates several key Docker concepts:

1. **Multi-Container Applications:** Separating frontend and backend services
2. **API Gateway Pattern:** Using Nginx to proxy API requests to the backend
3. **Environment Variables:** Using environment variables for configuration
4. **Persistent Storage:** Using volumes to persist data between container restarts
5. **Docker Compose:** Orchestrating multiple containers with dependencies

## How to Use This Project

### Using Docker Compose (Recommended)

1. **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd test-site
    ```

2. **Build and Run with Docker Compose:**
    ```bash
    # Build and start both frontend and backend containers
    docker-compose up -d
    ```

3. **Access the Application:**
    Open your web browser and visit `http://localhost` to see the full-stack application running.

### Manual Container Building (Alternative)

If you want to build and run containers individually for learning purposes:

1. **Build and Run Backend:**
    ```bash
    # Build backend image
    docker build -t todo-backend ./backend
    
    # Run backend container
    docker run -d -p 8000:8000 --name todo-backend todo-backend
    ```

2. **Build and Run Frontend:**
    ```bash
    # Build frontend image
    docker build -t todo-frontend ./frontend
    
    # Run frontend container with backend connectivity
    docker run -d -p 80:80 --link todo-backend:backend --name todo-frontend todo-frontend
    ```

## Docker and Docker Compose Commands

Here are some useful commands to work with this project:

### Docker Compose Commands

```bash
# Start all services in detached mode
docker-compose up -d

# View logs of all containers
docker-compose logs

# View logs of a specific service
docker-compose logs frontend
docker-compose logs backend

# Stop all services
docker-compose stop

# Stop and remove containers, networks
docker-compose down

# Rebuild images and start containers
docker-compose up -d --build
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
docker rmi todo-frontend
docker rmi todo-backend

# View container logs
docker logs <container-id>

# Access shell in the containers
docker exec -it <frontend-container-id> /bin/sh
docker exec -it <backend-container-id> /bin/sh

# Inspect networks
docker network ls
docker network inspect <network-name>
```

## API Endpoints

The backend provides the following RESTful endpoints:

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo (requires JSON body with `text` field)
- `PUT /api/todos/:id` - Toggle completion status (requires JSON body with `completed` field)
- `DELETE /api/todos/:id` - Delete a specific todo
- `DELETE /api/todos` - Delete all completed todos

## Learning Takeaways

- How to containerize a full-stack JavaScript application
- Connecting frontend and backend containers with Docker networking
- Using Nginx as an API gateway/reverse proxy
- Managing persistent data with Docker volumes
- Understanding container orchestration with Docker Compose
- Separating concerns between services

## Further Learning

- Add authentication to the application
- Implement a real database (MongoDB, PostgreSQL) instead of JSON file storage
- Set up CI/CD pipelines for automated testing and deployment
- Implement Docker health checks
- Create development vs. production Docker environments
- Add monitoring and logging solutions

## Component-Specific Documentation

- [Frontend Documentation](frontend/README.md) - Details about the frontend implementation
- [Backend Documentation](backend/README.md) - Details about the backend API implementation

Happy containerizing!