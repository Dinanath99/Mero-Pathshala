import express from "express";
import { 
    createCategory, getCategories, getAdminCategories, updateCategory, deleteCategory,
    createBlog, getBlogs, getAdminBlogs, getBlogBySlug, getBlogById, updateBlog, deleteBlog,
    addComment, getCommentsByBlog, deleteComment
} from "../controllers/blog.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

// Categories
router.route("/categories").get(getCategories);
router.route("/admin/categories").get(isAuthenticated, getAdminCategories);
router.route("/categories").post(isAuthenticated, upload.single("coverImage"), createCategory);
router.route("/categories/:id").put(isAuthenticated, upload.single("coverImage"), updateCategory);
router.route("/categories/:id").delete(isAuthenticated, deleteCategory);

// Blogs
router.route("/").get(getBlogs);
router.route("/").post(isAuthenticated, upload.single("featuredImage"), createBlog);
router.route("/:slug").get(getBlogBySlug);
router.route("/admin/all").get(isAuthenticated, getAdminBlogs);
router.route("/admin/:id").get(isAuthenticated, getBlogById);
router.route("/admin/:id").put(isAuthenticated, upload.single("featuredImage"), updateBlog);
router.route("/admin/:id").delete(isAuthenticated, deleteBlog);

// Comments
router.route("/:blogId/comments").get(getCommentsByBlog);
router.route("/:blogId/comments").post(isAuthenticated, addComment);
router.route("/comments/:id").delete(isAuthenticated, deleteComment);

export default router;
