import express from "express";
import {
    login,
    logout,
    getProfile
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/me", auth, getProfile);

export default router;
