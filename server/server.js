import express from "express";
import session from "express-session";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import connectDb from "./db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

connectDb();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,

      // HTTPS only in production
      secure: process.env.NODE_ENV === "production",

      // Required when frontend and backend use different domains
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax",

      // 10 minutes
      maxAge: 10 * 60 * 1000,
    },
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Student Management API",
    routes: {
      auth: "/api/auth",
      students: "/api/students",
    },
  });
});

app.use("/api/auth", adminRoutes);
app.use("/api/students", studentRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
