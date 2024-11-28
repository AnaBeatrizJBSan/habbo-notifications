import axios from "axios";
import * as core from "@actions/core";

import { BASE_URL } from "../consts";
import { User, UserDetailed } from "./types";

const getUserOnlineStatusByName = async (username: string) => {
  try {
    const response = await axios.get<User>(`${BASE_URL}users?name=${username}`);
    return response.data.online;
  } catch (error) {
    core.setFailed(`error on getUserOnlineStatusByName fn:${"\n"}${error}`);
  }
};

const getDetailedUserProfile = async (userID: string) => {
  try {
    const response = await axios.get<UserDetailed>(
      `${BASE_URL}users/${userID}/profile/`,
    );
    return response.data;
  } catch (error) {
    core.setFailed(`error on getDetailedUserProfile fn:${"\n"}${error}`);
  }
};

export { getUserOnlineStatusByName, getDetailedUserProfile };
