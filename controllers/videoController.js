import Video from "../models/Video.js";

/* CREATE VIDEO */
// export const createVideo = async (req, res) => {
//   const video = await Video.create(req.body);
//   res.status(201).json(video);
// };


// export const createVideo = async (req, res) => {
//   try {
//     const video = await Video.create({
//       ...req.body,
//       user: req.user.id
//     });

//     res.status(201).json(video);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


export const createVideo = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.user.id });

    if (!channel)
      return res.status(404).json({ message: "Create channel first" });

    const video = await Video.create({
      ...req.body,
      user: req.user.id,
      channel: channel._id
    });

    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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

/* SEARCH + FILTER */
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

    const videos = await Video.find(filter).sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMyVideos = async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user.id });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (video.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  video.title = req.body.title || video.title;
  await video.save();

  res.json(video);
};

export const deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};