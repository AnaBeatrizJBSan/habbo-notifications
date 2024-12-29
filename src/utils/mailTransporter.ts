import nodemailer from "nodemailer";
import "dotenv/config";
import Mail from "nodemailer/lib/mailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailOptions = (text: string, subject: string): Mail.Options => {
  return {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject,
    text,
  };
};

export { transporter, mailOptions };
