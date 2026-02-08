import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createVideo,
  getVideos,
  deleteVideo
} from "../controllers/videoController.js";

const router = express.Router();

router.get("/", getVideos);
router.post("/", authMiddleware, createVideo);
router.delete("/:id", authMiddleware, deleteVideo);

export default router;
