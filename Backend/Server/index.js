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
const AdminModel = require("./Schema/adminDetails");
const TuitionModel = require("./Schema/tuition");
const EmployerModel = require("./Schema/employer")
const FreelancerModel = require("./Schema/freelancerSchema");
const InternshipModel = require("./Schema/internship");
const CandidateEmployerModel = require("./Schema/candidateEmployer");
const PartTimeJobModel = require("./Schema/partTime");

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

app.use(bodyParser.json ({ limit: "50mb" }));


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
    const fname = "";
    await User.create({
      name: { fname, fname },
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
    const { email, password } = req.body;
    const user = await User.findOne({ email });

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
    const jobs = await TuitionModel.find();
    console.log(jobs);
    // Send the job documents as a JSON response
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/update", async (req, res) => {
  try {
    const { fname = "", lname = "", email = "", gender = "", address = "", phone = "", base64 = "" } = req.body;
    if(req.body.birthDate == "NaN-NaN-NaN") req.body.birthDate = null;
    const birthDate = req.body.birthDate ? new Date(req.body.birthDate) : null;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.name) {
      user.name.fname = fname;
      user.name.lname = lname;
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


app.post('/insertjob', (req,res) => {
  
  const jobdesc=req.body
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


app.post('/approve/:id', async (req,res) => {
  let value=req.body
  delete value._id
  await db.collection("pendingjob").deleteOne(value)
  value.id=req.params.id
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

app.get('/pendingjobshow/:filter', async (req,res) => {
  const filter=req.params.filter
  let find={}
  if(filter!=="all")
    find["category"]=filter
  const data= await db.collection("pendingjob").find(find).sort().toArray()
  .catch(()=> res.status(500).json("Could not show data"));
  res.json(data)
})