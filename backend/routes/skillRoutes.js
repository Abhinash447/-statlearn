import express from "express";
import {
  getMySkillGaps,
} from "../controllers/skillController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/gap-analysis",
  protect,
  getMySkillGaps
);

export default router;