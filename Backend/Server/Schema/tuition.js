const mongoose = require('mongoose');

const tuition = new mongoose.Schema(
  {
    email: String,
    title: String,
    description: String,
    area: String,
    time: String,
    salary: Number,
    version: String,
    studentclass: Number,
    active: { type: Boolean, default: false },
    tags: [],
  },
  {
    collection: 'tuitions',
  }
);

mongoose.model('tuition', tuition); 

module.exports = mongoose.model('tuition'); 
