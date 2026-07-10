import Student from "../models/Student.js";

// Add Student
export const addStudent = async (studentData) => {
    return await Student.create(studentData);
};

// Get All Students
export const getStudents = async () => {
    return await Student.find();
};

// Get Student By ID
export const getStudentById = async (id) => {
    return await Student.findById(id);
};

// Update Student
export const updateStudent = async (id, studentData) => {
    return await Student.findByIdAndUpdate(id, studentData, {
        new: true
    });
};

// Delete Student
export const deleteStudent = async (id) => {
    return await Student.findByIdAndDelete(id);
};