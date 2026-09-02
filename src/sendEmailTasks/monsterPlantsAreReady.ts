import "dotenv/config";
import * as core from "@actions/core";

import { HabboPublicAPI, Hotel } from "wired-api-wrapper-node";

import { mailOptions, transporter } from "../utils/mailTransporter";

const TARGET_VARIABLE_NAME = "2nd_room_breed_qtd";

const sendEmailWhenMonsterPlantsAreReady = async () => {
  try {
    const roomId = 153844031;
    const wiredReadKey = process.env.WIRED_READ_KEY ?? "";
    const wiredWriteKey = process.env.WIRED_WRITE_KEY ?? "";
    const hotel = Hotel.BR;

    if (!Number.isInteger(roomId) || roomId <= 0) {
      throw new Error("ROOM_ID must be a valid positive number");
    }

    if (!wiredReadKey || !wiredWriteKey) {
      throw new Error("WIRED_READ_KEY and WIRED_WRITE_KEY are required");
    }

    const api = HabboPublicAPI.fromHotel(hotel);
    const variable = await api
      .variables(roomId, wiredReadKey, wiredWriteKey)
      .global()
      .getVariable(TARGET_VARIABLE_NAME);

    if (variable.value > 0n) {
      const grownMonsterPlants = variable.value.toString();
      const text = `${grownMonsterPlants} Monster Plant${variable.value === 1n ? " is" : "s are"} grown in room ${roomId}.`;
      const subject = "Monster Plants are ready";

      await transporter.sendMail(mailOptions(text, subject));
      return;
    }

    core.warning(
      `${TARGET_VARIABLE_NAME} is ${variable.value.toString()} for room ${roomId}`,
    );
  } catch (error) {
    core.setFailed(
      `error on sendEmailWhenMonsterPlantsAreReady fn${"\n"}${error}`,
    );
  }
};

await sendEmailWhenMonsterPlantsAreReady();
