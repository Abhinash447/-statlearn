import express from 'express';
import {
  getRecommendations,
  getCourseById,
  updateCourseProgress,
} from '../controllers/recommendController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/recommendations', protect, getRecommendations);

// Declare /courses/progress BEFORE /courses/:id
router.post('/courses/progress', protect, updateCourseProgress);
router.get('/courses/:id', protect, getCourseById);

export default router;