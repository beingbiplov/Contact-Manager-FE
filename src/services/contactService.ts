import { getAccessTokenFromCookie } from "../cookie/authCookie";
import { postRequest, getRequest } from "./serverCall";

export const addContact = async (data: any) => {
  const token = getAccessTokenFromCookie();
  const res = await postRequest("/contacts", data, token).catch((err) => {
    throw err;
  });

  return res;
};

export const getContacts = async () => {
  const token = getAccessTokenFromCookie();
  const res = await getRequest("/contacts", token).catch((err) => {
    throw err;
  });

  return res;
};

export const getContact = async (id: number) => {
  const token = getAccessTokenFromCookie();
  const res = await getRequest(`/contacts/${id}`, token).catch((err) => {
    throw err;
  });

  return res;
};
