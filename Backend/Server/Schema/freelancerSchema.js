// jobModel.js

const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema({
  email: String,
  title: String,
  task: String,
  skillset: [String],
  workingHour: Number,
  deadline: Date,
  rate: Number,
  description: String,
  assigned: String, // You can use ObjectId if you're referencing another document
});

const Freelancer = mongoose.model('Freelancer', freelancerSchema);

module.exports = Freelancer;
