import Cookies from "js-cookie";

import { getExpiryDateInMin } from "../utils/utils";

export const setCookieOnLogin = (loginResponseData: any) => {
  Cookies.set("isAuthenticated", "true");

  Cookies.set("accessToken", loginResponseData.data.accessToken, {
    expires: getExpiryDateInMin(15),
  });
  Cookies.set("refreshToken", loginResponseData.data.refreshToken, {
    expires: getExpiryDateInMin(60),
  });
};
