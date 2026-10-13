import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import {
  createCourse,
  createLecture,
  editCourse,
  editLecture,
  getCourseById,
  getCourseLecture,
  getCreatorCourses,
  getLectureById,
  getPublishedCourse,
  removeLecture,
  searchCourse,
  togglePublishCourse,
} from "../controllers/course.controller.js";
import upload from "../utils/multer.js";
import { recommendCollaborativeCourses, recommendCourses } from "../controllers/recommendation.controller.js";
import { getTrendingCourses } from "../controllers/trending.course.controller.js";

const router = express.Router();

// Public routes
router.route("/search").get(searchCourse);
router.route("/published-courses").get(getPublishedCourse);
router.route("/collaborative").get(recommendCollaborativeCourses);
router.route("/trending").get(getTrendingCourses);
router.route("/:courseId").get(getCourseById);

// Protected Student routes
router.route("/recommend").get(isAuthenticated, recommendCourses);

// Instructor / Admin protected routes
router.route("/").post(isAuthenticated, authorizeRoles("instructor", "admin"), createCourse);
router.route("/").get(isAuthenticated, authorizeRoles("instructor", "admin"), getCreatorCourses);
router
  .route("/:courseId")
  .put(isAuthenticated, authorizeRoles("instructor", "admin"), upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").patch(isAuthenticated, authorizeRoles("instructor", "admin"), togglePublishCourse);

// Instructor / Admin Lecture operations
router.route("/:courseId/lecture").post(isAuthenticated, authorizeRoles("instructor", "admin"), createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, authorizeRoles("instructor", "admin"), getCourseLecture);
router
  .route("/:courseId/lecture/:lectureId")
  .post(isAuthenticated, authorizeRoles("instructor", "admin"), editLecture);
router
  .route("/lecture/:lectureId")
  .delete(isAuthenticated, authorizeRoles("instructor", "admin"), removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, authorizeRoles("instructor", "admin"), getLectureById);

export default router;