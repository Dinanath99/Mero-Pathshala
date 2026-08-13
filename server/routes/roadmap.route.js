import express from "express";
import {
  getAllRoadmaps,
  getRoadmapBySlug,
  getRoadmapAdvisorRecommendation,
  toggleBookmark,
  getUserBookmarks,
  updateRoadmapProgress,
  getUserRoadmapProgress,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap,
  togglePublishRoadmap,
} from "../controllers/roadmap.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Public Routes
router.route("/").get(getAllRoadmaps);
router.route("/advisor").post(getRoadmapAdvisorRecommendation);
router.route("/slug/:slug").get(getRoadmapBySlug);

// Protected Student Routes
router.route("/user/bookmarks").get(isAuthenticated, getUserBookmarks);
router.route("/:id/bookmark").post(isAuthenticated, toggleBookmark);
router.route("/:id/progress").post(isAuthenticated, updateRoadmapProgress).get(isAuthenticated, getUserRoadmapProgress);

// Admin Routes
router.route("/").post(isAuthenticated, createRoadmap);
router.route("/:id").put(isAuthenticated, updateRoadmap).delete(isAuthenticated, deleteRoadmap);
router.route("/:id/publish").patch(isAuthenticated, togglePublishRoadmap);

export default router;
