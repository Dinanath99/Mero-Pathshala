import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInstructorApplicationDocument extends Document {
  user: mongoose.Types.ObjectId;
  fullName: string;
  profilePhoto: string;
  email: string;
  phoneNumber: string;
  shortBio: string;
  jobTitle: string;
  organization: string;
  yearsOfExperience: number;
  expertise: string[];
  linkedIn: string;
  gitHub: string;
  portfolio: string;
  website: string;
  languages: string[];
  courseTopics: string[];
  teachingExperience: string;
  whyTeach: string;
  courseIdea: string;
  sampleOutline: string;
  termsAgreed: boolean;
  status: "Pending" | "Approved" | "Rejected";
  adminNotes: string;
  approvalDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const instructorApplicationSchema = new Schema<IInstructorApplicationDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: { type: String, required: true },
    profilePhoto: { type: String, default: "" },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },

    shortBio: { type: String, required: true },
    jobTitle: { type: String, required: true },
    organization: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    expertise: [{ type: String }],

    linkedIn: { type: String, default: "" },
    gitHub: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    website: { type: String, default: "" },

    languages: [{ type: String }],
    courseTopics: [{ type: String }],
    teachingExperience: { type: String, required: true },

    whyTeach: { type: String, required: true },
    courseIdea: { type: String, required: true },
    sampleOutline: { type: String, required: true },

    termsAgreed: { type: Boolean, default: true },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    adminNotes: { type: String, default: "" },
    approvalDate: { type: Date },
  },
  { timestamps: true }
);

export const InstructorApplication: Model<IInstructorApplicationDocument> =
  mongoose.models.InstructorApplication ||
  mongoose.model<IInstructorApplicationDocument>(
    "InstructorApplication",
    instructorApplicationSchema
  );
