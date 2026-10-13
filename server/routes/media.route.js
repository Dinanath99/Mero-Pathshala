import express from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router
  .route("/upload-video")
  .post(isAuthenticated, authorizeRoles("instructor", "admin"), upload.single("file"), async (req, res) => {
    try {
      const result = await uploadMedia(req.file.path);
      res.status(200).json({
        success: true,
        message: "File uploaded successfully.",
        data: result,
      });
    } catch (error) {
      console.error("Video upload error:", error);
      res.status(500).json({ message: "Error uploading file" });
    }
  });

export default router;