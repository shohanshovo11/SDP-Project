const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./db");
const cors = require("cors");
const OTPModel = require("./Schema/otp");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const JWT_SECRET = "jwt-secret-key";
const otpGenerator = require("otp-generator");

const UserModel = require("./Schema/userDetails");
const TuitionModel = require("./Schema/tuition");
const EmployerModel = require("./Schema/employer")
const FreelancerModel = require("./Schema/freelancerSchema");
const InternshipModel = require("./Schema/internship");
const CandidateEmployer = require("./Schema/candidateEmployer");
const PartTimeJobModel = require("./Schema/partTime");
const AdminModel = require("./Schema/adminDetails");

const app = express();

const nodemailer = require("nodemailer");

const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;


app.use(cors());
// app.use(cors({
//   origin: "*", // Replace with your frontend's URL
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify the HTTP methods you want to allow
//   credentials: true, // Enable credentials (cookies, authorization headers)
// }));



const Education = require("./Schema/education");

app.use(bodyParser.json({ limit: "50mb" }));


// Define a middleware function to check the database connection status
// const checkDatabaseConnection = (req, res, next) => {
//   if (mongoose.connection.readyState == 2) {
//     // Connection is not open (1 is the readyState for an open connection)
//     return res.status(503).json({ Message: "Database is Connecting" });
//   } else if (mongoose.connection.readyState !== 1) {
//     // Connection is not open (1 is the readyState for an open connection)
//     return res.status(503).json({ error: "Database not connected" });
//   }
//   // Connection is open, continue processing the request
//   next();
// };

// Apply the middleware to all routes
// app.use(checkDatabaseConnection);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/",(req, res) => {
  res.json("Hello");
})
app.post("/post", async (req, res) => {
  console.log(req.body);
  return res.send({ status: 200, statusText: "OK" });
});

const User = require("./Schema/userDetails");
const Employer = require("./Schema/employer");
//sign-up user
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If email exists, send an error response
      return res.status(400).send({ error: "Email Already Exists" });
    }
    const name = "";
    await User.create({
      name: name,
      email,
      password,
    });
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/registeremployer", async (req, res) => {
  try {
    // Check if the email already exists in the database
    const info = req.body;
    const email=req.body.email;
    const existingUser = await  db.collection("employers").findOne({email:email});
    if (existingUser) {
      // If email exists, send an error response
      return res.status(400).send({ error: "Email Already Exists" });
    }
    const data= await db.collection("employers").insertOne(info)
    .catch(()=> res.status(500).json("Could not insert data"))
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
});


app.post("/adminlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AdminModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (user.password == password) {
      const token = jwt.sign({ email: user.email }, "jwt-secret-key");

      // Send the token and user's profile image URL in the response
      return res.json({
        status: "ok",
        token,
        profileImgUrl: user.profileImgUrl,
      });
    }

    res.json({ status: "error", error: "Invalid Password" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const verifyUser = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1] || req.cookies.token;
  // console.log(token);
  if (!token) {
    return res.json("The token was not available");
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json("Token is wrong");
      }
      // Store the decoded data in req.user
      req.user = decoded;
      next();
    });
  }
};


