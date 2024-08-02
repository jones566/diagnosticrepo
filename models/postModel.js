import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  firstmessage: String,
  secondmessage: String,
  thirdmessage: String,
  firstabtmessage: String,
  secondabtmessage: String,
  image1: {
    type: String,
    default: "",
  },
  image2: {
    type: String,
    default: "",
  }
});

const Post = mongoose.model("Post", postSchema);

export default Post;
