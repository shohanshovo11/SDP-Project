const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./db");
const cors = require("cors");
require("./Schema/userDetails");
const Job = require("./Schema/job");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require("./Schema/userDetails");
const JWT_SECRET = "jwt-secret-key";
const app = express();
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

const PORT= 5000

dotenv.config()

app.use(cookieParser());
app.use(cors({
  origin:["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(bodyParser.json());
// Define a middleware function to check the database connection status
const checkDatabaseConnection = (req, res, next) => {
  if (mongoose.connection.readyState == 2) {
    // Connection is not open (1 is the readyState for an open connection)
    return res.status(503).json({ Message: "Database is Connecting" });
  }
  else if (mongoose.connection.readyState !== 1) {
    // Connection is not open (1 is the readyState for an open connection)
    return res.status(503).json({ error: "Database not connected" });
  }
  // Connection is open, continue processing the request
  next();
};

// Apply the middleware to all routes
app.use(checkDatabaseConnection);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/post", async (req, res) => {
  console.log(req.body);
  return res.send({ status: 200, statusText: "OK" });
});

const std = mongoose.model("StudentDetails");
//sign-up user
app.post("/register", async (req, res) => {
  try {
    const {
      name: { fname, lname },
      institution,
      email,
      password,
    } = req.body;

    // Check if the email already exists in the database
    const existingUser = await std.findOne({ email });

    if (existingUser) {
      // If email exists, send an error response
      return res.status(400).send({ error: "Email Already Exists" });
    }

    await std.create({
      name: { fname, lname },
      institution,
      email,
      password,
    });
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token);
  if(!token) return res.json("The token was not available")
  else {
    jwt.verify(token,"jwt-secret-key",(err, decoded) => {
      if(err) return res.json("Token is wrong")
      next();
    })
  }
}

app.get("/profile",verifyUser, (req, res) => {
  return res.json("Success");
})

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await std.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (user.password == password) {
      const token = jwt.sign({email: user.email},"jwt-secret-key");
      if(res.status(201))
      {
        return res.json({status:"ok", data:token});
      }
      else
      {
        return res.json({error:"error"});
      }
    }
    res.json({status:"error", error:"Invalid Password"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Forgot Password
app.post('/forgot-password', (req, res) => {
  const {email} = req.body;
  UserModel.findOne({ email : email})
  .then(user => {
    if(!user) {
      return res.send({Status: "User do not exist."})
    }

    const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: "1d"})
    
    // nodemailer
    var transporter = nodemailer.createTransport({ 
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.COM_USER,
        pass: process.env.COM_PASS 
      },
      tls: {
        rejectUnauthorized: false 
      }
    });
    
    var mailOptions = {
      from: process.env.COM_NAME,
      to: email,
      subject: 'Reset Your Password',
      text: `http://localhost:5173/reset-password/${user.id}/${token}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        return res.send({Status: "Success"})
      }
    });
  })
}) 

// Reset Password 
app.post('/reset-password/:id/:token', (req, res) => {
  const {id, token} = req.params
  const {password} = req.body

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if(err) {
      return res.json({Status: "Error with token"})
    }else {
      bcrypt.hash(password, 10)
      .then(hash => {
        UserModel.findByIdAndUpdate({_id: id}, {password: hash})
        .then(u => res.send({Status: "Success"}))
        .catch(err => res.send({Status: err}))
      })
      .catch(err => res.send({Status: err}))
    }
  })
})


//user data
app.post("/userData", async (req, res) => {
  const {token} = req.body;
  try{
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    std.findOne({email: userEmail}).then((data) =>{
      res.send({status: "ok", data});
    }).catch((error) => {res.send({status: "error",data: error})});
  }
  catch(err){

  }
})


app.get("/jobs", async (req, res) => {
  try {
    // Use the "Job" model to find all documents in the "Jobs" collection
    const jobs = await Job.find();

    // Send the job documents as a JSON response
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});