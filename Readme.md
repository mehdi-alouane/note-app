# Note Management Application

This project is a full-stack application for managing notes, built with NestJS backend and Vue.js 3 frontend. It includes features like creating, editing, deleting, and sharing notes, with authentication using JWT.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Setup and Installation](#setup-and-installation)
5. [Running the Application](#running-the-application)
6. [API Documentation](#api-documentation)
7. [Frontend](#frontend)
8. [Database](#database)
9. [WebSocket Server](#websocket-server)
10. [Troubleshooting](#troubleshooting)

## Features

- User authentication (signup, login, logout)
- Create, read, update, and delete notes
- Share notes with other users
- Real-time updates using WebSockets

## Tech Stack

- Backend: NestJS
- Frontend: Vue.js 3 with Composition API
- State Management: Pinia
- CSS Framework: Tailwind CSS
- Database: PostgreSQL
- Containerization: Docker
- API Documentation: Swagger

## Prerequisites

- Docker and Docker Compose
- Node.js and npm (for local development)

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/note-app.git
   cd note-app
   ```

2. Create a `.env` file in the root directory with the following content:
   ```
   DB_HOST=postgres
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_NAME=note_db
   JWT_SECRET=your_jwt_secret
   ```

3. Build and start the Docker containers:
   ```
   docker-compose up -d
   ```

This will start the backend server, frontend application, PostgreSQL database, and any other necessary services.

## Running the Application

After running `docker-compose up -d`, you can access:

- Frontend application: `http://localhost:8000`
- Backend API: `http://localhost:3000`
- API documentation (Swagger): `http://localhost:3000/docs`

## API Documentation

The API documentation is available using Swagger at `http://localhost:3000/docs`. This interactive documentation allows you to explore and test all available endpoints.

### Main Endpoints:

- POST `/auth/signup`: Create a new user account
- POST `/auth/login`: Authenticate a user and receive a JWT
- GET `/notes`: Retrieve all notes for the authenticated user
- POST `/notes`: Create a new note
- GET `/notes/:id`: Retrieve a specific note
- PUT `/notes/:id`: Update a specific note
- DELETE `/notes/:id`: Delete a specific note
- POST `/notes/:id/share`: Share a note with another user

Note: All note-related routes are protected and require a valid JWT token in the Authorization header.

## Frontend

The Vue.js frontend is accessible at `http://localhost:8000`. It uses:

- Vue.js 3 with Composition API for reactive components
- Pinia for state management
- Tailwind CSS for styling

Key features include:

- Authentication portal
- Note management interface (create, edit, delete, share)
- Real-time updates using WebSockets

## Database

The PostgreSQL database runs in a Docker container. The connection details are:

- Host: `postgres`
- Port: `5432`
- Username: `your_username` (as set in .env)
- Password: `your_password` (as set in .env)
- Database name: `note_db`

## WebSocket Server

The WebSocket server is integrated into the NestJS backend, providing real-time updates for note changes.

### WebSocket Gateway

The WebSocket gateway is implemented using NestJS's `@WebSocketGateway()` decorator. It handles real-time communication between the server and clients.

Key features:

- Listens on the same port as the HTTP server (3000)
- Provides events for note creation, updates, and deletion
- Authenticates connections using JWT tokens

### Connecting to WebSocket

Clients can connect to the WebSocket server at `ws://localhost:3000`. Authentication is required, so clients should include the JWT token in the connection request.

### WebSocket Events

The WebSocket server emits the following events:

- `noteCreated`: When a new note is created
- `noteUpdated`: When a note is updated
- `noteDeleted`: When a note is deleted

Clients can listen to these events to receive real-time updates.

## Testing WebSockets with Postman

You can use Postman to test the WebSocket functionality:

1. Open Postman and create a new WebSocket request.
2. Set the connection URL to `ws://localhost:3000`.
3. In the "Headers" tab, add your JWT token:
   - Key: `Authorization`
   - Value: `Bearer your_jwt_token_here`
4. Click "Connect" to establish the WebSocket connection.

Once connected, you can listen for events or send messages:

- To listen for events, add a listener in the "Messages" section:
  - Event name: `noteCreated` (or `noteUpdated`, `noteDeleted`)
  - Click "Add a listener"

- To send a message (if your implementation supports it):
  - In the "Messages" section, select "Message"
  - Enter your message in JSON format, e.g., `{"event": "createNote", "data": {"title": "New Note", "content": "This is a test note"}}`
  - Click "Send"

Remember to keep Postman open to maintain the WebSocket connection and receive real-time updates.

## Troubleshooting

1. If you encounter issues with Docker containers not starting:
   - Ensure Docker is running on your machine
   - Check for port conflicts
   - Run `docker-compose down` and then `docker-compose up -d` again

2. If the frontend can't connect to the backend:
   - Check that all containers are running with `docker-compose ps`
   - Verify the backend URL in the frontend configuration

3. For database connection issues:
   - Ensure the PostgreSQL container is running
   - Check the database credentials in the `.env` file

For any other issues, please check the logs using `docker-compose logs` or file an issue in the project repository.

