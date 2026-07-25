import * as studentService from "../services/studentService.js";

export const addStudent = async (req, res) => {

    try {

        const student = await studentService.addStudent(req.body);

        res.status(201).json({
            success: true,
            message: "Student added successfully.",
            data: student
        });

    } catch (err) {
        const statusCode = err.code === 11000 ? 409 : 400;

        res.status(statusCode).json({
            success: false,
            message: err.code === 11000 ? "Email already exists." : err.message
        });

    }
};

export const getStudents = async (req, res) => {

    try {

        const students = await studentService.getStudents(req.query.search);

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

export const getStudentById = async (req, res) => {

    try {

        const student = await studentService.getStudentById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found."
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

export const updateStudent = async (req, res) => {

    try {

        const student = await studentService.updateStudent(req.params.id, req.body);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found."
            });
        }

        res.json({
            success: true,
            message: "Student updated successfully.",
            data: student
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }
};

export const deleteStudent = async (req, res) => {

    try {

        const student = await studentService.deleteStudent(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found."
            });
        }

        res.json({
            success: true,
            message: "Student deleted successfully.",
            data: student
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};
