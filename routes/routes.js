import Post from "../models/postModel.js";
import Services from "../models/serviceModel.js";
import Comments from "../models/commentModel.js";
import Blog from "../models/blogModel.js";
import Contact from "../models/contactModel.js";
import Appointment from "../models/appointmentModel.js";
import Team from "../models/teamModel.js";
import multer from "multer";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage }).fields([
  {
    name: "image"
  }
  ]);

const uploadmessage = multer({ storage: storage }).fields([
  {
    name: "image1"
  }
  ]);

  const uploadaboutmessage = multer({ storage: storage }).fields([
    {
      name: "image2"
    }
    ]);

    const uploadservicesmessage = multer({ storage: storage }).fields([
      {
        name: "servicesimage"
      }
      ]);

      const uploadblogmessage = multer({ storage: storage }).fields([
        {
          name: "image"
        }
        ]);

        const uploadcommentmessage = multer({ storage: storage }).fields([
          {
            name: "commentimage"
          }
          ]);



      const homePageRouter = (req, res) => {
        Promise.all([
          Post.find({}).exec(),
          Services.find({}).exec(),
          Blog.find({}).exec(),
          Comments.find({}).exec(),
          Team.find({}).exec(),
        ]).then(([posts, services, blogs, comments, teams]) => {
          res.render("index", {
            postContent: posts,
            postService: services,
            postBlog: blogs,
            postComment: comments,
            postTeam: teams,
          });
        }).catch(err => {
          res.status(500).send("Error fetching data");
        });
      };
      

const uploadTeamRouter = (req, res) => {
  const team = new Team({
    business: req.body.tag,
    worker: req.body.workerName,
    content: req.body.content,
    position: req.body.position,
    education: req.body.education,
    phone: req.body.phone,
    links1: req.body.firstLink,
    links2: req.body.secondLink,
    links3: req.body.thirdLink,
    links4: req.body.fourthLink,
    skills: req.body.skills,
    certificates: req.body.certificates,
    image: req.files['image'][0].filename
  });

  team.save((err) => {
    if (!err) {
      res.render("admin/addworker");
    }
    else{
      console.log(err);
    }
  });
};

const uploadServicesRouter = (req, res) => {
  const services = new Services({
    servicestitle: req.body.servicestitle,
    servicesmessage: req.body.servicesmessage,
    servicesimage: req.files['servicesimage'][0].filename
  });

  services.save((err) => {
    if (!err) {
      res.render("admin/addservices");
    }
    else{
      console.log(err);
    }
  });
};

const uploadContactRouter = (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    message: req.body.message
  });

  contact.save((err) => {
    if (!err) {
      res.redirect("index");
    }
    else{
      console.log(err);
    }
  });
};

const uploadAppointmentRouter = (req, res) => {
  const appointment = new Appointment({
      fName: req.body.fName,
      lName: req.body.lName,
      phoneNumber: req.body.phoneNumber,
      emailAddress: req.body.emailAddress,
      branchId: req.body.branchId,
      appDate: req.body.appDate,
      appTime: req.body.appTime,
      testName: req.body.testName
  });

  appointment.save((err) => {
    if (!err) {
      res.redirect("book");
    }
    else{
      console.log(err);
    }
  });
};

const uploadCommentsRouter = (req, res) => {
  const comments = new Comments({
    commenttitle: req.body.commenttitle,
    commentcontent: req.body.commentcontent,
    rating: req.body.rating,
    commentimage: req.files['commentimage'][0].filename
  });

  comments.save((err) => {
    if (!err) {
      res.redirect("index");
    }
    else{
      console.log(err);
    }
  });
};

const uploadBlogsRouter = (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    image: req.files['image'][0].filename
  });

  blog.save((err) => {
    if (!err) {
      res.render("admin/addblog");
    }
    else{
      console.log(err);
    }
  });
};

