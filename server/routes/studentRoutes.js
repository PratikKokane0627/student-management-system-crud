import express from "express";

// Import authentication middleware
import auth from "../middleware/auth.js";

// Import student controller functions
import {
    studentsPage,
    addPage,
    updatePage,
    addStudent,
    getStudents,
    getStudentById,
    searchStudent,
    updateStudent,
    deleteStudent
} from "../controllers/studentController.js";

// Create a new router object
const router = express.Router();

// ======================================
// Student Page Routes (Protected)
// ======================================

// Display the students list page
router.get("/students-list", auth, studentsPage);

// Display the add student page
router.get("/add", auth, addPage);

// Display the update student page
// ':id' is the ID of the student to update
router.get("/update/:id", auth, updatePage);

// ======================================
// Student API Routes (Protected)
// ======================================

// Add a new student
router.post("/api/add-students", auth, addStudent);

// Get all students
router.get("/api/students", auth, getStudents);

// search student by name,city,course
router.get("/api/students/search", auth, searchStudent);

// Get a single student by ID
router.get("/api/students/:id", auth, getStudentById);


// Update a student by ID
router.put("/api/students/:id", auth, updateStudent);

// Delete a student by ID
router.delete("/api/students/:id", auth, deleteStudent);

// Export router
export default router;