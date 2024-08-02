import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  business: String,
  worker: String,
  content: String,
  position: String,
  education: String,
  phone: String,
  links1: String,
  links2: String,
  links3: String,
  links4: String,
  skills: String,
  certificates: String,
  image: {
    type: String,
    default: "",
  }
});

const Team = mongoose.model("Team", postSchema);

export default Team;
