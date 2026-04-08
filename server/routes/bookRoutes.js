import express from 'express';
import {
    getBooks,
    getBookById,
    createBook,
    toggleLike,
    getLikedBooks,
    getMyBooks,
} from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/liked", protect, getLikedBooks);
router.get("/my-books", protect, getMyBooks);

router.get("/:id", getBookById);

router.post("/", protect, createBook);
router.put("/:id/like", protect, toggleLike);

export default router;