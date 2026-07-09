# 🎓 Student Management System (CRUD)

A full-stack **Student Management System** built using **Node.js, Express.js, MongoDB Atlas, Mongoose, EJS, Bootstrap 5, and Express Session**. The application allows an administrator to securely log in and perform complete **CRUD (Create, Read, Update, Delete)** operations on student records.

---

## 🚀 Features

- 🔐 Admin Login Authentication
- 🔒 Session-Based Authentication using Express Session
- ➕ Add New Student
- 📋 View Student Records
- ✏️ Update Student Details
- ❌ Delete Student Records
- 📱 Responsive Bootstrap 5 UI
- ☁️ MongoDB Atlas Integration
- 🌐 Environment Variable Configuration (.env)
- 📂 Clean MVC Project Structure

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- Bootstrap Icons
- EJS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- Express Session

### Development Tools
- VS Code
- Git
- GitHub
- Nodemon

---

## 📂 Project Structure

```
student-management-system-crud
│
├── models
│   ├── Admin.js
│   └── Student.js
│
├── views
│   ├── login.ejs
│   ├── students.ejs
│   ├── add.ejs
│   └── update.ejs
│
├── public
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/PratikKokane0627/student-management-system-crud.git
```

### 2. Navigate to the Project Folder

```bash
cd student-management-system-crud
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create a `.env` File

```env
PORT=3200

MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@studentmanagementcluster.mongodb.net/studentDB?retryWrites=true&w=majority&appName=StudentManagementCluster

SESSION_SECRET=studentmanagementsystemsecret
```

### 5. Start the Application

```bash
npm start
```

or

```bash
nodemon server.js
```

### 6. Open in Browser

```
http://localhost:3200/login
```

---

## 👤 Default Admin Credentials

Create an admin document in the **Admin** collection.

```json
{
  "name": "Administrator",
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

### Login Credentials

**Email**

```
admin@gmail.com
```

**Password**

```
admin123
```

---

## 📚 CRUD Operations

### ➕ Create
- Add a new student.

### 📖 Read
- View all students in a responsive table.

### ✏️ Update
- Modify student information.

### ❌ Delete
- Remove a student record.

---

## 🔐 Authentication Flow

```
Admin Login
      │
      ▼
Session Created
      │
      ▼
Student Dashboard
      │
      ├── Add Student
      ├── Update Student
      ├── Delete Student
      └── Logout
```

---

## 📦 NPM Packages Used

```json
{
  "dependencies": {
    "dotenv": "^17.x",
    "ejs": "^3.x",
    "express": "^5.x",
    "express-session": "^1.x",
    "mongoose": "^8.x"
  },
  "devDependencies": {
    "nodemon": "^3.x"
  }
}
```

---

## 🌟 Future Improvements

- Password Hashing with bcrypt
- JWT Authentication
- Search Students
- Pagination
- Dashboard Statistics
- Student Profile Image Upload
- Forgot Password
- Email Verification
- Role-Based Authentication

---

## 📖 Learning Outcomes

This project helped in understanding:

- Express.js Routing
- CRUD Operations
- MongoDB Atlas
- Mongoose Models
- Express Session Authentication
- EJS Template Engine
- Bootstrap 5 UI Design
- Environment Variables
- Git & GitHub Workflow
- MVC Project Structure

---

## 👨‍💻 Author

**Pratik Kokane**

- GitHub: https://github.com/PratikKokane0627

---

## ⭐ Repository

https://github.com/PratikKokane0627/student-management-system-crud

---

## 📄 License

This project is developed for **learning and educational purposes**.
