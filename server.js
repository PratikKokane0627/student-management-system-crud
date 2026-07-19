import express from "express";
import session from "express-session";
import "dotenv/config";

// Import error handling middleware
import errorMiddleware from "./middleware/errorMiddleware.js";

// Import MongoDB connection
import connectDb from "./db.js";

// Import route files
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

// Create Express application
const app = express();

// Connect to MongoDB
connectDb();

// ==============================
// Middleware
// ==============================

// Parse incoming JSON data
app.use(express.json());

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static assets
app.use(express.static("public"));

// ==============================
// View Engine
// ==============================

// Set EJS as the template engine
app.set("view engine", "ejs");

// ==============================
// Session Middleware
// ==============================

app.use(
    session({
        // Secret key used to sign the session ID
        secret: process.env.SESSION_SECRET,

        // Don't save the session if nothing changed
        resave: false,

        // Don't create an empty session
        saveUninitialized: false,

        // Session expires after 10 minutes
        cookie: {
            maxAge: 600000
        }
    })
);

// ==============================
// Routes
// ==============================

// Admin routes
app.use("/", adminRoutes);

// Student routes
app.use("/", studentRoutes);

// 404 Route
app.use((req, res) => {
    res.status(404).render("404");
});

// ==============================
// Error Handling Middleware
// ==============================

// Handles all application errors
// Must be registered after all routes
app.use(errorMiddleware);

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
