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

/* LIKE VIDEO */
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    const userId = req.user.id;

    if (!video) return res.status(404).json({ message: "Video not found" });

    // remove dislike if exists
    video.dislikes = video.dislikes.filter(
      (id) => id.toString() !== userId
    );

    // toggle like
    if (video.likes.includes(userId)) {
      video.likes = video.likes.filter((id) => id.toString() !== userId);
    } else {
      video.likes.push(userId);
    }

    await video.save();
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DISLIKE VIDEO */
export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    const userId = req.user.id;

    if (!video) return res.status(404).json({ message: "Video not found" });

    // remove like if exists
    video.likes = video.likes.filter(
      (id) => id.toString() !== userId
    );

    // toggle dislike
    if (video.dislikes.includes(userId)) {
      video.dislikes = video.dislikes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      video.dislikes.push(userId);
    }

    await video.save();
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



/* GET VIDEOS WITH SEARCH & FILTER */
export const getVideos = async (req, res) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    // search by title
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // filter by category
    if (category && category !== "All") {
      filter.category = category;
    }

    const videos = await Video.find(filter)
      .populate("channel", "name")
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};