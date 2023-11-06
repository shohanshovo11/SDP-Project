const nodemailer = require("nodemailer");

const mailSender = () => {
    const transporter = nodemailer.createTransport({ 
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.COM_USER,
        pass: process.env.COM_PASS 
      },
      tls: {
        rejectUnauthorized: false 
      }
  });

  return transporter;
}

module.exports = {mailSender};


