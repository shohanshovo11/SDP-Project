// internshipModel.js

const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  email: String,
  title: String,
  position: String,
  skillset: [String],
  startingTime: Number,
  workingHour: Number,
  salary: Number,
  description: String,
  assigned: String, // You can use ObjectId if you're referencing another document
});

const Internship = mongoose.model('Internship', internshipSchema);

module.exports = Internship;
