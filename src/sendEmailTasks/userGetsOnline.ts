import "dotenv/config";
import * as core from "@actions/core";

import { getUserOnlineStatusByName } from "../services/users";
import { mailOptions, transporter } from "../utils/mailTransporter";

const sendEmailWhenUserGetsOnline = () => {
  let onlineUsers: Array<string> = [];
  let users = process.env.USERS ? process.env.USERS.split(", ") : [];

  users.forEach(async (user) => {
    try {
      const isUserOnline = await getUserOnlineStatusByName(user);

      if (isUserOnline) {
        const newOnlineUsers = onlineUsers.concat([user]);
        const text = `Those users got online: ${newOnlineUsers.toString()}`;
        const subject = "User(s) got online!";

        await transporter.sendMail(mailOptions(text, subject));
      } else {
        core.warning(`${user} is not online yet`);
      }
    } catch (error) {
      core.setFailed(`error on sendEmailWhenUserGetsOnline fn${"\n"}${error}`);
    }
  });
};

sendEmailWhenUserGetsOnline();
