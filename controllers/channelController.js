import Channel from "../models/Channel.js";

export const createChannel = async (req, res) => {
  try {
    if (!req.user?.id)
      return res.status(401).json({ message: "Login required" });

    if (!req.body.name)
      return res.status(400).json({ message: "Channel name required" });

    const existing = await Channel.findOne({ owner: req.user.id });

    if (existing)
      return res.status(400).json({ message: "Channel already exists" });

    if (req.body.name.length < 3)
  return res.status(400).json({ message: "Channel name too short" });

    const channel = await Channel.create({
      name: req.body.name,
      description: req.body.description,
      owner: req.user.id
    });

    res.status(201).json({
      message: "Channel created successfully",
      channel
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.user.id });

    if (!channel)
      return res.status(404).json({ message: "No channel found" });

    res.json(channel);
  } catch {
    res.status(500).json({ message: "Error fetching channel" });
  }
};