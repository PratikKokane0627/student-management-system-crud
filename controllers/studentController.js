import * as studentService from "../services/studentService.js";

// Render Students Page
export const studentsPage = (req, res) => {
    res.render("students");
};

// Render Add Page
export const addPage = (req, res) => {
    res.render("add");
};

// Render Update Page
export const updatePage = (req, res) => {
    res.render("update");
};

// Add Student
export const addStudent = async (req, res) => {

    try {

        await studentService.addStudent(req.body);

        res.json({
            success: true,
            message: "Student added successfully."
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// Get All Students
export const getStudents = async (req, res) => {

    try {

        const students = await studentService.getStudents();

        res.json(students);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// Get Student By ID
export const getStudentById = async (req, res) => {

    try {

        const student = await studentService.getStudentById(req.params.id);

        res.json(student);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// Update Student
export const updateStudent = async (req, res) => {

    try {

        await studentService.updateStudent(req.params.id, req.body);

        res.json({
            success: true,
            message: "Student updated successfully."
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// Delete Student
export const deleteStudent = async (req, res) => {

    try {

        await studentService.deleteStudent(req.params.id);

        res.json({
            success: true,
            message: "Student deleted successfully."
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};