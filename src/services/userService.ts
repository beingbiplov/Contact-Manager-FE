import { postRequest } from "./serverCall";
import jwt_decode from "jwt-decode";
import { message } from "antd";

import {
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  removeUserAuthCookie,
  setAccessTokenCookie,
} from "../cookie/authCookie";
import { tokenDecodeInterface } from "../interface/tokenInterface";

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

export const logoutUser = () => {
  removeUserAuthCookie();
  message.error("Session expired, please login again");
  window.location.reload();
};

export const getAccessTokenFromRefresh = async () => {
  const refreshToken = getRefreshTokenFromCookie();
  if (refreshToken) {
    await postRequest("/users/auth/token", {
      refresh_token: refreshToken,
    })
      .then((data) => {
        setAccessTokenCookie(data.data.data);
      })
      .catch((err) => {
        logoutUser();
      });
  } else {
    logoutUser();
  }
};

export const verifyToken = () => {
  const token = getAccessTokenFromCookie();

  if (token) {
    const data = jwt_decode(token) as tokenDecodeInterface;
    if (Math.floor(Date.now() / 1000) >= data.exp) {
      getAccessTokenFromRefresh();
    }
  } else {
    getAccessTokenFromRefresh();
  }
};
