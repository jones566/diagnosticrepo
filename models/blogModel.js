import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: String,
  image: {
    type: String,
    default: "",
  }
});

const Blog = mongoose.model("Blog", postSchema);

export default Blog;
