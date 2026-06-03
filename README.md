# Student Task Manager

A beginner-friendly full-stack web application demonstrating React, Node.js, Express, and SQLite working together.

---

## Tech Stack

| Layer    | Technology                                   |
|----------|----------------------------------------------|
| Frontend | React 18, Vite, Tailwind CSS, React Router   |
| Backend  | Node.js 26, Express.js, express-validator    |
| Database | SQLite via built-in `node:sqlite` module     |

---

## Features

- Add, view, edit, and delete tasks
- Mark tasks as completed
- Dashboard with total / completed / pending counts + progress bar
- Search tasks by keyword
- Filter by status (All / Pending / Completed)
- Pagination (8 tasks per page)
- Dark mode toggle

---

## Project Structure

```
Instaautomation/
├── backend/
│   ├── database/
│   │   └── db.js            ← SQLite connection & table creation
│   ├── models/
│   │   └── task.js          ← SQL queries (CRUD operations)
│   ├── controllers/
│   │   └── taskController.js ← Request/response handlers
│   ├── routes/
│   │   └── taskRoutes.js    ← URL path → controller mapping
│   └── server.js            ← Express app entry point
│
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js       ← All axios HTTP calls
│   │   ├── components/
│   │   │   ├── Navbar.jsx   ← Navigation bar
│   │   │   ├── TaskForm.jsx ← Reusable add/edit form
│   │   │   └── TaskTable.jsx ← Task list table
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx ← Stats overview
│   │   │   ├── TaskList.jsx  ← All tasks with search/filter
│   │   │   └── AddTask.jsx   ← Create new task
│   │   ├── App.jsx          ← Router setup & dark mode state
│   │   ├── main.jsx         ← React root mount
│   │   └── index.css        ← Tailwind imports
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

---

## Prerequisites

- **Node.js 22+** (Node 26 recommended — uses built-in `node:sqlite`)
- npm

---

## Quick Start

### 1. Start the Backend

```bash
cd backend
npm install
npm start
```

The API will be available at: `http://localhost:3001`

### 2. Start the Frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
```

The app will open at: `http://localhost:3000`

> The Vite dev server proxies `/api` requests to `http://localhost:3001` automatically, so no CORS issues.

---

## REST API Reference

| Method | Endpoint                  | Description           |
|--------|---------------------------|-----------------------|
| GET    | `/api/tasks`              | Get all tasks         |
| GET    | `/api/tasks/stats`        | Get dashboard counts  |
| GET    | `/api/tasks/:id`          | Get one task          |
| POST   | `/api/tasks`              | Create a task         |
| PUT    | `/api/tasks/:id`          | Update title/desc     |
| PATCH  | `/api/tasks/:id/complete` | Mark as completed     |
| DELETE | `/api/tasks/:id`          | Delete a task         |

### Example: Create a Task

```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Study for exam", "description": "Chapters 1-5"}'
```

---

## How the Full Stack Works

```
Browser (React)
    |
    |  HTTP Request (axios)
    ↓
Express Server (Node.js)
    |
    |  Route → Controller → Model
    ↓
SQLite Database (node:sqlite)
    |
    |  SQL Query Result
    ↓
Express → JSON Response
    |
    ↓
React → Updates UI State → Re-renders
```

### Learning Concepts

| Concept            | Where to look                             |
|--------------------|-------------------------------------------|
| React useState     | `TaskList.jsx`, `TaskForm.jsx`            |
| React useEffect    | `Dashboard.jsx`, `TaskList.jsx`           |
| React Router       | `App.jsx`, `Navbar.jsx`                   |
| Axios API calls    | `services/api.js`                         |
| Express routing    | `routes/taskRoutes.js`                    |
| Validation middleware | `routes/taskRoutes.js`, `controllers/` |
| SQL CRUD           | `models/task.js`                          |
| Database setup     | `database/db.js`                          |

---

## Development Scripts

### Backend

| Command       | Description                     |
|---------------|---------------------------------|
| `npm start`   | Start server (production)       |
| `npm run dev` | Start with nodemon (auto-reload)|

### Frontend

| Command          | Description                       |
|------------------|-----------------------------------|
| `npm run dev`    | Start Vite dev server (port 3000) |
| `npm run build`  | Build for production              |
| `npm run preview`| Preview production build          |
