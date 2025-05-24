# Test Site Docker-Integrated Frontend Application

Welcome to the **Test Site** repository. This project serves as a demonstration of integrating Docker with a frontend application.

## Overview

This repository contains a simple frontend application used to showcase Docker integration. The primary objective is to test the containerization process and ensure that the application's frontend components run seamlessly in a Docker environment.

## Application Preview

![Test Site To-Do List Application](frontend/public/readme/test-site-demo.png)

*The image above shows the UI of the application after running it - a modern, interactive to-do list application.*

## Features

- **Docker Integration:** Run the application within containers for consistency across development environments.
- **Frontend Testing:** Basic testing for UI components in a containerized setup.
- **Easy Setup:** Clear instructions to get your Docker environment up and running.
- **Interactive To-Do List:** A feature-rich to-do application with task management capabilities.

## Prerequisites

- Docker installed on your system.
- Basic understanding of Docker commands.
- A modern web browser for testing the frontend.

## Setup Instructions

1. **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd test-site
    ```

2. **Build the Docker Image:**
    ```bash
    docker build -t test-site-app .
    ```

3. **Run the Docker Container:**
    ```bash
    docker run -d -p 80:80 test-site-app
    ```

4. **Access the Application:**
    Open your web browser and visit `http://localhost` to see the application in action.

## Usage

- Modify frontend sources as needed.
- Rebuild the Docker image to apply changes.
- Use Docker logs to troubleshoot any potential issues:
    ```bash
    docker logs <container-id>
    ```

## Contributing

Feel free to fork the repository and submit a pull request if you have improvements or fixes.

Happy coding!