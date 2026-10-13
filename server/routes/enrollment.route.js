import express from "express";
import {
  adminApproveApplication,
  adminGetApplicationById,
  adminGetApplications,
  adminManualEnroll,
  adminRejectApplication,
  applyForEnrollment,
  getCourseEnrollmentStatus,
  googleFormWebhook,
} from "../controllers/enrollment.controller.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Student / Public application & status routes
router.route("/course/:courseId/status").get(getCourseEnrollmentStatus);
router.route("/apply").post(applyForEnrollment);

// Secure Server-to-Server Google Form Webhook
router.route("/webhook/google-form").post(googleFormWebhook);

// Admin-only application management & manual enrollment routes
router
  .route("/admin/manual")
  .post(isAuthenticated, authorizeRoles("admin"), adminManualEnroll);

router
  .route("/admin/applications")
  .get(isAuthenticated, authorizeRoles("admin"), adminGetApplications);

router
  .route("/admin/applications/:id")
  .get(isAuthenticated, authorizeRoles("admin"), adminGetApplicationById);

router
  .route("/admin/applications/:id/approve")
  .patch(isAuthenticated, authorizeRoles("admin"), adminApproveApplication);

router
  .route("/admin/applications/:id/reject")
  .patch(isAuthenticated, authorizeRoles("admin"), adminRejectApplication);

export default router;
