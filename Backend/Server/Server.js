const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // Import bodyParser to parse request bodies
const db = require("./db");
const cors = require("cors");
require("./Schema/userDetails");
const Job = require("./Schema/job");

const app = express();

app.use(cors());
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

app.listen(5000, () => {
  console.log("Server is running on port 5000");
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

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user with the provided email in the database
    const user = await std.findOne({ email });

    if (!user) {
      // If the user does not exist, send an error response
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the provided password matches the stored password
    if (user.password !== password) {
      // If the password does not match, send an error response
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If both email and password are correct, you can consider it a successful login
    res.status(200).json({ status: "ok", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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

