import express from "express";
import {
  createAssessment,
  getMyAssessments,
  getAssessmentById,
} from "../controllers/assessmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createAssessment
);

router.get(
  "/my",
  protect,
  getMyAssessments
);

router.get(
  "/:id",
  protect,
  getAssessmentById
);

export default router;