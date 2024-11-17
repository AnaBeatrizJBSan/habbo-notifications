import nodemailer from "nodemailer";
import "dotenv/config";
import Mail from "nodemailer/lib/mailer";
import { getUserOnlineStatusByName } from "./services/users";

const sendEmailWhenUserGetsOnline = () => {
  let onlineUsers: Array<string> = [];
  let users = ["-Miaw", "Welcomido", "Wurx", "Mezajya"];

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = (text: string): Mail.Options => {
    return {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "User(s) got online!",
      text,
    };
  };

  users.forEach(async (user) => {
    try {
      const isUserOnline = await getUserOnlineStatusByName(user);

      if (isUserOnline) {
        const newOnlineUsers = onlineUsers.concat(user);
        const text = `Those users got online: ${newOnlineUsers.toString()}`;
        await transporter.sendMail(mailOptions(text));
      } else {
        console.log(`${user} is not online :(`);
      }
    } catch (error) {
      console.log({ error });
    }
  });
};

sendEmailWhenUserGetsOnline();
