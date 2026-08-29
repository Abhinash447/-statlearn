import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    example: {
      type: String,
      default: "",
    },

    keyPoints: [
      {
        type: String,
        trim: true,
      },
    ],

    practice: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      required: true,
    },
  },
  {
    _id: true,
  }
);

const trainingMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
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

    content: {
      type: String,
      default: "",
    },

    lessons: {
      type: [lessonSchema],
      default: [],
    },

    duration: {
      type: Number,
      default: 30,
      min: 1,
    },

    type: {
      type: String,
      enum: [
        "video",
        "article",
        "course",
        "document",
        "quiz",
        "practice",
      ],
      default: "course",
    },

    source: {
      type: String,
      default: "StatLearn AI",
      trim: true,
    },

    url: {
      type: String,
      default: "",
      trim: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const TrainingMaterial = mongoose.model(
  "TrainingMaterial",
  trainingMaterialSchema
);

export default TrainingMaterial;