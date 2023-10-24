const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        
        email : String,
        otp : Number,
        start : Date
    },
    {
        collection: 'otp'
    }
)

const OTPModel = mongoose.model('otp', otpSchema);

module.exports = OTPModel