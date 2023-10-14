const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  email: String,
  sscResult: String,
  hscResult: String,
  institutionName: String,
  deptName: String,
  bio: String,
  sscCertificate: String,
  hscCertificate: String,
});

const Education = mongoose.model("Education", educationSchema);

module.exports = Education;
