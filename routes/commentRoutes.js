import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addComment,
  getCommentsByVideo,
  updateComment,
  deleteComment
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/:videoId", authMiddleware, addComment);
router.get("/:videoId", getCommentsByVideo);
router.put("/:commentId", authMiddleware, updateComment);
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
