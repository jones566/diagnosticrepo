import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  commenttitle: String,
  commentcontent: String,
  rating: String,
  commentimage: {
    type: String,
    default: "",
  }
});

const Comments = mongoose.model("Comments", postSchema);

export default Comments;
