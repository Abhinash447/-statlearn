import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    courseId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    provider: { type: String, required: true, enum: ['iGOT Karmayogi', 'NSSTA', 'MoSPI'] },
    competencyTag: { type: String, required: true },
    level: { type: String, enum: ['Basic', 'Intermediate', 'Advanced'], default: 'Intermediate' },
    durationHours: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    modules: [
      {
        title: { type: String, required: true },
        durationMinutes: { type: Number, required: true },
      },
    ],
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);