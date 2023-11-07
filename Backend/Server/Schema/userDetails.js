const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    gender: String,
    age: Number,
    birthDate: Date,
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
