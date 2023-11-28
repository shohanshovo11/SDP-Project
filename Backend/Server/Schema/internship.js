// internshipModel.js

const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema(
  {
  email: String,
  title: String,
  position: String,
  skillset: [String],
  startingTime: String,
  workingHour: String,
  salary: Number,
  description: String,
  assigned: String, // You can use ObjectId if you're referencing another document
  },
  {
    collection: 'internships',
  }
);

module.exports = mongoose.model('Internship', internshipSchema);