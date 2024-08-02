import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  message: String
});

const Contact = mongoose.model("Contact", postSchema);

export default Contact;
