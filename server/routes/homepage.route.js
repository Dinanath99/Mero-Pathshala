import express from "express";
import jwt from "jsonwebtoken";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getPersonalizedHomepage,
  updateHomepageConfig,
  logHomepageAnalytics,
  getHomepageAnalytics,
} from "../controllers/homepage.controller.js";

const router = express.Router();

// Optional authentication middleware (populates req.id if valid token exists in cookies)
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      if (decode) {
        req.id = decode.userId;
      }
    }
  } catch (err) {
    // Ignore invalid token for optional auth, treat as guest
  }
  next();
};

// Admin guard
const isAdmin = async (req, res, next) => {
  if (req.id) {
    const { User } = await import("../models/user.model.js");
    const user = await User.findById(req.id);
    if (user && (user.role === "admin" || user.role === "instructor")) {
      return next();
    }
  }
  return res.status(403).json({ message: "Admin access required." });
};

// Routes
router.route("/").get(optionalAuth, getPersonalizedHomepage);
router.route("/analytics").post(optionalAuth, logHomepageAnalytics);

router.route("/config").put(isAuthenticated, isAdmin, updateHomepageConfig);
router.route("/analytics-stats").get(isAuthenticated, isAdmin, getHomepageAnalytics);

export default router;
