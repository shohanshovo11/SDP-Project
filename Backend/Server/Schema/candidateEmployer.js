// candidateEmployerModel.js

const mongoose = require('mongoose');

const candidateEmployerSchema = new mongoose.Schema({
  employerEmail: String,
  jobId: String,
  candidateList: [String],
});

const CandidateEmployer = mongoose.model('CandidateEmployer', candidateEmployerSchema);

module.exports = CandidateEmployer;
