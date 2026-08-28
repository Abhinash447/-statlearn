import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skill: {
      type: String,
      required: true,
    },

    currentScore: {
      type: Number,
      required: true,
    },

    gapLevel: {
      type: String,
      enum: [
        "Strong",
        "Needs Improvement",
        "Critical Gap",
      ],
      required: true,
    },

    recommendedTrainings: [
      {
        training: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Training",
        },

        priority: {
          type: Number,
          default: 1,
        },

        reason: {
          type: String,
        },
      },
    ],

    generatedBy: {
      type: String,
      enum: ["AI", "Rule-Based", "Admin"],
      default: "AI",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Recommendation",
  recommendationSchema
);