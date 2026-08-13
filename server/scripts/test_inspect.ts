import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { User } from "../models/user.model.js";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";

async function main() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/meropathsala");
  console.log("Connected to Mongo");
  const users = await User.find({}, "name email role isInstructor");
  console.log("Users:", JSON.stringify(users, null, 2));

  const courses = await Course.find({}, "courseTitle isPublished creator lectures").populate("creator", "name email");
  console.log("Courses:", JSON.stringify(courses, null, 2));

  const lectures = await Lecture.find({}, "lectureTitle videoUrl isPreviewFree");
  console.log("Lectures:", JSON.stringify(lectures, null, 2));

  await mongoose.disconnect();
}

main().catch(console.error);
