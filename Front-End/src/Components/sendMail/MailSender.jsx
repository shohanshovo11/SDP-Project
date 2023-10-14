import React from "react";
import emailjs from "@emailjs/browser";

export function MailSender(to_mail, msg) {
  const emailBody = {
    User: to_mail,
    message: msg,
  };

  const sendMail = () => {
    emailjs
      .send(
        "service_2pdr0om",
        "template_m1whhto",
        emailBody,
        "zwbuJ3w6FBChj_W62"
      )
      .then(
        (res) => {
          console.log(res.text);
        },
        (er) => {
          console.log(er);
        }
      );
  };

  sendMail()
}
