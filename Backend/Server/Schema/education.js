const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  email: String,
  sscResult: String,
  hscResult: String,
  currentInstitution: String,
  deptName: String,
  bio: String,
  sscCertificate: String,
  hscCertificate: String,
  school: String,
  college: String,
  cvResume: String,
});

const Education = mongoose.model("Education", educationSchema);

module.exports = Education;
