import mongoose from 'mongoose';

const aiContextSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    extractedText: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('AIContext', aiContextSchema);