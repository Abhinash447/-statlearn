import { GoogleGenAI } from "@google/genai";
import AIContext from "../models/AIContext.js";
import TrainingMaterial from "../models/TrainingMaterial.js";
import Quiz from "../models/Quiz.js";
import Evaluation from "../models/Evaluation.js";

// ==========================================
// GEMINI AI
// ==========================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

console.log(
  "Gemini API key loaded:",
  !!process.env.GEMINI_API_KEY
);

console.log(
  "Gemini model:",
  process.env.GEMINI_MODEL
);

const GEMINI_MODEL =
  process.env.GEMINI_MODEL || "gemini-3.6-flash";

// ==========================================
// UPLOAD AI CONTEXT
// POST /api/v1/ai/upload
// ==========================================

export const uploadAIContext = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please upload a text/document file.",
      });
    }

    const extractedText =
      req.file.buffer.toString("utf-8");

    const contextDoc =
      await AIContext.create({
        user: req.user._id,
        originalName:
          req.file.originalname,
        mimeType: req.file.mimetype,
        extractedText,
      });

    return res.status(201).json({
      success: true,
      message:
        "Document uploaded and context processed successfully.",
      fileId: contextDoc._id,
      originalName:
        contextDoc.originalName,
    });
  } catch (error) {
    console.error(
      "Upload AI Context Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to upload AI context.",
      error: error.message,
    });
  }
};

// ==========================================
// GENERATE AI QUIZ
// POST /api/v1/ai/generate-quiz
// ==========================================

