import axios from "axios"
import { BASE_URL } from "../consts"
import { User } from "./types"

const getUserOnlineStatusByName = async (username: string) => {
  try {
    const response = await axios.get<User>(`${BASE_URL}users?name=${username}`)
    return response.data.online
  } catch(error){
    console.log({error})
  }
  
}

export { getUserOnlineStatusByName }