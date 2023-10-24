const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    employerEmail: String,
    title: String,
    description: String,
    area: String,
    time: String,
    tags: []
  },
  {
    collection: 'Jobs',
  }
);

mongoose.model('Job', jobSchema); 

module.exports = mongoose.model('Job'); 
