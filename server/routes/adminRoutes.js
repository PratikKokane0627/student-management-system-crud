import express from "express";

// Import controller functions
import {
    home,
    showLogin,
    login,
    logout
} from "../controllers/adminController.js";

// Create a new router object
const router = express.Router();

// ===============================
// Admin Routes
// ===============================

// Home route
// Redirects to students list if admin is logged in,
// otherwise redirects to the login page.
router.get("/", home);

// Display the login page
router.get("/login", showLogin);

// Handle admin login
// Verifies email and password, then creates a session.
router.post("/login", login);

// Handle admin logout
// Destroys the session and redirects to the login page.
router.get("/logout", logout);

// Export the router so it can be used in server.js
export default router;