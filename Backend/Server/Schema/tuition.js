const mongoose = require('mongoose');

const tuition = new mongoose.Schema(
  {
    email: String,
    title: String,
    description: String,
    area: String,
    time: String,
    salary: String,
    version: String,
    studentClass: String,
    tags: [],
  },
  {
    collection: 'tuitions',
  }
);

mongoose.model('tuition', tuition); 

module.exports = mongoose.model('tuition'); 
