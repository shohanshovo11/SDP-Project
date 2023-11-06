// partTimeJobModel.js

const mongoose = require('mongoose');

const partTimeJobSchema = new mongoose.Schema({
  id: String,
  title: String,
  position: String,
  skillset: [String],
  startingTime: Number,
  workingHour: Number,
  salary: Number,
  description: String,
  assigned: String, // You can use ObjectId if you're referencing another document
});

const PartTimeJob = mongoose.model('PartTimeJob', partTimeJobSchema);

module.exports = PartTimeJob;
