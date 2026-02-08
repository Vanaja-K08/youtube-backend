import express from "express";
import { addComment, getComments } from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addComment);
router.get("/:videoId", getComments);

export default router;
