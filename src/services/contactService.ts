import { getAccessTokenFromCookie } from "../cookie/authCookie";
import { postRequest } from "./serverCall";

export const addContact = async (data: any) => {
  const token = getAccessTokenFromCookie();
  const res = await postRequest("/contacts", data, token).catch((err) => {
    throw err;
  });

  return res;
};
