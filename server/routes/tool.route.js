import express from "express";
import {
  createCategory,
  getCategories,
  getAdminCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/toolCategory.controller.js";
import {
  createTool,
  getTools,
  getFeaturedTools,
  getToolBySlug,
  getAdminTools,
  getToolById,
  updateTool,
  deleteTool,
  toggleFeatureTool,
  togglePublishTool,
} from "../controllers/tool.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

const toolUploadFields = upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
  { name: "screenshots", maxCount: 6 },
]);

// Category Routes
router.route("/categories").get(getCategories);
router.route("/admin/categories").get(isAuthenticated, getAdminCategories);
router.route("/categories").post(isAuthenticated, createCategory);
router.route("/categories/:id").put(isAuthenticated, updateCategory);
router.route("/categories/:id").delete(isAuthenticated, deleteCategory);

// Tool Routes (Public)
router.route("/").get(getTools);
router.route("/featured").get(getFeaturedTools);
router.route("/slug/:slug").get(getToolBySlug);

// Tool Routes (Admin)
router.route("/admin/all").get(isAuthenticated, getAdminTools);
router.route("/admin/:id").get(isAuthenticated, getToolById);
router.route("/").post(isAuthenticated, toolUploadFields, createTool);
router.route("/admin/:id").put(isAuthenticated, toolUploadFields, updateTool);
router.route("/admin/:id").delete(isAuthenticated, deleteTool);
router.route("/admin/:id/feature").patch(isAuthenticated, toggleFeatureTool);
router.route("/admin/:id/publish").patch(isAuthenticated, togglePublishTool);

export default router;
