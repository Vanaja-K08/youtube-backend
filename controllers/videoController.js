import Video from "../models/Video.js";

/* CREATE VIDEO */
export const createVideo = async (req, res) => {
  const video = await Video.create(req.body);
  res.status(201).json(video);
};

/* GET ALL VIDEOS (with channel name) */
export const getAllVideos = async (req, res) => {
  const videos = await Video.find()
    .populate("channel", "name");
  res.json(videos);
};

/* GET SINGLE VIDEO */
export const getVideoById = async (req, res) => {
  const video = await Video.findById(req.params.id)
    .populate("channel", "name");
  res.json(video);
};
