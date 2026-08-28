import mongoose from "mongoose";

const trainingProgressSchema = new mongoose.Schema(
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
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: [
        "not-started",
        "in-progress",
        "completed",
      ],
      default: "not-started",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    quizScore: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },

    recommended: {
      type: Boolean,
      default: false,
    },

    recommendationReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

trainingProgressSchema.index(
  {
    user: 1,
    trainingMaterial: 1,
  },
  {
    unique: true,
  }
);

const TrainingProgress = mongoose.model(
  "TrainingProgress",
  trainingProgressSchema
);

export default TrainingProgress;