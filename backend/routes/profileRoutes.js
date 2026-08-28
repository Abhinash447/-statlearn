import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  updateCompetency,
  getDashboardData,
  getLearningProgress,
} from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/profile/competency', protect, updateCompetency);

router.get('/dashboard', protect, getDashboardData);
router.get('/progress', protect, getLearningProgress);

export default router;