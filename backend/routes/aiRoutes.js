import express from 'express';
import multer from 'multer';
import {
  uploadAIContext,
  generateAIQuiz,
  getQuizById,
  submitQuizResponse,
  getQuizResultById,
} from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post('/upload', protect, upload.single('file'), uploadAIContext);
router.post('/generate-quiz', protect, generateAIQuiz);
router.get('/quizzes/:id', protect, getQuizById);
router.post('/quizzes/submit', protect, submitQuizResponse);
router.get('/quizzes/:id/results', protect, getQuizResultById);

export default router;