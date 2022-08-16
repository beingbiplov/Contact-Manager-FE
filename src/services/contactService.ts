import { getAccessTokenFromCookie } from "../cookie/authCookie";
import {
  postRequest,
  getRequest,
  deleteRequest,
  putRequest,
} from "./serverCall";

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

export const removeContact = async (id: number) => {
  const token = getAccessTokenFromCookie();
  const res = await deleteRequest(`/contacts/${id}`, token).catch((err) => {
    throw err;
  });

  return res;
};

export const updateContact = async (id: number, data: any) => {
  const token = getAccessTokenFromCookie();
  const res = await putRequest(`/contacts/${id}`, data, token).catch((err) => {
    console.log(err.response.data.message);

    throw err;
  });

  return res;
};
