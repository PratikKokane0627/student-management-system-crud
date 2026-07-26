import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import connectDb from "./db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const isHttpsClient = CLIENT_URL.startsWith("https://");
const requiredEnv = ["MONGODB_URI", "SESSION_SECRET"];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`${key} is required`);
  }
}

connectDb();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
      ttl: 10 * 60,
    }),

    cookie: {
      httpOnly: true,

      // Secure cookies need HTTPS. Keep local http://localhost working.
      secure: isHttpsClient,

      // Required when frontend and backend use different domains
      sameSite: isHttpsClient ? "none" : "lax",

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
