const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema(
  {
    name: {
      fname: String,
      lname: String,
    },
    institution: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
  },
  {
    collection: 'StudentDetails',
  }
);

mongoose.model('StudentDetails', userDetailsSchema);
