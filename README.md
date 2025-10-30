Task Reminder System
A web-based application that helps users manage and keep track of their daily task. The system supports user to login and authentication System is built with Express.js, MongoDb and EJS.

Group Members
Member	Student ID	Role	Email
Chak Siu Hin	14029409	Backend Developer	s1402940@live.hkmu.edu.hk
Chan Ching Hong	13188865	Frontend Developer	S1318886@live.hkmu.edu.hk
Hung On Tai	13188853	Database Engineer	s1318885@live.hkmu.edu.hk
Project Description
The Task Reminder System allows user to: - Login, Register an account to access task database - Create, view, update, and delete tasks - Access RESTful APIs for task operations

Technologies Used
Category	Technology
Web Framework	Express.js
Database	MongoDB (via Mongoose)
Frontend	EJS Templates
Authentication	Cookie-session
Cloud Deployment	Render (for server) + MongoDB Atlas (for database)
Features Implemented
1. Authentication
Login and logout using cookie-session.
Only logged-in users can access CRUD pages.
Logout function is available in all authenticated pages.
2. CRUD Web Pages
Create: Add a new task with title and description.
Read: View task list and search by keyword or set the filter.
Update: Edit task details or mark as completed.
Delete: Remove tasks that are no longer needed.
3. RESTful APIs
Function	HTTP Method	Endpoint	Description
Read	GET	/api/tasks	Retrieve all tasks
Create	POST	/api/tasks	Add a new task
Update	PUT	/api/tasks/:id	Update an existing task
Delete	DELETE	/api/tasks/:id	Delete a task by ID
Installation & Setup
```bash

1. Clone the project
git clone https://github.com/group4/comp3810sef-group4 cd comp3810sef-group4

2. Install dependencies
npm install

3. Run the server
npm start
