import express from "express";

import {
  createQuiz,
  getMyQuizzes,
} from "../controllers/quizController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createQuiz
);

router.get(
  "/my",
  protect,
  getMyQuizzes
);

export default router;