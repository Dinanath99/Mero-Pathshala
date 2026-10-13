import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { getAllPurchasedCourse, getCourseDetailWithPurchaseStatus } from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.route("/course/:courseId/detail-with-status").get(getCourseDetailWithPurchaseStatus);
router.route("/").get(isAuthenticated, authorizeRoles("admin", "instructor"), getAllPurchasedCourse);

export default router;