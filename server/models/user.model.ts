import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  role: "instructor" | "student" | "admin";
  instructorProfile?: mongoose.Types.ObjectId;
  skills: string[];
  interests: string[];
  experienceLevel?: "beginner" | "intermediate" | "advanced";
  enrolledCourses: mongoose.Types.ObjectId[];
  wishlist: mongoose.Types.ObjectId[];
  photoUrl: string;
  preferredRoles: string[];
  jobTitle?: string;
  educationLevel?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["instructor", "student", "admin"],
      default: "student",
    },
    instructorProfile: {
      type: Schema.Types.ObjectId,
      ref: "InstructorProfile",
    },
    skills: [String],
    interests: [String],
    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    photoUrl: { type: String, default: "" },

    preferredRoles: {
      type: [String],
      enum: [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "DevOps Engineer",
        "Machine Learning Engineer",
        "UI/UX Designer",
        "Cybersecurity Analyst",
        "Software Engineer",
        "Data Scientist",
        "Mobile App Developer",
      ],
      default: [],
    },

    jobTitle: { type: String },
    educationLevel: {
      type: String,
      enum: [
        "Less than high school diploma",
        "High school diploma",
        "Some college",
        "Associate Degree",
        "Bachelor's degree",
        "Master's degree",
        "Professional school degree",
        "Doctorate degree",
      ],
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });

export const User: Model<IUserDocument> = mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema);
