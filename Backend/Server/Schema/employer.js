const mongoose = require('mongoose');

// Define the schema for the data
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  birth: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  institute: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  }
});

// Create a model using the schema
const Employer = mongoose.model('Employer', userSchema);
module.exports = Employer;
