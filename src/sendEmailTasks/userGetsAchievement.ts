import "dotenv/config";
import { getDetailedUserProfile } from "../services/users";
import { mailOptions, transporter } from "../utils/mailTransporter";

const sendEmailWhenUserGetsAchievement = async () => {
  const ACHIEVEMENT_CODE = "ACH_TradingPass2";

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
    }
  }
};

await sendEmailWhenUserGetsAchievement();
