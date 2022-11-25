import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: String,

  image: [{
    type: String,
    required: false,
  }],
  video: [{
    type: String,
    required: false,
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

export default mongoose.model("Post", postSchema);