# COMP 3810 Group 4 

A web-based **System** built with **Express.js**, **MongoDB**, and **EJS** that allows users to manage daily tasks efficiently. Users can register, log in, and perform full **CRUD operations** on tasks with a clean and intuitive interface. The system also exposes **RESTful APIs** for programmatic task management.

---

## Group Members

| Member          | Student ID | Role                 | Email                        |
|-----------------|------------|----------------------|------------------------------|
| Chak Siu Hin    | 14029409   | Backend Developer    | s1402940@live.hkmu.edu.hk    |
| Chan Ching Hong | 13188865   | Frontend Developer   | S1318886@live.hkmu.edu.hk    |
| Hung On Tai     | 13188853   | Database Engineer    | s1318885@live.hkmu.edu.hk    |

---

## Project Description

The **System** enables users to:

- Register and log in securely using session-based authentication
- Create, view, update, and delete personal tasks
- Search and filter tasks by keyword or completion status
- Access task data via **RESTful APIs**

---

## Technologies Used

| Category           | Technology                     |
|--------------------|--------------------------------|
| Web Framework      | Express.js                     |
| Database           | MongoDB (via Mongoose)         |
| Frontend           | EJS Templates                  |
| Authentication     | cookie-session                 |
| Cloud Deployment   | Render (Server) + MongoDB Atlas |

---

## Features Implemented

### 1. Authentication
- Secure login & registration with `cookie-session`
- Protected routes — only authenticated users can access task pages
- Logout functionality available on all authenticated views

### 2. CRUD Web Pages
| Action  | Description |
|--------|-------------|
| **Create** | Add a new task with title and description |
| **Read**   | View all tasks with search and filter options |
| **Update** | Edit task details or mark as completed |
| **Delete** | Permanently remove unwanted tasks |

### 3. RESTful APIs

| Function | Method  | Endpoint            | Description                        |
|---------|--------|---------------------|------------------------------------|
| Read    | `GET`    | `/api/tasks`        | Retrieve all tasks for the user    |
| Create  | `POST`   | `/api/tasks`        | Add a new task                     |
| Update  | `PUT`    | `/api/tasks/:id`    | Update task by ID                  |
| Delete  | `DELETE` | `/api/tasks/:id`    | Delete task by ID                  |

> All API routes are protected and require an authenticated session.

---

## Installation & Setup

Follow these steps to run the project locally:

```bash
# 1. Clone the repository
git clone [https://github.com/group4/comp3810sef-group4.git](https://github.com/S1318885/comp3810sef-group4.git)
cd comp3810sef-group4

# 2. Install dependencies
npm install

# 3. Set up environment variables
npm start
