import { getUserIdByName } from "../services/users";
import { userNames } from "./userNames";
import fs from "fs";

const getUsersIds = async (username: string) => {
  const uniqueId = await getUserIdByName(username);
  const fileContent = `'${uniqueId}',\n`;

  if (uniqueId) {
    fs.appendFile("src/tasks/userIds.ts", fileContent, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`uniqueId from ${username} registered successfully`);
      }
    });
  } else {
    console.log("no uniqueId");
  }
};

userNames.forEach((username, index) => {
  setTimeout(async () => {
    await getUsersIds(username);
  }, index * 10000);
});
