import express from "express";
import {
  getCompetencyScores,
  getGapAnalysis,
} from "../controllers/skillController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/scores",
  protect,
  getCompetencyScores
);

router.get(
  "/gap-analysis",
  protect,
  getGapAnalysis
);

export default router;