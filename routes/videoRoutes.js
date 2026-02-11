import express from "express";
import { createVideo, getAllVideos , likeVideo,
  dislikeVideo, 
  getMyVideos,
  updateVideo,getVideos,getVideoById,
  deleteVideo} from "../controllers/videoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createVideo);
// router.get("/", getAllVideos);
router.get("/my", authMiddleware, getMyVideos);
router.get("/:id", getVideoById);
router.put("/like/:videoId", authMiddleware, likeVideo);
router.put("/dislike/:videoId", authMiddleware, dislikeVideo);


router.put("/:id", authMiddleware, updateVideo);
router.get("/", getVideos);
router.delete("/:id", authMiddleware, deleteVideo);

export default router;
