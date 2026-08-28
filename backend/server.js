import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import recommendRoutes from "./routes/recommendRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/assessments", assessmentRoutes);
app.use("/api/v1/skills", skillRoutes);
app.use("/api/v1", recommendRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/training", trainingRoutes);


app.get("/", (req, res) => {
  res.json({
    status: "SKILLFORGE API Gateway Running Core Services",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});