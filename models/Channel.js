// import mongoose from "mongoose";

// const channelSchema = new mongoose.Schema({
//   channelName: String,
//   description: String,
//   userId: String
// });

// export default mongoose.model("Channel", channelSchema);


import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true
  }
});


export default mongoose.model("Channel", channelSchema);
