import axios from "axios";

const server = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
});

export const postRequest = async (
  url: string,
  data: any,
  token: string = ""
) => {
  const res = await server.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
