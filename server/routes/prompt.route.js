import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  seedCategories,
} from "../controllers/promptCategory.controller.js";
import {
  createPrompt,
  getAllPrompts,
  getFeaturedPrompts,
  getPromptBySlug,
  incrementCopyCount,
  getAdminPrompts,
  updatePrompt,
  deletePrompt,
} from "../controllers/prompt.controller.js";

const router = express.Router();

// Public Routes
router.get("/categories", getAllCategories);
router.get("/featured", getFeaturedPrompts);
router.get("/", getAllPrompts);
router.get("/:slug", getPromptBySlug);
router.post("/:id/copy", incrementCopyCount);

// Admin Routes
router.post("/categories/seed", isAuthenticated, seedCategories);
router.post("/categories", isAuthenticated, createCategory);
router.put("/categories/:id", isAuthenticated, updateCategory);
router.delete("/categories/:id", isAuthenticated, deleteCategory);

router.get("/admin/all", isAuthenticated, getAdminPrompts);
router.post("/", isAuthenticated, createPrompt);
router.put("/:id", isAuthenticated, updatePrompt);
router.delete("/:id", isAuthenticated, deletePrompt);

export default router;
