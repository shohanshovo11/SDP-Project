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
    gender: String,
    age: Number,
    birthdate: Date,
    address: String,
    phone: String,
    profileImgUrl: String
  },
  {
    collection: 'StudentDetails',
  }
);

const UserModel = mongoose.model('StudentDetails', userDetailsSchema);
module.exports= UserModel
