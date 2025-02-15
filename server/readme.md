# Task Manager Backend

## Overview

This is the backend service for the Task Manager web application. It provides a RESTful API built with **Express.js/NestJS** for user authentication, profile management, and task management. The backend includes secure authentication, password recovery functionality, and CRUD operations for tasks.

## Features

- **User Authentication**
  - Register new users
  - Login with JWT-based authentication
  - Forgot and reset password functionality
  - Secure API endpoints for user profile management
  - JWT-based authentication and authorization
  - Email verification and password reset functionality
  - Password hashing using **bcrypt**
- **User Profile Management**

  - View user profile
  - Update user profile

- **Task Management**

  - Create, read, update, and delete tasks
  - Task association with authenticated users

- **Security Features**
  - Password hashing using **bcrypt**
  - JWT-based authentication and authorization
  - Input validation to prevent malicious requests
  - Error handling for common HTTP status codes
  - Middleware-based authentication guard
  - CORS support for cross-origin requests
  - Logging with **morgan**
  - Environment variables for configuration
  - Unit tests for authentication and task management
  - Integration tests for API endpoints
  - Documentation for API endpoints

## Tech Stack

- **Node.js**
- **Express.js/NestJS**
- **MongoDB**
- **JWT for authentication**
- **bcrypt for password hashing**

## Installation

### Prerequisites

- Node.js installed
- MongoDB running

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com:muhammadranju/task-management.git
   cd task-management/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```env
    PORT=5000
    JWT_SECRET=your_secret_key
    JWT_SECRET="******YOUR_JWT_SECRET***********
    MONGO_URL="mongodb://127.0.0.1:27017/task-manager"
    NODE_ENV="development"
    FRONTEND_URL="http://localhost:5173"
    EMAIL_USER="USER_EMAIL"
    EMAIL_PASS="YOUR_EMAIL_PASSWORD"
   ```

````
4. Start the server:
```bash
npm start
````

## API Endpoints

### Authentication & User Management

| Method | Endpoint                | Description                       |
| ------ | ----------------------- | --------------------------------- |
| POST   | `/auth/register`        | Register a new user               |
| POST   | `/auth/login`           | Authenticate user and return JWT  |
| GET    | `/auth/profile`         | Get authenticated user profile    |
| PUT    | `/auth/profile`         | Update authenticated user profile |
| POST   | `/auth/forgot-password` | Send reset password link          |
| POST   | `/auth/reset-password`  | Reset password using token        |

### Task Management (Protected Routes)

| Method | Endpoint     | Description                              |
| ------ | ------------ | ---------------------------------------- |
| GET    | `/tasks`     | Get all tasks for the authenticated user |
| GET    | `/tasks/:id` | Get a specific task by ID                |
| POST   | `/tasks`     | Create a new task                        |
| PUT    | `/tasks/:id` | Update an existing task                  |
| DELETE | `/tasks/:id` | Delete a task                            |

## Security Measures

- **JWT authentication** for secure API access
- **Bcrypt password hashing** to protect user credentials
- **Middleware-based authentication guard**
- **Validation for API request payloads**

## Error Handling

- Returns appropriate HTTP status codes for errors:
  - `400` Bad Request
  - `401` Unauthorized
  - `404` Not Found
  - `500` Internal Server Error

## Optional Enhancements

- Implement pagination for task lists
- Filter tasks by status or due date
- Real-time updates using WebSockets
- Add unit tests for authentication and task management

## Deployment

- **Hosting:** Deploy on **Vercel**
- **Database:** Use **MongoDB Atlas**
