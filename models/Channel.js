import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelName: String,
  description: String,
  userId: String
});

export default mongoose.model("Channel", channelSchema);
