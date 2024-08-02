/*  ---------Project Info--------
            INTRODUCTION
  This is a diagnostic application;        

*/

import mongoose from 'mongoose';  //This is a mongodb package for creating the schemas
import dotenv from 'dotenv';  //This line helps to keep the most important values private in the .env
import express from "express"; //This is the framework library
import bodyParser from "body-parser"; //Body parser helps to connect our name field to our backend
import _ from "lodash"; //lodash helps us to create a param which we can bind to our products so that we can view the individually




// This line imports various routes from the various models
import {uploadTeamRouter, singleWorkerRouter, singleMessageRouter, addWorkerPageRouter, upload, 
       addWelcomePageRouter, uploadWelcomeRouter, uploadmessage, uploadServicesRouter, singleServicesRouter,
       uploadaboutmessage, uploadAboutRouter, addAboutPageRouter, singleAboutRouter, uploadservicesmessage,
       addServicesPageRouter, singleBlogRouter, uploadblogmessage, uploadBlogsRouter, addBlogPageRouter,
       uploadCommentsRouter, uploadcommentmessage, uploadContactRouter, addAppointmentPageRouter,
       uploadAppointmentRouter
       } 
       from './routes/routes.js';

import Appointment from "./models/appointmentModel.js";
import Contact from "./models/contactModel.js";       
import homePageRouter from "./routes/routes.js";
import footerRouter from "./routes/footer.js";
import sidenavRouter from "./routes/sidenav.js";
import topheaderRouter from "./routes/topheader.js";
//  end of imports

dotenv.config();        
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.use(express.static("images"))
app.use(express.static("galleries"))
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

//The below lines of code are the APIs Routes
app.get("/admin/indexes", (req, res) => {
  Promise.all([
    Contact.find({}).exec(),
    Appointment.find({}).exec(),
  ]).then(([contact, book]) => {
    res.render("admin/indexes", {
      postContact: contact,
      postBook: book,
    });
  }).catch(err => {
    res.status(500).send("Error fetching data");
  });
}); //This is the admin dashboard route;

app.get("/admin/sidenav", sidenavRouter);

app.get("/admin/topheader", topheaderRouter);
  
app.get("/admin/footer",  footerRouter);

app.get("/index", homePageRouter);

app.post("/contact", uploadContactRouter);

app.post("/comment", uploadcommentmessage, uploadCommentsRouter);

app.get("/workers/:postId", singleWorkerRouter);

app.get("/services/:postId", singleServicesRouter);

app.get("/welcome/:postId", singleMessageRouter);

app.get("/about/:postId", singleAboutRouter);

app.get("/blog/:postId", singleBlogRouter);

app.get("/admin/addworker", addWorkerPageRouter);

app.get("/admin/addblog", addBlogPageRouter);

app.get("/admin/addservices", addServicesPageRouter);

app.post("/admin/addworker", upload, uploadTeamRouter);

app.post("/admin/addblog", uploadblogmessage, uploadBlogsRouter);

app.post("/admin/addservices", uploadservicesmessage, uploadServicesRouter);

app.get("/admin/addWelcome", addWelcomePageRouter);

app.post("/admin/addWelcome", uploadmessage, uploadWelcomeRouter);

app.get("/admin/addabtmessage", addAboutPageRouter);

app.post("/admin/addabtmessage", uploadaboutmessage, uploadAboutRouter);

app.get("/book", addAppointmentPageRouter);

app.post("/book", uploadAppointmentRouter);

//The below lines of code connects you to either the cloud or local host 

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => console.log("Server is running on port 3000 and database is connected successfully"));