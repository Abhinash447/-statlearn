import mongoose from 'mongoose';

const evaluationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    scores: [
      {
        competencyName: { type: String, required: true },
        score: { type: Number, required: true },
        status: { type: String, required: true },
      },
    ],
    totalScore: { type: Number, required: true },
    evaluatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Evaluation', evaluationSchema);