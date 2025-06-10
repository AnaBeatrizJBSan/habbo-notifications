import "dotenv/config";
import * as core from "@actions/core";

import { getUserOnlineStatusByName } from "../services/users";
import { mailOptions, transporter } from "../utils/mailTransporter";

const sendEmailWhenUserGetsOffline = () => {
  let offlineUsers: Array<string> = [];
  let users = process.env.OFFLINE_USERS
    ? process.env.OFFLINE_USERS.split(", ")
    : [];

  users.forEach(async (user) => {
    try {
      const isUserOnline = await getUserOnlineStatusByName(user);

      if (!isUserOnline) {
        const newOfflineUsers = offlineUsers.concat([user]);
        const text = `Those users got offline: ${newOfflineUsers.toString()}`;
        const subject = "User(s) got offline!";

        await transporter.sendMail(mailOptions(text, subject));
      } else {
        core.warning(`${user} is not offline`);
      }
    } catch (error) {
      core.setFailed(`error on sendEmailWhenUserGetsOffline fn${"\n"}${error}`);
    }
  });
};

sendEmailWhenUserGetsOffline();
