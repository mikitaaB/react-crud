# react-tasks-crud

## Description

A single-page application for task management. It includes CRUD operations for tasks, the ability to filter (status, priority, tag), sort (creation date, deadline), and search by title. On the main page, tasks are displayed as cards with detailed information and paginated via scrolling.

## Tech Stack
- **Frontend:** React, MUI, React Router v6, react-hook-form, zod, JSON Server, RTK Query, Vite


## How to run

1. Install node.js: https://nodejs.org/en/ (LTS)
2. Install dependencies
    ```
    npm install
    ```

3. Run the client in **dev** mode:
   ```
   npm run dev
   ```
   The application will available at http://localhost:5173.

4. Run the json server to simulate the backend:
    ```
    npm run start:db
    ```

    The server will be available at http://localhost:5000.

    #### Production build

- `npm run build` - build the production version
- `npm run preview` - run the production version


## Project architecture

**Routing** - React Router v6, lazy loading of pages, shared layout with navigation.

Routes:
- **`/`** - main page with the task list and filters
- **`/tasks/new`** - view a task
- **`/tasks/:id`** - view a task
- **`/tasks/:id/edit`** - edit a task

**Data** - Redux Toolkit + RTK Query: caching, API requests, tag-based invalidation.

**Backend** - JSON Server (`db.json`), port 5000.

Endpoints:

`GET/POST/PATCH/DELETE /tasks`,

`GET/POST /tags`.
