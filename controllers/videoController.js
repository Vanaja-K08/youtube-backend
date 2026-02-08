import Video from "../models/Video.js";

/* CREATE VIDEO */
export const createVideo = async (req, res) => {
  const video = new Video({
    ...req.body,
    userId: req.user.id
  });
  await video.save();
  res.status(201).json(video);
};

/* GET ALL VIDEOS */
export const getVideos = async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
};

/* DELETE VIDEO */
export const deleteVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (video.userId !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });

  await video.deleteOne();
  res.json({ message: "Video deleted" });
};
