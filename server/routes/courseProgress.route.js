import express from "express";
import {
  getCourseProgress,
  markAsCompleted,
  markAsInCompleted,
  updateLectureProgress,
} from "../controllers/courseProgress.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { requireCourseEnrollment } from "../middlewares/requireCourseEnrollment.js";

const router = express.Router();

router
  .route("/:courseId")
  .get(isAuthenticated, requireCourseEnrollment, getCourseProgress);

router
  .route("/:courseId/lecture/:lectureId/view")
  .post(isAuthenticated, requireCourseEnrollment, updateLectureProgress);

router
  .route("/:courseId/complete")
  .post(isAuthenticated, requireCourseEnrollment, markAsCompleted);

router
  .route("/:courseId/incomplete")
  .post(isAuthenticated, requireCourseEnrollment, markAsInCompleted);

export default router;