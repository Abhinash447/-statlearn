import { GoogleGenAI } from '@google/genai';
import AIContext from '../models/AIContext.js';
import Quiz from '../models/Quiz.js';
import Evaluation from '../models/Evaluation.js';
import User from '../models/User.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc    Upload text file/context for AI quiz generation
// @route   POST /api/v1/ai/upload
export const uploadAIContext = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a text/document file' });
    }

    const extractedText = req.file.buffer.toString('utf-8');

    const contextDoc = await AIContext.create({
      user: req.user._id,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      extractedText,
    });

    res.status(201).json({
      success: true,
      message: 'Document uploaded and context processed successfully',
      fileId: contextDoc._id,
      originalName: contextDoc.originalName,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Trigger LLM-based question generation via Gemini
// @route   POST /api/v1/ai/generate-quiz
export const generateAIQuiz = async (req, res) => {
  const { fileId, targetGap, difficulty = 'Intermediate' } = req.body;

  try {
    let contextText = '';
    if (fileId) {
      const doc = await AIContext.findById(fileId);
      if (doc) contextText = doc.extractedText;
    }

    const prompt = `You are an expert AI Examiner for government statistical officers. 
    Generate a 3-question Multiple Choice Quiz (MCQ) testing the competency "${targetGap || 'Statistical Analysis'}".
    Difficulty Level: ${difficulty}.${contextText ? `Source Reference Text: """${contextText.slice(0, 1500)}"""` : ''}

    Respond STRICTLY in valid JSON array format matching this structural schema:
    [
      {
        "questionId": "q1",
        "questionText": "Question string?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctOptionIndex": 0,
        "explanation": "Why this option is correct."
      }
    ]`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const rawContent = response.text;
    const cleanJson = rawContent.replace(/```json|```/g, '').trim();
    const generatedQuestions = JSON.parse(cleanJson);

    const quiz = await Quiz.create({
      title: `AI Diagnostic: ${targetGap || 'Competency Diagnostic'}`,
      department: req.user.department || 'MoSPI',
      questions: generatedQuestions.map((q) => ({
        questionId: q.questionId,
        questionText: q.questionText,
        competencyName: targetGap || 'Statistical Analysis',
        options: q.options,
        correctOptionIndex: q.correctOptionIndex,
        explanation: q.explanation,
      })),
    });

    res.status(201).json({
      success: true,
      message: 'AI Quiz generated successfully',
      quizId: quiz._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch generated quiz details & timer
// @route   GET /api/v1/quizzes/:id
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Sanitize correct options and explanations before serving quiz
    const sanitizedQuestions = quiz.questions.map((q) => ({
      questionId: q.questionId,
      questionText: q.questionText,
      competencyName: q.competencyName,
      options: q.options,
    }));

    res.status(200).json({
      quizId: quiz._id,
      title: quiz.title,
      department: quiz.department,
      timeLimitMinutes: quiz.questions.length * 2,
      totalQuestions: sanitizedQuestions.length,
      questions: sanitizedQuestions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit quiz responses
// @route   POST /api/v1/quizzes/submit
export const submitQuizResponse = async (req, res) => {
  const { quizId, answers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let totalCorrect = 0;
    const itemizedResults = [];

    quiz.questions.forEach((q) => {
      const userAns = answers.find((a) => a.questionId === q.questionId);
      const selectedIndex = userAns ? userAns.selectedOptionIndex : null;
      const isCorrect = selectedIndex === q.correctOptionIndex;

      if (isCorrect) totalCorrect += 1;

      itemizedResults.push({
        questionId: q.questionId,
        questionText: q.questionText,
        competencyName: q.competencyName,
        selectedOptionIndex: selectedIndex,
        correctOptionIndex: q.correctOptionIndex,
        isCorrect,
        explanation: q.explanation || 'Evaluated based on MoSPI standards.',
      });
    });

    const scorePercentage = Math.round((totalCorrect / quiz.questions.length) * 100);

    const evaluation = await Evaluation.create({
      user: req.user._id,
      scores: [
        {
          competencyName: quiz.questions[0]?.competencyName || 'General Competency',
          score: scorePercentage,
          status: scorePercentage >= 75 ? 'Strong' : scorePercentage >= 40 ? 'Needs Improvement' : 'Critical Gap',
        },
      ],
      totalScore: scorePercentage,
    });

    res.status(200).json({
      success: true,
      message: 'Quiz submitted successfully',
      resultId: evaluation._id,
      quizId: quiz._id,
      totalQuestions: quiz.questions.length,
      correctAnswersCount: totalCorrect,
      scorePercentage,
      itemizedResults,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get score and itemized explanations
// @route   GET /api/v1/quizzes/:id/results
export const getQuizResultById = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);

    if (!evaluation) {
      return res.status(404).json({ message: 'Quiz evaluation result not found' });
    }

    res.status(200).json({
      success: true,
      evaluation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};