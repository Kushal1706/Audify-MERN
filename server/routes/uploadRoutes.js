import express from "express";
import { uploadCover, uploadAudioFile } from "../controllers/uploadController.js";
import { upload } from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/cover",
  protect,
  upload.single("coverImage"),
  uploadCover
);

router.post(
  "/audio",
  protect,
  upload.single("audioFile"),
  uploadAudioFile
);

export default router;