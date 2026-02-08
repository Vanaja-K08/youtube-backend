import Comment from "../models/Comment.js";

/* ADD COMMENT */
export const addComment = async (req, res) => {
  const comment = await Comment.create({
    text: req.body.text,
    video: req.body.videoId,
    user: req.user
  });
  res.status(201).json(comment);
};

/* GET COMMENTS FOR VIDEO */
export const getComments = async (req, res) => {
  const comments = await Comment.find({ video: req.params.videoId })
    .populate("user", "username");
  res.json(comments);
};
