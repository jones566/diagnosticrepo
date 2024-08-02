import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  phoneNumber: String,
  emailAddress: String,
  branchId: String,
  appDate: String,
  appTime: [],
  testName: String
});

const Appointment = mongoose.model("Appointment", postSchema);

export default Appointment;
