import Cookies from "js-cookie";

import { getExpiryDateInMin } from "../utils/utils";

export const setCookieOnLogin = (loginResponseData: any) => {
  Cookies.set("isAuthenticated", "true");

  Cookies.set("accessToken", loginResponseData.data.accessToken, {
    expires: getExpiryDateInMin(5),
  });
  Cookies.set("refreshToken", loginResponseData.data.refreshToken);
  Cookies.set("userName", loginResponseData.data.userData.name);
  Cookies.set("userEmail", loginResponseData.data.userData.email);
  Cookies.set("userId", loginResponseData.data.userData.id);
};

export const checkUserAuthentication = (): boolean => {
  const isAuthenticated =
    Cookies.get("isAuthenticated") === "true" ? true : false;
  return isAuthenticated;
};

export const getAccessTokenFromCookie = (): string | undefined => {
  return Cookies.get("accessToken");
};

export const getRefreshTokenFromCookie = (): string | undefined => {
  return Cookies.get("refreshToken");
};

export const setAccessTokenCookie = (token: any) => {
  Cookies.set("isAuthenticated", "true");

  Cookies.set("accessToken", token, {
    expires: getExpiryDateInMin(5),
  });
};

export const removeUserAuthCookie = () => {
  Cookies.set("isAuthenticated", "false");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.set("userName", "");
  Cookies.set("userEmail", "");
  Cookies.set("userId", "");
};

export const getUserDataFromCookie = () => {
  let id;
  const userName = Cookies.get("userName");
  const userEmail = Cookies.get("userEmail");
  const userId = Cookies.get("userId");
  if (userId) {
    id = +userId;
  } else {
    id = 0;
  }

  return { name: userName, email: userEmail, id: id };
};

export const setUserNameToCookie = (data: any) => {
  Cookies.set("userName", data.name);
};
