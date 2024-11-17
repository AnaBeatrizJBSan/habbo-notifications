import nodemailer from "nodemailer"
import "dotenv/config"
import Mail from "nodemailer/lib/mailer"


const sendEmailWhenUserGetsOnline = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const mailOptions: Mail.Options = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "User got online!",
    text: "User got online!"
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}

sendEmailWhenUserGetsOnline()