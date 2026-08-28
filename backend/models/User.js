import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const competencySchema = new mongoose.Schema(
  {
    competencyName: {
      type: String,
      required: true,
      trim: true,
    },

    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["Strong", "Needs Improvement", "Critical Gap"],
      default: "Critical Gap",
    },

    lastEvaluated: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    designation: {
      type: String,
      default: "Statistical Officer",
      trim: true,
    },

    department: {
      type: String,
      default: "Ministry of Statistics & Programme Implementation",
      trim: true,
    },

    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      default: "student",
    },

    qualifications: {
      type: [String],
      default: [],
    },

    competencyProfile: {
      type: [competencySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// fullName virtual
userSchema.virtual("fullName").get(function () {
  return this.name;
});

userSchema.set("toJSON", {
  virtuals: true,
});

userSchema.set("toObject", {
  virtuals: true,
});

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);