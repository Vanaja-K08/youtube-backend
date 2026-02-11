// import Channel from "../models/Channel.js";
// import Video from "../models/Video.js";

// /* CREATE CHANNEL */
// export const createChannel = async (req, res) => {
//   const existing = await Channel.findOne({ userId: req.user.id });
//   if (existing)
//     return res.status(400).json({ message: "Channel already exists" });

//   const channel = new Channel({
//     channelName: req.body.channelName,
//     description: req.body.description,
//     userId: req.user.id
//   });

//   await channel.save();
//   res.status(201).json(channel);
// };

// /* GET MY CHANNEL */
// export const getMyChannel = async (req, res) => {
//   const channel = await Channel.findOne({ userId: req.user.id });
//   res.json(channel);
// };

// /* GET MY VIDEOS */
// export const getMyVideos = async (req, res) => {
//   const videos = await Video.find({ userId: req.user.id });
//   res.json(videos);
// };

// /* DELETE MY VIDEO */
// export const deleteMyVideo = async (req, res) => {
//   await Video.findByIdAndDelete(req.params.id);
//   res.json({ message: "Video removed" });
// };


import Channel from "../models/Channel.js";

export const createChannel = async (req, res) => {
  const { name, description } = req.body;

  const channel = await Channel.findOne({ user: req.user.id });
  if (channel) {
    return res.status(400).json({ message: "Channel already exists" });
  }

  const newChannel = await Channel.create({
    name,
    description,
    user: req.user.id
  });

  res.json(newChannel);
};

export const getMyChannel = async (req, res) => {
  const channel = await Channel.findOne({ user: req.user.id });
  res.json(channel);
};
