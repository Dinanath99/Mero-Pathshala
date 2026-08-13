import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";

import compression from "compression";

// Routes
import courseRoute from "../routes/course.route.js";
import courseProgressRoute from "../routes/courseProgress.route.js";
import mediaRoute from "../routes/media.route.js";
import purchaseRoute from "../routes/purchaseCourse.route.js";
import userRoute from "../routes/user.route.js";
import chatRoute from "../routes/chat.route.js";
import blogRoute from "../routes/blog.route.js";
import toolRoute from "../routes/tool.route.js";
import promptRoute from "../routes/prompt.route.js";
import newsRoute from "../routes/news.route.js";
import instructorRoute from "../routes/instructor.route.js";
import homepageRoute from "../routes/homepage.route.js";
import slxRoute from "../routes/slx.route.js";
import roadmapRoute from "../routes/roadmap.route.js";
import cvRoute from "../routes/cv.route.js";

const app = express();

// Enable HTTP GZIP response compression for fast payload delivery
app.use(compression());

// Security Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(mongoSanitize());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after a few minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", apiLimiter);

// Default middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// API Routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/ai", chatRoute);
app.use("/api/v1/content/blogs", blogRoute);
app.use("/api/v1/content/tools", toolRoute);
app.use("/api/v1/content/prompts", promptRoute);
app.use("/api/v1/content/news", newsRoute);
app.use("/api/v1/instructors", instructorRoute);
app.use("/api/v1/homepage", homepageRoute);
app.use("/api/v1/slx", slxRoute);
app.use("/api/v1/roadmaps", roadmapRoute);
app.use("/api/v1/cv", cvRoute);

export default app;
