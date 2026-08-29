import { GoogleGenAI } from "@google/genai";
import AIContext from "../models/AIContext.js";
import TrainingMaterial from "../models/TrainingMaterial.js";
import Quiz from "../models/Quiz.js";
import Evaluation from "../models/Evaluation.js";
import User from "../models/User.js";

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
  try {
    const {
      trainingId,
      questionCount = 5,
    } = req.body;

    if (!trainingId) {
      return res.status(400).json({
        success: false,
        message: "Training ID is required.",
      });
    }

    const training = await TrainingMaterial.findOne({
      _id: trainingId,
      isActive: true,
    });

    if (!training) {
      return res.status(404).json({
        success: false,
        message: "Training material not found.",
      });
    }

    if (
      !training.lessons ||
      training.lessons.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This training does not contain any lessons.",
      });
    }

    const lessonContent = training.lessons
      .map((lesson) => {
        return `
Lesson ${lesson.order}: ${lesson.title}

Content:
${lesson.content}

Key Points:
${(lesson.keyPoints || []).join("\n")}

Practice:
${lesson.practice || ""}
`;
      })
      .join("\n");

    const prompt = `
You are an expert AI examiner for government statistical officers.

Create a multiple-choice quiz from the training material provided below.

Training Information:
Skill: ${training.skill}
Level: ${training.level}
Competency: ${training.competency}
Title: ${training.title}

Generate exactly ${questionCount} questions.

Requirements:
- Questions must be based ONLY on the supplied training material.
- Match the difficulty to the training level: ${training.level}.
- Cover different lessons when possible.
- Do not repeat questions.
- Each question must have exactly 4 options.
- Only one option must be correct.
- Include a clear explanation.
- Do not include information that is not supported by the training material.

Training Material:
"""
${training.content}

${lessonContent}
"""

Return ONLY valid JSON.

Format:
[
  {
    "questionId": "q1",
    "questionText": "Question?",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correctOptionIndex": 0,
    "explanation": "Explanation of the correct answer."
  }
]
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    const rawContent =
      response.text || "";

    const cleanJson =
      rawContent
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    let generatedQuestions;

    try {
      generatedQuestions =
        JSON.parse(cleanJson);
    } catch (parseError) {
      console.error(
        "Gemini JSON Parse Error:",
        parseError
      );

      return res.status(500).json({
        success: false,
        message:
          "AI returned an invalid quiz format.",
      });
    }

    if (
      !Array.isArray(generatedQuestions) ||
      generatedQuestions.length === 0
    ) {
      return res.status(500).json({
        success: false,
        message:
          "AI did not generate valid questions.",
      });
    }

    const questions =
      generatedQuestions.map(
        (question, index) => ({
          questionId:
            question.questionId ||
            `q${index + 1}`,

          questionText:
            question.questionText,

          competencyName:
            training.competency,

          options:
            question.options,

          correctOptionIndex:
            Number(
              question.correctOptionIndex
            ),

          explanation:
            question.explanation || "",
        })
      );

    for (const question of questions) {
      if (
        !question.questionText ||
        !Array.isArray(question.options) ||
        question.options.length !== 4 ||
        question.correctOptionIndex < 0 ||
        question.correctOptionIndex > 3
      ) {
        return res.status(500).json({
          success: false,
          message:
            "AI generated an invalid question format.",
        });
      }
    }

    const quiz = await Quiz.create({
      user: req.user._id,

      trainingMaterial:
        training._id,

      skill:
        training.skill,

      level:
        training.level,

      competency:
        training.competency,

      title:
        `AI Quiz: ${training.title}`,

      department:
        req.user.department || "MoSPI",

      questions,

      totalQuestions:
        questions.length,
    });

    return res.status(201).json({
      success: true,
      message:
        "AI quiz generated successfully.",

      quizId:
        quiz._id,

      training: {
        id: training._id,
        title: training.title,
        skill: training.skill,
        level: training.level,
        competency: training.competency,
      },

      totalQuestions:
        questions.length,
    });
  } catch (error) {
    console.error("=================================");
    console.error("GENERATE AI QUIZ ERROR");
    console.error("Message:", error.message);
    console.error("Name:", error.name);
    console.error("Stack:", error.stack);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI quiz.",
      error: error.message || "Unknown error",
    });
  }
};

// @desc    Fetch generated quiz details & timer
// @route   GET /api/v1/quizzes/:id
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found.",
      });
    }

    const sanitizedQuestions =
      quiz.questions.map((question) => ({
        questionId: question.questionId,
        questionText: question.questionText,
        competencyName:
          question.competencyName,
        options: question.options,
      }));

    return res.status(200).json({
      success: true,

      quiz: {
        quizId: quiz._id,
        title: quiz.title,
        skill: quiz.skill,
        level: quiz.level,
        competency: quiz.competency,
        department: quiz.department,
        trainingMaterial:
          quiz.trainingMaterial,
        totalQuestions:
          sanitizedQuestions.length,
        timeLimitMinutes:
          sanitizedQuestions.length * 2,
        questions:
          sanitizedQuestions,
      },
    });
  } catch (error) {
    console.error(
      "Get Quiz Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch quiz.",
      error: error.message,
    });
  }
};

// @desc    Submit quiz responses
// @route   POST /api/v1/quizzes/submit
export const submitQuizResponse = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    if (!quizId) {
      return res.status(400).json({
        success: false,
        message: "Quiz ID is required.",
      });
    }

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Answers must be an array.",
      });
    }

    const quiz = await Quiz.findOne({
      _id: quizId,
      user: req.user._id,
    });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found.",
      });
    }

    if (!quiz.questions || quiz.questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Quiz has no questions.",
      });
    }

    if (quiz.completedAt) {
      return res.status(400).json({
        success: false,
        message: "This quiz has already been submitted.",
        score: quiz.score,
        percentage: quiz.percentage,
      });
    }

    let totalCorrect = 0;

    const itemizedResults = [];

    for (const question of quiz.questions) {
      const userAnswer = answers.find(
        (answer) =>
          answer.questionId === question.questionId
      );

      const selectedOptionIndex =
        userAnswer &&
        userAnswer.selectedOptionIndex !== undefined
          ? Number(userAnswer.selectedOptionIndex)
          : null;

      const isCorrect =
        selectedOptionIndex !== null &&
        selectedOptionIndex ===
          question.correctOptionIndex;

      if (isCorrect) {
        totalCorrect += 1;
      }

      itemizedResults.push({
        questionId:
          question.questionId,

        questionText:
          question.questionText,

        competencyName:
          question.competencyName,

        selectedOptionIndex,

        correctOptionIndex:
          question.correctOptionIndex,

        isCorrect,

        explanation:
          question.explanation ||
          "Evaluated based on the training material.",
      });
    }

    const totalQuestions =
      quiz.questions.length;

    const scorePercentage = Math.round(
      (totalCorrect / totalQuestions) * 100
    );

    let status = "Critical Gap";

    if (scorePercentage >= 75) {
      status = "Strong";
    } else if (scorePercentage >= 40) {
      status = "Needs Improvement";
    }

    quiz.score = totalCorrect;

    quiz.totalQuestions =
      totalQuestions;

    quiz.percentage =
      scorePercentage;

    quiz.completedAt =
      new Date();

    await quiz.save();

    const evaluation =
      await Evaluation.create({
        user: req.user._id,

        scores: [
          {
            competencyName:
              quiz.competency ||
              quiz.questions[0]
                ?.competencyName ||
              "General Competency",

            score:
              scorePercentage,

            status,
          },
        ],

        totalScore:
          scorePercentage,

        evaluatedAt:
          new Date(),
      });

    return res.status(200).json({
      success: true,

      message:
        "Quiz submitted successfully.",

      quizId:
        quiz._id,

      resultId:
        evaluation._id,

      skill:
        quiz.skill,

      level:
        quiz.level,

      competency:
        quiz.competency,

      totalQuestions,

      correctAnswersCount:
        totalCorrect,

      score:
        totalCorrect,

      scorePercentage,

      status,

      completedAt:
        quiz.completedAt,

      itemizedResults,
    });
  } catch (error) {
    console.error(
      "Submit Quiz Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to submit quiz.",
      error: error.message,
    });
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