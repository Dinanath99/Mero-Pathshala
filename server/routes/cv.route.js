import express from "express";
import {
  createCV,
  getUserCVs,
  getCVById,
  updateCV,
  deleteCV,
  duplicateCV,
  improveSummaryAI,
  improveBulletAI,
  analyzeCVAI,
  matchJobDescriptionAI,
} from "../controllers/cv.controller.js";
import isAuthenticated, { optionalAuth } from "../middlewares/isAuthenticated.js";

const router = express.Router();

// CV CRUD Routes
router.route("/").post(isAuthenticated, createCV);
router.route("/user").get(isAuthenticated, getUserCVs);
router.route("/:id").get(optionalAuth, getCVById);
router.route("/:id").put(isAuthenticated, updateCV);
router.route("/:id").delete(isAuthenticated, deleteCV);
router.route("/:id/duplicate").post(isAuthenticated, duplicateCV);

// AI Career Tools & Optimization Routes
router.route("/ai/improve-summary").post(improveSummaryAI);
router.route("/ai/improve-bullet").post(improveBulletAI);
router.route("/ai/analyze").post(optionalAuth, analyzeCVAI);
router.route("/ai/match-job").post(optionalAuth, matchJobDescriptionAI);

export default router;
