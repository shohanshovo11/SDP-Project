const mongoose = require('mongoose');

const tuition = new mongoose.Schema(
  {
    employerEmail: String,
    title: String,
    description: String,
    area: String,
    time: String,
    tags: []
  },
  {
    collection: 'tuitions',
  }
);

mongoose.model('tuition', tuition); 

module.exports = mongoose.model('tuition'); 
