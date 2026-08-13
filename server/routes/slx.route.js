import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getStudentDashboard,
  getNotes,
  createNote,
  deleteNote,
  getBookmarks,
  addBookmark,
  removeBookmark,
  getNotifications,
  markNotificationRead,
} from "../controllers/slx.controller.js";

const router = express.Router();

// Dashboard aggregation
router.route("/dashboard").get(isAuthenticated, getStudentDashboard);

// Personal Study Notes
router.route("/notes").get(isAuthenticated, getNotes).post(isAuthenticated, createNote);
router.route("/notes/:id").delete(isAuthenticated, deleteNote);

// Bookmarks
router.route("/bookmarks").get(isAuthenticated, getBookmarks).post(isAuthenticated, addBookmark);
router.route("/bookmarks/:id").delete(isAuthenticated, removeBookmark);

// In-app Notifications
router.route("/notifications").get(isAuthenticated, getNotifications);
router.route("/notifications/:id/read").put(isAuthenticated, markNotificationRead);

export default router;
