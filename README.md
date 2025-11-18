# COMP 3810 Group 4 

# Task Manager with Authentication (Local + Google OAuth)

A full-stack **Task Management Application** built with **Node.js, Express, MongoDB, Passport.js**, and **EJS templating**. Supports both local username/password login and Google OAuth 2.0 authentication.

Live Demo: [https://comp3810sef-group4.onrender.com ](https://comp3810sef-group4.onrender.com) 

(Hosted on Render – may take a few seconds to wake up)

---

## Group Members

| Member          | Student ID | Role                 | Email                        |
|-----------------|------------|----------------------|------------------------------|
| Chak Siu Hin    | 14029409   | Backend Developer    | s1402940@live.hkmu.edu.hk    |
| Chan Ching Hong | 13188865   | Frontend Developer   | S1318886@live.hkmu.edu.hk    |
| Hung On Tai     | 13188853   | Database Engineer    | s1318885@live.hkmu.edu.hk    |

---

## Project Description

### Features

- User registration & login (local)
- Google OAuth Login
- Create, Read, Update, Delete (CRUD) tasks
- Mark tasks as completed/pending
- Search tasks by title
- Filter by status (All / Pending / Completed)
- Sort by newest or oldest
- Fully responsive design (mobile-friendly)
- RESTful API endpoints for tasks
- Secure password hashing with bcrypt
- Session-based authentication

### Tech Stack

| Technology             | Purpose                          |
|-----------------------|-----------------------------------|
| Node.js + Express     | Backend server                   |
| MongoDB + Mongoose    | Database & ODM                   |
| EJS                   | Server-side templating           |
| Passport.js           | Authentication (Local + Google)  |
| bcrypt                | Password hashing                 |
| express-session       | Session management               |
| Render                | Deployment (free tier)           |

---

### Project Structure
├── app.js                  # Main server file
├── config/
│   └── passport.js         # Passport Google Strategy
├── models/
│   ├── task.js             # Task Schema
│   └── user.js             # User Schema
├── views/                  # EJS templates
│   ├── login.ejs
│   ├── register.ejs
│   ├── crud.ejs
│   └── edit.ejs
├── public/
│   └── style.css           # Full custom styling
├── package.json
└── README.md


---

### Local Setup (Development)
 **Clone the repository**
   ```bash
   # 1. Clone the repo
git clone https://github.com/your-username/task-manager-auth.git
cd task-manager-auth

# 2. Install dependencies
npm install

# 3. Start the server
npm start
   ```

RESTful API Endpoints (for testing with cURL/Postman)
```bash
# Get all tasks
curl http://localhost:3000/api/tasks

# Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"API Task","description":"Created via cURL","completed":false,"userId":"670000000000000000000001"}'

# Update task
curl -X PUT http://localhost:3000/api/tasks/671f58a9d3f4b8a1e4f5c678 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated via API","completed":true}'

# Delete task
curl -X DELETE http://localhost:3000/api/tasks/671f58a9d3f4b8a1e4f5c678
```


  
