// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import {
//   createChannel,
//   getMyChannel,
//   getMyVideos,
//   deleteMyVideo
// } from "../controllers/channelController.js";

// const router = express.Router();

// router.post("/", authMiddleware, createChannel);
// router.get("/", authMiddleware, getMyChannel);
// router.get("/videos", authMiddleware, getMyVideos);
// router.delete("/videos/:id", authMiddleware, deleteMyVideo);

// export default router;


import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createChannel, getMyChannel } from "../controllers/channelController.js";

const router = express.Router();

router.post("/", authMiddleware, createChannel);
router.get("/me", authMiddleware, getMyChannel);

export default router;
