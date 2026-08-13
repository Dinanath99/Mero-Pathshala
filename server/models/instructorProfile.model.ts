import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInstructorProfileDocument extends Document {
  user: mongoose.Types.ObjectId;
  slug: string;
  title: string;
  bio: string;
  coverImage: string;
  profilePhoto: string;
  expertise: string[];
  yearsOfExperience: number;
  languages: string[];
  specialization: string;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
    youtube: string;
    website: string;
  };
  featured: boolean;
  status: "Active" | "Suspended";
  rating: number;
  reviewsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const instructorProfileSchema = new Schema<IInstructorProfileDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: { type: String, default: "AI Instructor & Expert" },
    bio: { type: String, default: "" },
    coverImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    },
    profilePhoto: { type: String, default: "" },
    expertise: [{ type: String }],
    yearsOfExperience: { type: Number, default: 3 },
    languages: [{ type: String, default: ["English", "Nepali"] }],
    specialization: { type: String, default: "Artificial Intelligence & Machine Learning" },
    socialLinks: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      twitter: { type: String, default: "" },
      youtube: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Active", "Suspended"],
      default: "Active",
    },
    rating: { type: Number, default: 4.9 },
    reviewsCount: { type: Number, default: 14 },
  },
  { timestamps: true }
);

export const InstructorProfile: Model<IInstructorProfileDocument> =
  mongoose.models.InstructorProfile ||
  mongoose.model<IInstructorProfileDocument>("InstructorProfile", instructorProfileSchema);
