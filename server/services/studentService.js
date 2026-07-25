import Student from "../models/Student.js";

export const addStudent = async (studentData) => {
    return await Student.create(studentData);
};

export const getStudents = async (query) => {
    const search = query?.trim();

    if (!search) {
        return await Student.find().sort({ createdAt: -1 });
    }

    return await Student.find({
        $or: [
            { name: { $regex: search, $options: "i" } },
            { city: { $regex: search, $options: "i" } },
            { course: { $regex: search, $options: "i" } }
        ]
    }).sort({ createdAt: -1 });
};

export const getStudentById = async (id) => {
    return await Student.findById(id);
};

export const updateStudent = async (id, studentData) => {
    return await Student.findByIdAndUpdate(id, studentData, {
        new: true,
        runValidators: true
    });
};

export const deleteStudent = async (id) => {
    return await Student.findByIdAndDelete(id);
};
