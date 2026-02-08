import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  thumbnailUrl: String,
  videoUrl: String,
  category: String,
  userId: String
});

export default mongoose.model("Video", videoSchema);
