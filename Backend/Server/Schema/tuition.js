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
    tags: [],
    assigned: String
  },
  {
    collection: 'tuitions',
  }
);

mongoose.model('tuition', tuition); 

module.exports = mongoose.model('tuition'); 
