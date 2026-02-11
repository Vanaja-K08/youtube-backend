import express from "express";
import { createVideo, getAllVideos, getVideoById , likeVideo,
  dislikeVideo,getVideos, 
  getMyVideos,
  updateVideo} from "../controllers/videoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createVideo);
router.get("/", getAllVideos);
router.get("/:id", getVideoById);
router.put("/like/:videoId", authMiddleware, likeVideo);
router.put("/dislike/:videoId", authMiddleware, dislikeVideo);
router.get("/my", authMiddleware, getMyVideos);
router.put("/:id", authMiddleware, updateVideo);

export default router;
