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

const TuitionModel = mongoose.model('tuition', tuition); 

module.exports = TuitionModel; 

/*
const jobID = CandidateEmployerModel.find({employerEmail : email}, {jobId : 1, _id: 0});
    console.log(jobID.jobId);
    const jobs = [];

    /*jobID.map(function(item) {        
      jobs.push(TuitionModel.findById(item.jobId));
    });*/
    //await TuitionModel.findById(jobID.jobId);
    //console.log(JSON.stringify(jobID.length));
    
