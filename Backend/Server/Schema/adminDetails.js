const mongoose = require('mongoose');

const adminDetailsSchema = new mongoose.Schema(
  {
    name: {    fname: String,
      lname: String,
    },
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
    collection: 'AdminDetails',
  }
);
  

const AdminModel = mongoose.model('AdminDetails', adminDetailsSchema);
module.exports= AdminModel