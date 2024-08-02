import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  firstabtmessage: String,
  secondabtmessage: String,
  aboutimage: {
    type: String,
    default: ""
  }
});

const About = mongoose.model("About", postSchema);

export default About;
