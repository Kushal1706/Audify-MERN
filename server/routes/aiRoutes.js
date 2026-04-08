import express from "express";
import {
  getBookSummary,
  getRecommendations,
} from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/summary", protect, getBookSummary);
router.post("/recommendations", protect, getRecommendations);

export default router;