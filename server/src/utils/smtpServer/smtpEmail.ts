import nodemailer from "nodemailer";
import envConfig from "../../config/env.config";

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: any
) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 456,
    secure: true,
    auth: {
      user: envConfig.smtpUsername,
      pass: envConfig.smtpPassword,
    },
  });

  let methodOptions: string | undefined | {} = {
    from: {
      name: "INTERN MANAGEMENT SYSTEM",
      address: envConfig.smtpUsername,
    },
    to,
    subject,
    text,
    html,
  };

  return transporter
    .sendMail(methodOptions)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