app.get("/profile", verifyUser, (req, res) => {
  return res.json("Success");
});

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password, loginType } = req.body;
    var user;

    if( loginType === "student")
      user = await User.findOne({ email });
    else if(loginType === "employer")
      user = await Employer.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (user.password == password) {
      const token = jwt.sign({ email: user.email }, "jwt-secret-key");
      console.log("Password matched");
      // Send the token and user's profile image URL in the response
      return res.json({
        status: "ok",
        token,
        profileImgUrl: user.profileImgUrl,
      });
    }

    res.json({ status: "error", error: "Invalid Password" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Forgot Password
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(email)
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: "User does not exist." });
    }
    const existingOTP = await OTPModel.findOne({ email });
    console.log(existingOTP);
    if (existingOTP) {
      return res
        .status(400)
        .json({ status: "OTP already sent. Try again after 1 hour." });
    }
    const min = 1000;
    const max = 9999;
    const OTP = Math.floor(Math.random() * (max - min + 1)) + min;
    await OTPModel.create({ email, otp: OTP, start: new Date() });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.COM_USER,
        pass: process.env.COM_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.COM_NAME,
      to: email,
      subject: "Reset Your Password",
      text: `Your OTP is ${OTP}. Do not share it with others.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
        res.status(500).json({ status: "Email could not be sent." });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ status: "Success" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: "An error occurred." });
  }
});
// OTP
app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await OTPModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ Status: "User does not exist." });
    }
    if (user.email === email && user.otp == otp) {
      OTPModel.deleteMany({ email })
        .then(() => {
          console.log("OTP documents deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting OTP documents:", error);
          res
            .status(500)
            .json({ Status: "An error occurred while deleting OTP." });
        });
      return res.status(200).json({ Status: "Success" });
    } else {
      return res.status(401).json({ Status: "Otp Expired or Incorrect OTP." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ Status: "An error occurred." });
  }
});
// Reset Password
app.post("/reset-password/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ Status: "User not found." });
    }
    user.password = password;
    await user.save();
    res.status(200).json({ Status: "Success" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ Status: "An error occurred." });
  }
});
//user data
app.post("/userData", verifyUser, async (req, res) => {
  try {
    const user = req.user;
    const userEmail = user.email;
    try {
      const data = await User.findOne({ email: userEmail });
      if (data) {
        res.send({ status: "ok", data });
      } else {
        res.send({ status: "error", data: "User not found" });
      }
    } catch (error) {
      res.send({ status: "error", data: error.message });
    }
  } catch (err) {
    res.send({ status: "error", message: "Token verification failed" });
  }
});

app.get("/userData", async (req, res) => {
  try {
    const { userEmail } = req.body;
    // console.log(userEmail,req);
    try {
      const data = await UserModel.findOne({ email: userEmail }).select('-profileImgUrl').select('-password');

      if (data) {
        res.send({ data });
      } else {
        res.send({ data: "User not found" });
      }
    } catch (error) {
      res.send({ status: "error", data: error.message });
    }
  } catch (err) {
    res.send({ status: "error", message: "Token verification failed" });
  }
});

app.get("/getStdData/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;

    try {
      const data = await UserModel.findOne({ email: userEmail }).select('-profileImgUrl').select('-password');

      if (data) {
        res.send({ data });
      } else {
        res.send({ data: "User not found" });
      }
    } catch (error) {
      res.send({ status: "error", data: error.message });
    }
  } catch (err) {
    res.send({ status: "error", message: "Token verification failed" });
  }
});



app.post("/getEducation", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    // console.log("coming");
    Education.findOne({ email: userEmail })
      .then((data) => {
        res.send({ status: "ok", data });
        console.log(data);
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (err) {}
});
app.post("/getCvResume", async (req, res) => {
  const { token } = req.body;
  console.log(token);
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    // console.log("coming");
    Education.findOne({ email: userEmail })
      .then((data) => {
        console.log(data.cvResume);
        res.send({ status: "ok", cvResume: data.cvResume });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (err) {}
});
app.post("/updateCvResume", async (req, res) => {
  const { token, cvResume } = req.body; // Assuming you pass the newCvResume in the request body
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    // console.log(cvResume);

    // Find the user's education information
    Education.findOne({ email: userEmail })
      .then((data) => {
        if (data) {
          // If the user's education information exists, update the 'cvResume' field
          data.cvResume = cvResume;
          data
            .save()
            .then((updatedData) => {
              res.send({ status: "ok", data: updatedData });
            })
            .catch((error) => {
              res.send({ status: "error", message: error.message });
            });
        } else {
          // If the user's education information doesn't exist, create a new record
          const newEducation = new Education({
            email: userEmail,
            cvResume: cvResume,
            // other fields as needed
          });

          newEducation
            .save()
            .then((createdData) => {
              res.send({ status: "ok", data: createdData });
            })
            .catch((error) => {
              res.send({ status: "error", message: error.message });
            });
        }
      })
      .catch((error) => {
        res.send({ status: "error", message: error.message });
      });
  } catch (err) {
    res.send({ status: "error", message: "Token verification failed" });
  }
});

app.get("/jobs", async (req, res) => {
  try {
    // Use the "Job" model to find all documents in the "Jobs" collection
    const jobs = {};
    const tuitionJobs = await TuitionModel.find();
    const internJobs = await InternshipModel.find();
    const partTimeJobs = await PartTimeJobModel.find();
    const freelanceJobs = await FreelancerModel.find();
    jobs.tuitionJobs = tuitionJobs;
    jobs.internJobs = internJobs;
    jobs.partTimeJobs = partTimeJobs;
    jobs.freelanceJobs = freelanceJobs;
    // console.log("me");
    console.log("jobs ",jobs);
    // console.log(jobs);
    // Send the job documents as a JSON response
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/update", async (req, res) => {
  try {
    const { name = "", email = "", gender = "", address = "", phone = "", base64 = "" } = req.body;
    console.log(name);
    if(req.body.birthDate == "NaN-NaN-NaN") req.body.birthDate = null;
    const birthDate = req.body.birthDate ? new Date(req.body.birthDate) : null;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name) {
      user.name = name;
    }
    if (gender) user.gender = gender;
    if (birthDate) user.birthDate = birthDate;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    if (base64) user.profileImgUrl = base64;
    await user.save();
    res.status(200).json({ message: "User information updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


//update education
app.post("/education", async (req, res) => {
  const {
    email,
    sscResult,
    hscResult,
    currentInstitution,
    deptName,
    bio,
    sscCertificate,
    hscCertificate,
    school,
    college,
  } = req.body;
  // console.log(sscCertificate,hscCertificate,"Shovo");

  // Check if there's an existing education entry with the provided email
  const existingEducation = await Education.findOne({ email });
  // console.log(existingEducation , "shovo");

  if (existingEducation) {
    // If an entry exists, update it
    existingEducation.sscResult = sscResult;
    existingEducation.hscResult = hscResult;
    existingEducation.currentInstitution = currentInstitution;
    existingEducation.deptName = deptName;
    existingEducation.bio = bio;
    existingEducation.sscCertificate = sscCertificate;
    existingEducation.hscCertificate = hscCertificate;
    existingEducation.school = school;
    existingEducation.college = college;

    existingEducation
      .save()
      .then(() => {
        console.log("Data updated successfully");
        return res.status(200).send("Data updated successfully");
      })
      .catch((err) => {
        console.error("Error while updating data:", err);
        return res.status(500).send("Error while updating data");
      });
  } else {
    // If no entry exists, create a new one
    const newEducation = new Education({
      email,
      sscResult,
      hscResult,
      currentInstitution,
      deptName,
      bio,
      sscCertificate,
      hscCertificate,
      school,
      college,
    });

    newEducation
      .save()
      .then(() => {
        console.log("Data saved successfully");
        return res.status(200).send("Data saved successfully");
      })
      .catch((err) => {
        console.error("Error while saving data:", err);
        return res.status(500).send("Error while saving data");
      });
  }
});

app.get("/api/profileImage", (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email parameter is required." });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      const profileImg = user.profileImgUrl; // Assuming profileImgUrl contains the Base64 image data
      // console.log("shovo");

      if (!profileImg) {
        return res.status(404).json({ error: "Profile image not found." });
      }

      res.json({ profileImg });
    })
    .catch((error) => {
      console.error("Error fetching profile image:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.get('/tutorjobcount', (req,res) => {
  db.collection("tuitions").estimatedDocumentCount()
  .then(vari =>{
    res.json(vari)
  })
  .catch(()=> res.status(500).json("Could not insert data"));
})


app.post('/tutorjob', (req,res) => {
  
  const tutor=req.body
  db.collection("tuitions").insertOne(tutor)
  .then(vari =>{
    res.json(vari)
  })
  .catch(()=> res.status(500).json("Could not insert data"));
})

app.get('/freelancejobcount', (req,res) => {
  db.collection("freelancers").estimatedDocumentCount()
  .then(vari =>{
    res.json(vari)
  })
  .catch(()=> res.status(500).json("Could not insert data"));
})


app.post('/freelancejob', (req,res) => {
  
  const freelancer=req.body
  db.collection("freelancers").insertOne(freelancer)
  .then(vari =>{
    res.json(vari)
  })
  .catch(()=> res.status(500).json("Could not insert data"));
})


app.get('/internjobcount', (req,res) => {
  db.collection("internships").estimatedDocumentCount()
  .then(vari =>{
    res.json(vari)
  })
  .catch(()=> res.status(500).json("Could not insert data"));
})


app.post('/internjob', (req,res) => {
  
  const intern=req.body
  db.collection("internships").insertOne(intern)
  .then(vari =>{
    res.json(vari)
  })
  .catch(()=> res.status(500).json("Could not insert data"));
})


app.get('/parttimejobcount', (req,res) => {
  db.collection("parttimejobs").estimatedDocumentCount()
  .then(vari =>{
    res.json(vari)
  })
  .catch(()=> res.status(500).json("Could not insert data"));
})


app.post('/parttimejob', (req,res) => {
  
  const parttime=req.body
  db.collection("parttimejobs").insertOne(parttime)
  .then(vari =>{
    res.json(vari)
  })
  .catch(()=> res.status(500).json("Could not insert data"));
})


// Employer-Joblist
app.get('/employers-joblist/:email', async (req,res) => {
  try {

    const email = req.params.email;
    //console.log(email);
    // Use the "Job" model to find all documents in the "Jobs" collection
    const jobID = await CandidateEmployer.find({ $and : [{employerEmail : email}, {assigned : null }]}, {jobId : 1, _id: 0});
    var jobs = [];
    for(let i=0 ; i<jobID.length ; i++)
    {
      const j = await TuitionModel.findById(jobID[i].jobId);
      if(j) jobs.push(j);
    }
    for(let i=0 ; i<jobID.length ; i++)
    {
      const j = await InternshipModel.findById(jobID[i].jobId);
      if(j) jobs.push(j);
    }
    for(let i=0 ; i<jobID.length ; i++)
    {
      const j = await PartTimeJobModel.findById(jobID[i].jobId);
      if(j) jobs.push(j);
    }
    for(let i=0 ; i<jobID.length ; i++)
    {
      const j = await FreelancerModel.findById(jobID[i].jobId);
      if(j) jobs.push(j);
    }
    
    // Send the job documents as a JSON response
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
})


//getInactiveJobs
app.get('/getInactiveJobs', async (req, res) => {
  try {
    // Using await to wait for the query execution
    let jobs = await TuitionModel.find({ active: false }); 
    // console.log(jobs);
    res.json(jobs); // Sending the inactive jobs as a response
  } catch (e) {
    console.log(e);
    res.status(500).send("An error occurred");
  }
});
app.get('/tutorjobcount', (req,res) => {
  db.collection("tuitions").estimatedDocumentCount()
  .then(vari =>{
    res.json(vari)
  })
  .catch(()=> res.status(500).json("Could not insert data"));
})


app.post('/insertjob', (req,res) => {
  
  const jobdesc=req.body
  // console.log(jobdesc)
  db.collection("pendingjob").insertOne(jobdesc)
  .then(vari =>{
    res.json(vari)
  })
  .catch(()=> res.status(500).json("Could not insert data"));
})

app.get('/freelancejobcount', (req,res) => {
  db.collection("freelancers").estimatedDocumentCount()
  .then(vari =>{
    res.json(vari)
  })
  .catch(()=> res.status(500).json("Could not insert data"));
})



app.get('/internjobcount', (req,res) => {
  db.collection("internships").estimatedDocumentCount()
  .then(vari =>{
    res.json(vari)
  })
  .catch(()=> res.status(500).json("Could not insert data"));
})

app.get('/parttimejobcount', (req,res) => {
  db.collection("parttimejobs").estimatedDocumentCount()
  .then(vari =>{
    res.json(vari)
  })
  .catch(()=> res.status(500).json("Could not insert data"));
})


app.post('/approve', async (req,res) => {
  let value=req.body
  console.log(value,"shohan");
  delete value._id
  await db.collection("pendingjob").deleteOne(value)
  // value.id=req.params.id
  let data
  if(value.category==="tuition")
  {
    delete value.category
    data= await db.collection("tuitions").insertOne(value)
    .catch(()=> res.status(500).json("Could not insert data"))
  }
  else if(value.category==="internship")
  {
    delete value.category
    data= await db.collection("internships").insertOne(value)
    .catch(()=> res.status(500).json("Could not insert data"))
  }
  else if(value.category==="parttime")
  {
    delete value.category
    data= await db.collection("parttimejobs").insertOne(value)
    .catch(()=> res.status(500).json("Could not insert data"))
  }
  else if(value.category==="freelance")
  {
    delete value.category
    data= await db.collection("freelancers").insertOne(value)
    .catch(()=> res.status(500).json("Could not insert data"))
  }
  res.json(data)
})
app.delete('/deletePendingJob', async (req,res) => {
  let value=req.body
  console.log(value,);
  await db.collection("pendingjob").deleteOne(value)
  // value.id=req.params.id
  // let data
  // if(value.category==="tuition")
  // {
  //   delete value.category
  //   data= await db.collection("tuitions").insertOne(value)
  //   .catch(()=> res.status(500).json("Could not insert data"))
  // }
  // else if(value.category==="internship")
  // {
  //   delete value.category
  //   data= await db.collection("internships").insertOne(value)
  //   .catch(()=> res.status(500).json("Could not insert data"))
  // }
  // else if(value.category==="parttime")
  // {
  //   delete value.category
  //   data= await db.collection("parttimejobs").insertOne(value)
  //   .catch(()=> res.status(500).json("Could not insert data"))
  // }
  // else if(value.category==="freelance")
  // {
  //   delete value.category
  //   data= await db.collection("freelancers").insertOne(value)
  //   .catch(()=> res.status(500).json("Could not insert data"))
  // }
  res.json("Deleted")
})

app.get('/pendingjobshow/:filter', async (req,res) => {
  const filter=req.params.filter
  let find={}
  if(filter!=="all")
    find["category"]=filter
  const data= await db.collection("pendingjob").find(find).sort().toArray()
  .catch(()=> res.status(500).json("Could not show data"));
  res.json(data)
})

app.post('/apply/tuition/:_id', async (req, res) => {
  try {
    const jobId = req.params._id;
    const { employerEmail, applicantEmail } = req.body;
    let candidateEmployer = await CandidateEmployer.findOne({ jobId });
    const employer = await EmployerModel.findOne({ email: employerEmail });

    if (!candidateEmployer) {
      candidateEmployer = new CandidateEmployer({
        employerEmail,
        jobId,
        candidateList: [applicantEmail],
      });
      await candidateEmployer.save();
      return res.status(201).json({ message: 'Application submitted successfully' });
    }
    if (!candidateEmployer.candidateList.includes(applicantEmail)) {
      candidateEmployer.candidateList.push(applicantEmail);
      await candidateEmployer.save();
      return res.status(200).json({ message: 'Application submitted successfully' });
    }
    return res.status(409).json({ message: 'You have already applied for this job' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getEmployerInfo', async (req, res) => {
  try {
    // console.log(req.query,"shovo");
    const { employerEmail } = req.query; // Use req.query instead of req.body
    const employer = await EmployerModel.findOne({ email: employerEmail });

    if (employer) {
      return res.status(200).json({
        message: 'Employer information retrieved successfully',
        employer: employer.toObject(),
      });
    } else {
      return res.status(404).json({ message: 'Employer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getJobInfo/:id', async (req, res) => {
  const  jobID  = req.params.id; // Use req.query instead of req.body
  let job = await TuitionModel.findById(jobID);
  if(!job) job = await InternshipModel.findById(jobID);
  if(!job) job = await PartTimeJobModel.findById(jobID);
  if(!job) job = await FreelancerModel.findById(jobID);
  console.log(job);
  if (job) {
    return res.status(200).json({job});
  } else {
    return res.status(404).json({ message: 'Employer not found' });
  }
});

app.put('/updateEmployerInfo', async (req, res) => {
  try {
    const { employerEmail, updatedInfo } = req.body;
    console.log(updatedInfo,"shohan");
    // Find the employer by email
    const employer = await EmployerModel.findOne({ email: employerEmail });

    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }
    // console.log(employer,"shovo");
    // Update the employer information
    employer.set(updatedInfo);
    await employer.save();

    return res.status(200).json({
      message: 'Employer information updated successfully',
      updatedInfo: employer.toObject(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/candidatelist/:jobId", async (req, res) => {
  let candidates = [];
  const JobId = req.params.jobId;

  const data = await db
    .collection("candidateemployers")
    .findOne({ jobId: JobId }, { projection: { candidateList: 1, _id: 0 } })
    .catch(() => res.status(500).json("Could not get data"));

  data ? (candidates = data.candidateList) : (candidates = []);
  console.log(candidates);

  const list = await db
    .collection("StudentDetails")
    .find(
      { email: { $in: candidates } },
            // { projection: { name: 1, profileImgUrl: 1, email: 1, _id: 0 } }
    )
    .toArray()
    .catch(() => res.status(500).json("Could not get data"));
  res.json(list);
});

app.put("/accept/:JID/:SID", async (req, res) => {
  const jid = req.params.JID;
  const sid = req.params.SID;

  const data = await db
    .collection("candidateemployers")
    .updateOne({ jobId: jid }, { $set: { assigned: sid } })
    .catch(() => res.status(500).json("Could not get data"));
  res.json(data);
});

app.get('/studentshow/:email', async (req,res) => {
  const email=req.params.email
  const data= await db.collection("StudentDetails").findOne({email:email})
  .catch(()=> res.status(500).json("Could not show data"));
  res.json(data)
})

app.post('/giverate/:email', async (req,res) => {
  console.log(req.body)
  const email=req.params.email
  const rating2=req.body.rating
  const review=req.body
  const res2=await db.collection("Rating").findOne({email:email})
  if(!res2)
  {
    await db.collection("Rating").insertOne({email:email,rating:0,review:[]})
  }
  let rating3
  const rating1=res2.rating || 0
  rating3=(rating1+rating2)/2
  console.log(res2)
  const data= await db.collection("Rating").updateOne({email:email},{$set:{rating:Math.round(rating3)},$push:{review:review}})
  .catch(()=> res.status(500).json("Could not show data"));
  res.json(data)
})

app.get('/viewapprove', async (req,res) => {
  const data= await db.collection("candidateemployers").find({},{projection:{assigned:1,_id:0}}).toArray()
  let emails=[]
  data.forEach(email => emails.push(email.assigned))
  const data1=await db.collection("StudentDetails").find({email:{$in:emails}}).toArray()
    .catch(()=> res.status(500).json("Could not show data"));
  res.json(data1)
  console.log(data)
})
///job employer
app.get('/jobs/:employerEmail', async (req, res) => {
  try {
    const employerEmail = req.params.employerEmail;

    // Search in PartTimeJob collection
    const partTimeJobs = await PartTimeJobModel.find({ email: employerEmail }).select('_id title');

    // Search in Internship collection
    const internships = await InternshipModel.find({ email: employerEmail }).select('_id title');

    // Search in Freelancer collection
    const freelancerJobs = await FreelancerModel.find({ email: employerEmail }).select('_id title');

    // Search in Tuition collection
    const tuitionJobs = await TuitionModel.find({ email: employerEmail }).select('_id title');

    // Combine results into a single array
    const jobsPostedByEmployer = [...partTimeJobs, ...internships, ...freelancerJobs, ...tuitionJobs];

    // Respond with the array of job titles and _id
    res.json({ jobs: jobsPostedByEmployer.map(job => ({ _id: job._id, title: job.title })) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/getAssignedCandidate/:candidateEmail', async (req, res) => {
  try {
    // Extract candidate email from the URL params
    const { candidateEmail } = req.params;

    // Find all documents where the candidate email matches the assigned field
    const candidateEmployers = await CandidateEmployer.find({
      assigned: candidateEmail
    });

    if (candidateEmployers.length === 0) {
      // If no matching documents are found, respond with an appropriate message
      return res.status(404).json({ message: 'Candidate not found in any job assignments' });
    }

    // Extract job IDs and employer emails from the found documents
    const assignments = candidateEmployers.map(({ jobId, employerEmail }) => ({ jobId, employerEmail }));

    // Respond with an array of job IDs and employer emails
    res.json(assignments);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/appliedJobs/:candidateEmail', async (req, res) => {
  try {
    // Extract candidate email from the URL params
    const { candidateEmail } = req.params;

    // Find all documents where the candidate email is present in the candidateList array
    const candidateEmployers = await CandidateEmployer.find({
      candidateList: candidateEmail
    });

    if (candidateEmployers.length === 0) {
      // If no matching documents are found, respond with an appropriate message
      return res.status(404).json({ message: 'Candidate not found in any job lists' });
    }

    // Extract job IDs and employer emails from the found documents
    const assignments = candidateEmployers.map(({ jobId, employerEmail }) => ({ jobId, employerEmail }));

    // Respond with an array of job IDs and employer emails
    res.json(assignments);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.delete('/removeCandidate/:jobId/:candidateEmail', async (req, res) => {
  try {
    const { jobId, candidateEmail } = req.params;

    // Find the document with the given jobId
    const candidateEmployer = await CandidateEmployer.findOne({ jobId });

    if (!candidateEmployer) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Remove the candidateEmail from the candidateList array
    candidateEmployer.candidateList = candidateEmployer.candidateList.filter(
      (email) => email !== candidateEmail
    );

    // Save the updated document
    const updatedCandidateEmployer = await candidateEmployer.save();
    // , data: updatedCandidateEmployer
    res.json({ success: true });
  } catch (error) {
    console.error('Error removing candidate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const coursesModel = require("./Schema/courses");
app.get("/courses", async (req, res) => {
  const data = await coursesModel.find();
  // console.log(data);
  res.json(data);
});

app.get("/link/:cid", async (req, res) => {
  const cId = req.params.cid;
  const data = await db
    .collection("courses")
    .findOne({ course_id: cId }, { projection: { _id: 0, vidLink: 1 } });
  // console.log(data);
  res.json(data);
});
