import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  submitApplication,
  getMyApplication,
  getAdminApplications,
  updateApplicationStatus,
  getAllInstructors,
  getInstructorBySlug,
  getInstructorDashboardStats,
  getInstructorStudents,
  updateInstructorProfile,
} from "../controllers/instructor.controller.js";

const router = express.Router();

// Public routes
router.route("/all").get(getAllInstructors);
router.route("/p/:slug").get(getInstructorBySlug);

// Authenticated user routes
router.route("/apply").post(isAuthenticated, submitApplication);
router.route("/my-application").get(isAuthenticated, getMyApplication);

// Instructor routes
router.route("/dashboard/stats").get(isAuthenticated, getInstructorDashboardStats);
router.route("/dashboard/students").get(isAuthenticated, getInstructorStudents);
router.route("/profile").put(isAuthenticated, updateInstructorProfile);

// Admin routes
router.route("/admin/applications").get(isAuthenticated, getAdminApplications);
router.route("/admin/applications/:applicationId").put(isAuthenticated, updateApplicationStatus);

export default router;
