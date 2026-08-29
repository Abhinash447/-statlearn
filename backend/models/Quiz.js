import mongoose from "mongoose";

const quizQuestionSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: true,
      trim: true,
    },

    questionText: {
      type: String,
      required: true,
      trim: true,
    },

    competencyName: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: (value) =>
          Array.isArray(value) &&
          value.length === 4,
        message:
          "Each question must have exactly 4 options.",
      },
    },

    correctOptionIndex: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },

    explanation: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const quizSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    trainingMaterial: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainingMaterial",
      required: true,
      index: true,
    },

    skill: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      enum: [
        "Beginner",
        "Intermediate",
        "Advanced",
      ],
      required: true,
    },

    competency: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      default: "MoSPI",
      trim: true,
    },

    questions: {
      type: [quizQuestionSchema],
      required: true,
      validate: {
        validator: (value) =>
          Array.isArray(value) &&
          value.length > 0,
        message:
          "Quiz must contain at least one question.",
      },
    },

    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },

    score: {
      type: Number,
      default: null,
      min: 0,
    },

    percentage: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

quizSchema.index({
  user: 1,
  trainingMaterial: 1,
});

const Quiz = mongoose.model(
  "Quiz",
  quizSchema
);

export default Quiz;