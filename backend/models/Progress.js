import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    completedCourses: [
      {
        courseTitle: { type: String, required: true },
        completedAt: { type: Date, default: Date.now },
        certificateUrl: { type: String },
      },
    ],
    reassessmentLogs: [
      {
        competencyName: { type: String, required: true },
        previousScore: { type: Number, required: true },
        newScore: { type: Number, required: true },
        evaluatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Progress', progressSchema);