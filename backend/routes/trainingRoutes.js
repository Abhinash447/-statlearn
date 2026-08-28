import express from "express";

import {
  getTrainingMaterials,
  getTrainingMaterialById,
  getRecommendedTraining,
  startTraining,
  updateTrainingProgress,
  completeTraining,
  getMyTrainingProgress,
} from "../controllers/trainingController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getTrainingMaterials
);

router.get(
  "/recommended",
  protect,
  getRecommendedTraining
);

router.get(
  "/progress/my",
  protect,
  getMyTrainingProgress
);

router.get(
  "/:id",
  protect,
  getTrainingMaterialById
);

router.post(
  "/:id/start",
  protect,
  startTraining
);

router.put(
  "/:id/progress",
  protect,
  updateTrainingProgress
);

router.put(
  "/:id/complete",
  protect,
  completeTraining
);

export default router;