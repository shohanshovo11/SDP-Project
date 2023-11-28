const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  birth: { type: Date },
  address: { type: String },
  institute: { type: String },
  occupation: { type: String },
  position: { type: String },
  experience: { type: Number },
  gender: { type: String },
  profileImgUrl: { type: String } // Add this field for base64 profile image
});

// Create a User model
const Employer = mongoose.model('employers', employerSchema);

module.exports = Employer;
