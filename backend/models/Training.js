import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    skill: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      enum: [
        "Beginner",
        "Intermediate",
        "Advanced",
      ],
    },

    provider: {
      type: String,
      enum: ["iGOT", "NSSTA", "Other"],
      required: true,
    },

    externalUrl: {
      type: String,
    },

    duration: {
      type: String,
    },

    competencies: [
      {
        type: String,
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

export default mongoose.model(
  "Training",
  trainingSchema
);