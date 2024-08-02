import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  firstabtmessage: String,
  secondabtmessage: String,
  image2: {
    type: String,
    default: "",
  }
});

const About = mongoose.model("About", postSchema);

export default About;
