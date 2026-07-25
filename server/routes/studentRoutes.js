import express from "express";
import auth from "../middleware/auth.js";
import {
    addStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.use(auth);

router.route("/")
    .post(addStudent)
    .get(getStudents);

router.route("/:id")
    .get(getStudentById)
    .put(updateStudent)
    .patch(updateStudent)
    .delete(deleteStudent);

export default router;
