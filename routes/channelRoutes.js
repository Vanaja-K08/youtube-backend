
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createChannel, getMyChannel } from "../controllers/channelController.js";

const router = express.Router();

router.post("/", authMiddleware, createChannel);
router.get("/me", authMiddleware, getMyChannel);

export default router;
