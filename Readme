# Note App

An app for managing notes.

## Table of Contents

- [Setup Instructions](#setup-instructions)
  - [Running with Docker Compose](#running-with-docker-compose)
  - [Setting Up the Development Environment](#setting-up-the-development-environment)
- [Backend (Nest.js)](#backend-nestjs)
  - [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Database Setup](#database-setup)
- [Frontend (Vue.js)](#frontend-vuejs)
  - [Application Access](#application-access)
  - [State Management](#state-management)
  - [Styling](#styling)
- [API Endpoints](#api-endpoints)

## Setup Instructions

### Running with Docker Compose

1. Ensure Docker and Docker Compose are installed on your machine.
2. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>

Run the following command to start the application:

```bash
docker-compose up -d
```
This command will build and start the Nest.js backend, Vue.js frontend, and PostgreSQL database.


### Setting Up the Development Environment
1. Ensure Node.js and npm are installed on your machine.
2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### Configure environment variables:

- Create a .env file in the backend directory and set up necessary variables such as database connection details and JWT secret.


## Backend (Nest.js)

### API Documentation
- Swagger documentation is available at http://localhost:3000/docs.

### Authentication
- JWT authentication is implemented to secure routes.

### Database Setup
- PostgreSQL database is used. Ensure the database is configured with the correct credentials in the .env file.

## Frontend (Vue.js)

### Application Access
- Access the frontend application at http://localhost:8000.

### State Management
- Pinia is used for state management in the Vue.js application.

### Styling
- Tailwind CSS is utilized for styling frontend components.

## API Endpoints

- Document all API endpoints here, including their methods, paths, parameters, payloads, and responses. For example:

- POST /api/auth/login: Endpoint to authenticate and generate JWT token.
- GET /api/notes: Endpoint to retrieve all notes.
- POST /api/notes: Endpoint to create a new note.
- PUT /api/notes/:id: Endpoint to update a note.
- DELETE /api/notes/:id: Endpoint to delete a note.