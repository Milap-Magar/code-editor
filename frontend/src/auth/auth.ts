import axios from "./axios";
import { setAccessToken } from "../utils/authToken";

export const login = async (data: { email: string; password: string }) => {
  const response = await axios.post("/auth/login", data);
  setAccessToken(response.data.accessToken);
  return response;
};
