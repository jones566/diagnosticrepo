import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  servicestitle: String,
  servicesmessage: String,
  servicesimage: {
    type: String,
    default: "",
  }
});

const Services = mongoose.model("Services", postSchema);

export default Services;
