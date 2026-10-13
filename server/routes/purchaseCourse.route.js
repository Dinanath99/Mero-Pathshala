import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import {
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
  getPaymentStatus,
  handleEsewaCallback,
  handleEsewaFailure,
  initiateCoursePayment,
  verifyEsewaPayment,
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

// Public / Guest / Student course detail with purchase status
router.route("/course/:courseId/detail-with-status").get(getCourseDetailWithPurchaseStatus);

// eSewa payment initiation & verification
router.route("/esewa/initiate").post(isAuthenticated, initiateCoursePayment);
router.route("/esewa/verify").post(isAuthenticated, verifyEsewaPayment);
router.route("/esewa/callback").get(handleEsewaCallback);
router.route("/esewa/fail").post(isAuthenticated, handleEsewaFailure);

// Status check by transaction UUID
router.route("/status/:transactionUuid").get(isAuthenticated, getPaymentStatus);

// Backward compatibility alias for checkout session initiation
router.route("/checkout/create-checkout-session").post(isAuthenticated, initiateCoursePayment);

// Admin / Instructor route for all completed purchases
router.route("/").get(isAuthenticated, authorizeRoles("admin", "instructor"), getAllPurchasedCourse);

export default router;