export const generateAIQuiz = async (
  req,
  res
) => {
  try {
    // --------------------------------------
    // 1. Read request
    // --------------------------------------

    const {
      trainingId,
      questionCount = 5,
    } = req.body;

    // --------------------------------------
    // 2. Validate authentication
    // --------------------------------------

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication required.",
      });
    }

    // --------------------------------------
    // 3. Validate training ID
    // --------------------------------------

    if (!trainingId) {
      return res.status(400).json({
        success: false,
        message:
          "Training ID is required.",
      });
    }

    // --------------------------------------
    // 4. Validate question count
    // --------------------------------------

    const count = Number(questionCount);

    if (
      !Number.isInteger(count) ||
      count < 1 ||
      count > 10
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Question count must be between 1 and 10.",
      });
    }

    // --------------------------------------
    // 5. Check Gemini API key
    // --------------------------------------

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message:
          "GEMINI_API_KEY is not configured in .env",
      });
    }

    // --------------------------------------
    // 6. Find training material
    // --------------------------------------

    const training =
      await TrainingMaterial.findOne({
        _id: trainingId,
        isActive: true,
      });

    if (!training) {
      return res.status(404).json({
        success: false,
        message:
          "Training material not found.",
      });
    }

    // --------------------------------------
    // 7. Check lessons
    // --------------------------------------

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

    // --------------------------------------
    // 8. Prepare lesson content
    // --------------------------------------

    const lessonContent =
      training.lessons
        .sort(
          (a, b) =>
            a.order - b.order
        )
        .map((lesson) => {
          return `
Lesson ${lesson.order}: ${lesson.title}

Content:
${lesson.content || ""}

Example:
${lesson.example || ""}

Key Points:
${(lesson.keyPoints || []).join("\n")}

Practice:
${lesson.practice || ""}
`;
        })
        .join(
          "\n-------------------------\n"
        );

    // --------------------------------------
    // 9. Create Gemini prompt
    // --------------------------------------

    const prompt = `
You are an expert educational assessment generator.

Create a multiple-choice quiz using ONLY the training material provided below.

TRAINING INFORMATION

Skill: ${training.skill}
Level: ${training.level}
Competency: ${training.competency}
Title: ${training.title}

NUMBER OF QUESTIONS

Generate exactly ${count} questions.

IMPORTANT RULES

1. Generate exactly ${count} questions.
2. Use ONLY the supplied training material.
3. Match the difficulty to ${training.level}.
4. Cover different lessons when possible.
5. Do not repeat questions.
6. Every question must have exactly 4 options.
7. Only ONE option can be correct.
8. correctOptionIndex must be 0, 1, 2, or 3.
9. Provide a short explanation for every answer.
10. Do not use information outside the training material.
11. Return ONLY valid JSON.
12. Do not use markdown.
13. Do not use code fences.
14. Do not add any text before or after the JSON.

TRAINING CONTENT

${training.content || ""}

LESSONS

${lessonContent}

RETURN EXACTLY THIS FORMAT

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
    "explanation": "Why this answer is correct."
  }
]
`;

    // --------------------------------------
    // 10. Generate quiz using Gemini
    // --------------------------------------

    console.log(
      "Generating AI quiz..."
    );

    console.log(
      "Skill:",
      training.skill
    );

    console.log(
      "Level:",
      training.level
    );

    console.log(
      "Training:",
      training.title
    );

    console.log(
      "Gemini Model:",
      GEMINI_MODEL
    );

    const response =
      await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
      });

    // --------------------------------------
    // 11. Read Gemini response
    // --------------------------------------

    const rawContent =
      response.text || "";

    if (!rawContent.trim()) {
      return res.status(500).json({
        success: false,
        message:
          "Gemini returned an empty response.",
      });
    }

    // --------------------------------------
    // 12. Clean Gemini response
    // --------------------------------------

    let cleanJson =
      rawContent.trim();

    cleanJson =
      cleanJson
        .replace(
          /^```json\s*/i,
          ""
        )
        .replace(
          /^```\s*/i,
          ""
        )
        .replace(
          /\s*```$/i,
          ""
        )
        .trim();

    // --------------------------------------
    // 13. Parse JSON
    // --------------------------------------

    let generatedQuestions;

    try {
      generatedQuestions =
        JSON.parse(cleanJson);
    } catch (parseError) {
      console.error(
        "Gemini JSON Parse Error:",
        parseError.message
      );

      console.error(
        "Gemini Raw Response:",
        rawContent
      );

      return res.status(500).json({
        success: false,
        message:
          "Gemini returned invalid JSON.",
      });
    }

    // --------------------------------------
    // 14. Validate question array
    // --------------------------------------

    if (
      !Array.isArray(
        generatedQuestions
      )
    ) {
      return res.status(500).json({
        success: false,
        message:
          "Gemini did not return a question array.",
      });
    }

    if (
      generatedQuestions.length !== count
    ) {
      return res.status(500).json({
        success: false,
        message:
          `Gemini generated ${generatedQuestions.length} questions instead of ${count}.`,
      });
    }

    // --------------------------------------
    // 15. Normalize questions
    // --------------------------------------

    const questions =
      generatedQuestions.map(
        (question, index) => {
          return {
            questionId:
              question.questionId ||
              `q${index + 1}`,

            questionText:
              String(
                question.questionText ||
                  ""
              ).trim(),

            competencyName:
              training.competency,

            options:
              Array.isArray(
                question.options
              )
                ? question.options.map(
                    (option) =>
                      String(
                        option
                      ).trim()
                  )
                : [],

            correctOptionIndex:
              Number(
                question.correctOptionIndex
              ),

            explanation:
              String(
                question.explanation ||
                  ""
              ).trim(),
          };
        }
      );

    // --------------------------------------
    // 16. Validate every question
    // --------------------------------------

    for (
      let i = 0;
      i < questions.length;
      i++
    ) {
      const question =
        questions[i];

      if (
        !question.questionText
      ) {
        return res.status(500).json({
          success: false,
          message:
            `Question ${i + 1} has no question text.`,
        });
      }

      if (
        !Array.isArray(
          question.options
        ) ||
        question.options.length !== 4
      ) {
        return res.status(500).json({
          success: false,
          message:
            `Question ${i + 1} must have exactly 4 options.`,
        });
      }

      if (
        !Number.isInteger(
          question.correctOptionIndex
        ) ||
        question.correctOptionIndex <
          0 ||
        question.correctOptionIndex >
          3
      ) {
        return res.status(500).json({
          success: false,
          message:
            `Question ${i + 1} has an invalid correct option index.`,
        });
      }
    }

    // --------------------------------------
    // 17. Save quiz
    // --------------------------------------

    const quiz =
      await Quiz.create({
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
          req.user.department ||
          "MoSPI",

        questions,

        totalQuestions:
          questions.length,

        score: null,

        percentage: null,

        completedAt: null,
      });

    console.log(
      "AI Quiz created:",
      quiz._id.toString()
    );

    console.log(
      "QUIZ SAVED:",
      quiz._id.toString()
    );

    console.log(
      "QUESTIONS SAVED:",
      quiz.questions.length
    );

    console.log(
      "QUESTIONS:",
      quiz.questions
    );

    // --------------------------------------
    // 18. Send response
    // --------------------------------------

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
        competency:
          training.competency,
      },

      totalQuestions:
        questions.length,
    });
  } catch (error) {
    console.error(
      "================================="
    );

    console.error(
      "GENERATE AI QUIZ ERROR"
    );

    console.error(
      "Message:",
      error.message
    );

    console.error(
      "Name:",
      error.name
    );

    console.error(
      "================================="
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate AI quiz.",
      error:
        error.message ||
        "Unknown error",
    });
  }
};

// ==========================================
// GET QUIZ BY ID
// GET /api/v1/ai/quizzes/:id
// ==========================================

export const getQuizById = async (
  req,
  res
) => {
  try {
    const quiz =
      await Quiz.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message:
          "Quiz not found.",
      });
    }

    const sanitizedQuestions =
      quiz.questions.map(
        (question) => ({
          questionId:
            question.questionId,

          questionText:
            question.questionText,

          competencyName:
            question.competencyName,

          options:
            question.options,
        })
      );

    return res.status(200).json({
      success: true,

      quiz: {
        quizId: quiz._id,

        title: quiz.title,

        skill:
          quiz.skill,

        level:
          quiz.level,

        competency:
          quiz.competency,

        department:
          quiz.department,

        trainingMaterial:
          quiz.trainingMaterial,

        totalQuestions:
          sanitizedQuestions.length,

        timeLimitMinutes:
          sanitizedQuestions.length *
          2,

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
      message:
        "Failed to fetch quiz.",
      error:
        error.message,
    });
  }
};

// ==========================================
// SUBMIT QUIZ
// POST /api/v1/ai/quizzes/submit
// ==========================================

export const submitQuizResponse =
  async (req, res) => {
    try {
      const {
        quizId,
        answers,
      } = req.body;

      // ------------------------------------
      // Validate request
      // ------------------------------------

      if (!quizId) {
        return res.status(400).json({
          success: false,
          message:
            "Quiz ID is required.",
        });
      }

      if (!Array.isArray(answers)) {
        return res.status(400).json({
          success: false,
          message:
            "Answers must be an array.",
        });
      }

      // ------------------------------------
      // Find quiz
      // ------------------------------------

      const quiz =
        await Quiz.findOne({
          _id: quizId,
          user: req.user._id,
        });

      if (!quiz) {
        return res.status(404).json({
          success: false,
          message:
            "Quiz not found.",
        });
      }

      // ------------------------------------
      // Check quiz questions
      // ------------------------------------

      if (
        !quiz.questions ||
        quiz.questions.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Quiz has no questions.",
        });
      }

      // ------------------------------------
      // Prevent duplicate submission
      // ------------------------------------

      if (quiz.completedAt) {
        return res.status(400).json({
          success: false,
          message:
            "This quiz has already been submitted.",
          score: quiz.score,
          percentage:
            quiz.percentage,
        });
      }

      // ------------------------------------
      // Calculate score
      // ------------------------------------

      let totalCorrect = 0;

      const itemizedResults = [];

      for (
        const question
        of quiz.questions
      ) {
        const userAnswer =
          answers.find(
            (answer) =>
              answer.questionId ===
              question.questionId
          );

        const selectedOptionIndex =
          userAnswer &&
          userAnswer.selectedOptionIndex !==
            undefined
            ? Number(
                userAnswer.selectedOptionIndex
              )
            : null;

        const isCorrect =
          selectedOptionIndex !==
            null &&
          selectedOptionIndex ===
            question.correctOptionIndex;

        if (isCorrect) {
          totalCorrect++;
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

      // ------------------------------------
      // Calculate percentage
      // ------------------------------------

      const totalQuestions =
        quiz.questions.length;

      const scorePercentage =
        Math.round(
          (totalCorrect /
            totalQuestions) *
            100
        );

      // ------------------------------------
      // Determine status
      // ------------------------------------

      let status =
        "Critical Gap";

      if (scorePercentage >= 75) {
        status = "Strong";
      } else if (
        scorePercentage >= 40
      ) {
        status =
          "Needs Improvement";
      }

      // ------------------------------------
      // Update quiz
      // ------------------------------------

      quiz.score =
        totalCorrect;

      quiz.totalQuestions =
        totalQuestions;

      quiz.percentage =
        scorePercentage;

      quiz.completedAt =
        new Date();

      await quiz.save();

      // ------------------------------------
      // Create evaluation
      // ------------------------------------

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

      // ------------------------------------
      // Return result
      // ------------------------------------

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
        error:
          error.message,
      });
    }
  };

// ==========================================
// GET QUIZ RESULT
// GET /api/v1/ai/quizzes/:id/results
// ==========================================

export const getQuizResultById =
  async (req, res) => {
    try {
      const evaluation =
        await Evaluation.findOne({
          _id: req.params.id,
          user: req.user._id,
        });

      if (!evaluation) {
        return res.status(404).json({
          success: false,
          message:
            "Quiz evaluation result not found.",
        });
      }

      return res.status(200).json({
        success: true,
        evaluation,
      });
    } catch (error) {
      console.error(
        "Get Quiz Result Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch quiz result.",
        error:
          error.message,
      });
    }
  };