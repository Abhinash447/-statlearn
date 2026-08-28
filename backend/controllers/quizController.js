import Quiz from "../models/Quiz.js";


// ==========================================
// CREATE QUIZ RESULT
// POST /api/v1/quizzes
// ==========================================

export const createQuiz = async (req, res) => {
  try {
    const {
      skill,
      level,
      score,
      totalQuestions,
      percentage,
    } = req.body;

    if (!skill || !level) {
      return res.status(400).json({
        message: "Skill and level are required.",
      });
    }

    if (
      score === undefined ||
      !totalQuestions ||
      percentage === undefined
    ) {
      return res.status(400).json({
        message: "Quiz result data is incomplete.",
      });
    }

    const quiz = await Quiz.create({
      user: req.user._id,
      skill,
      level,
      score,
      totalQuestions,
      percentage,
      completedAt: new Date(),
    });

    return res.status(201).json({
      message: "Quiz result saved successfully.",

      quiz: {
        _id: quiz._id,
        skill: quiz.skill,
        level: quiz.level,
        score: quiz.score,
        totalQuestions: quiz.totalQuestions,
        percentage: quiz.percentage,
        completedAt: quiz.completedAt,
      },
    });

  } catch (error) {
    console.error("Create Quiz Error:", error);

    return res.status(500).json({
      message: "Failed to save quiz result.",
      error: error.message,
    });
  }
};


// ==========================================
// GET MY QUIZZES
// GET /api/v1/quizzes/my
// ==========================================

export const getMyQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      user: req.user._id,
    }).sort({
      completedAt: -1,
    });

    return res.status(200).json({
      quizzes,
    });

  } catch (error) {
    console.error("Get Quizzes Error:", error);

    return res.status(500).json({
      message: "Failed to fetch quiz results.",
    });
  }
};