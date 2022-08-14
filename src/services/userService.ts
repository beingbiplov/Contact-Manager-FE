import { postRequest } from "./serverCall";

export const registerUser = async (data: any) => {
  const res = await postRequest("/users", data).catch((err) => {
    throw err;
  });

  return res;
};

export const loginUser = async (data: any) => {
  const res = await postRequest("/users/auth/login", data).catch((err) => {
    throw err;
  });

  return res;
};
