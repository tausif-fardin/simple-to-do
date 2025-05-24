# Frontend for To-Do Application

This directory contains the frontend implementation for the To-Do application.

## Technology Stack

- **HTML/CSS/JavaScript**: Pure front-end implementation with modern ES6+ syntax
- **Nginx**: Web server and API proxy

## Features

- Clean, responsive UI with modern design
- Task filtering (All, Active, Completed)
- Task completion toggling
- Task deletion (individual and batch clearing of completed)
- Task count indicator
- Error handling and loading states for API interactions

## Docker Details

The frontend is containerized using:
- Nginx:1.25.3-alpine as the base image
- Custom nginx.conf to proxy API requests to the backend service
- Optimized for production use

## Development

To run the frontend separately for development:

```bash
# From the project root
cd frontend

# Using a local web server (example with python)
python -m http.server -d static 8080

# Then access at http://localhost:8080
```

## Structure

- `static/` - Contains all static web assets
  - `index.html` - Main HTML file
  - `style.css` - CSS stylesheets
  - `script.js` - JavaScript for the application
- `nginx.conf` - Nginx configuration with API proxy settings
- `Dockerfile` - Container definition for the frontend

## How It Works

The frontend makes API calls to the backend service for all data operations. When running in Docker, the Nginx server proxies all `/api` requests to the backend service.