const uploadWelcomeRouter = (req, res) => {
  const post = new Post({
    firstmessage: req.body.firstmessage,
    secondmessage: req.body.secondmessage,
    thirdmessage: req.body.thirdmessage,
    image1: req.files['image1'][0].filename
  });

  post.save((err) => {
    if (!err) {
      res.render("admin/addwelcome");
    }
    else{
      console.log(err);
    }
  });
};

const uploadAboutRouter = (req, res) => {
  const post = new Post({
    firstabtmessage: req.body.firstabtmessage,
    secondabtmessage: req.body.secondabtmessage,
    image2: req.files['image2'][0].filename
  });

  post.save((err) => {
    if (!err) {
      res.render("admin/addabtmessage");
    }
    else{
      console.log(err);
    }
  });
};

const singleWorkerRouter = (req, res, next) => {
  const requestedPostId = req.params.postId;

  Team.findOne({worker:  requestedPostId}, (err, post) => {
    if (err) return next(err);
    res.render("team", {
      business: post.business,
      content: post.content,
      position: post.position,
      education: post.education,
      phone: post.phone,
      links1: post.links1,
      links2: post.links2,
      links3: post.links3,
      links4: post.links4,
      skills: post.skills,
      certificates: post.certificates,
      image: post.image,
    });
  });
};

const singleServicesRouter = (req, res, next) => {
  const requestedPostId = req.params.postId;

  Services.findOne({servicestitle:  requestedPostId}, (err, post) => {
    if (err) return next(err);
    res.render("services", {
      servicestitle: post.servicestitle,
      servicesmessage: post.servicesmessage,
      servicesimage: post.servicesimage,
    });
  });
};

const singleBlogRouter = (req, res, next) => {
  const requestedPostId = req.params.postId;

  Blog.findOne({title:  requestedPostId}, (err, post) => {
    if (err) return next(err);
    res.render("blog", {
      title: post.title,
      content: post.content,
      date: post.date,
      image: post.image,
    });
  });
};

const singleMessageRouter = (req, res, next) => {
  const requestedPostId = req.params.postId;

  Post.findOne({firstmessage:  requestedPostId}, (err, post) => {
    if (err) return next(err);
    res.render("welcome", {
      firstmessage: post.firstmessage,
      secondmessage: post.secondmessage,
      thirdmessage: post.thirdmessage,
      image1: post.image1,
    });
  });
};

const singleAboutRouter = (req, res, next) => {
  const requestedPostId = req.params.postId;

  Post.findOne({firstabtmessage:  requestedPostId}, (err, post) => {
    if (err) return next(err);
    res.render("about", {
      firstabtmessage: post.firstabtmessage,
      secondabtmessage: post.secondabtmessage,
      image2: post.image2,
    });
  });
};

const addWorkerPageRouter = (req, res) => {
  res.render("admin/addworker");
};
const addServicesPageRouter = (req, res) => {
  res.render("admin/addservices");
};
const addWelcomePageRouter = (req, res) => {
  res.render("admin/addwelcome");
};
const addAboutPageRouter = (req, res) => {
  res.render("admin/addabtmessage");
};

const addBlogPageRouter = (req, res) => {
  res.render("admin/addblog");
};

const addAppointmentPageRouter = (req, res) => {
  res.render("book");
};



  
export default homePageRouter;
export { uploadTeamRouter, singleWorkerRouter, addWorkerPageRouter,upload, 
         addWelcomePageRouter, singleMessageRouter, uploadWelcomeRouter, uploadmessage,
         uploadaboutmessage, uploadAboutRouter, addAboutPageRouter, singleAboutRouter,
         uploadservicesmessage, uploadServicesRouter, singleServicesRouter, addServicesPageRouter,
         uploadblogmessage, uploadBlogsRouter, singleBlogRouter, addBlogPageRouter,
         uploadCommentsRouter, uploadcommentmessage, uploadContactRouter, uploadAppointmentRouter,
         addAppointmentPageRouter
        };
