
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createChannel, getMyChannel,getChannelById  } from "../controllers/channelController.js";

const router = express.Router();

router.post("/", authMiddleware, createChannel);
router.get("/me", authMiddleware, getMyChannel);
router.get("/:id", getChannelById);

export default router;
