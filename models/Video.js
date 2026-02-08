import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    thumbnailUrl: String,
    videoUrl: String,
    views: { type: Number, default: 0 },
    category: String,

    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
