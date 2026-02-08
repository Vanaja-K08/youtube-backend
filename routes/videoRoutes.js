import express from "express";
import { createVideo, getAllVideos, getVideoById } from "../controllers/videoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createVideo);
router.get("/", getAllVideos);
router.get("/:id", getVideoById);

export default router;
