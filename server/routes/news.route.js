import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getAllTags,
  createTag,
  deleteTag,
  seedCategoriesAndTags,
} from "../controllers/newsCategory.controller.js";
import {
  createNews,
  getAllNews,
  getLatestNews,
  getNewsBySlug,
  getAdminNews,
  updateNews,
  deleteNews,
} from "../controllers/news.controller.js";

const router = express.Router();

// Public Routes
router.get("/categories", getAllCategories);
router.get("/tags", getAllTags);
router.get("/latest", getLatestNews);
router.get("/", getAllNews);
router.get("/:slug", getNewsBySlug);

// Admin Routes
router.post("/categories/seed", isAuthenticated, seedCategoriesAndTags);
router.post("/categories", isAuthenticated, createCategory);
router.put("/categories/:id", isAuthenticated, updateCategory);
router.delete("/categories/:id", isAuthenticated, deleteCategory);

router.post("/tags", isAuthenticated, createTag);
router.delete("/tags/:id", isAuthenticated, deleteTag);

router.get("/admin/all", isAuthenticated, getAdminNews);
router.post("/", isAuthenticated, createNews);
router.put("/:id", isAuthenticated, updateNews);
router.delete("/:id", isAuthenticated, deleteNews);

export default router;
