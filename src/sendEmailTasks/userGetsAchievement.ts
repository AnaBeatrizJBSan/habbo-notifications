import "dotenv/config";
import * as core from "@actions/core";

import { getDetailedUserProfile } from "../services/users";
import { mailOptions, transporter } from "../utils/mailTransporter";

const ACHIEVEMENT_CODE = "ACH_TradingPass2";

const sendEmailWhenUserGetsAchievement = async () => {
  const userID = process.env.USER_ID ?? "";
  const userDetailedProfile = await getDetailedUserProfile(userID);

  if (userDetailedProfile) {
    const userHasTradingPassAchievement = userDetailedProfile.badges.find(
      ({ code }) => code === ACHIEVEMENT_CODE,
    );

    if (userHasTradingPassAchievement) {
      const text = `User ${userDetailedProfile.user.name} got ${userHasTradingPassAchievement.name} achievement!`;
      const subject = "User(s) got achievement!";

      await transporter.sendMail(mailOptions(text, subject));
    } else {
      core.info(
        `user ${userDetailedProfile.user.name} did not got ${ACHIEVEMENT_CODE} achievement yet`,
      );
    }
  }
};

await sendEmailWhenUserGetsAchievement();
