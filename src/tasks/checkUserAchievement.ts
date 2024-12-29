import fs from "fs";
import { getDetailedUserProfile } from "../services/users";
import { userIds } from "./userIds";

const checkUserAchievement = async (userID: string) => {
  const ACHIEVEMENT_CODE = "ACH_TradingPass2";
  const userDetailedProfile = await getDetailedUserProfile(userID);

  if (userDetailedProfile) {
    const userHasTradingPassAchievement = userDetailedProfile.badges.find(
      ({ code }) => code === ACHIEVEMENT_CODE,
    );

    if (!userHasTradingPassAchievement) {
      const fileContent = `{
        userName: '${userDetailedProfile.user.name}',\n
        uniqueId: '${userDetailedProfile.user.uniqueId}',\n
      },\n`;

      fs.appendFile(
        "src/tasks/usersWithoutAchievement.ts",
        fileContent,
        (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(
              `user ${userDetailedProfile.user.name} has not this achievement`,
            );
          }
        },
      );
    }
  }
};

userIds.forEach((userId, index) => {
  setTimeout(async () => {
    await checkUserAchievement(userId);
  }, index * 5000);
});
