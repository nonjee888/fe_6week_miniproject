import axios from "axios";
import { getCookie } from "./cookie";

export const instance = axios.create({
  baseURL: "http://52.79.247.187:8080",
});

instance.interceptors.request.use((config) => {
  const token = getCookie("ACCESS_TOKEN");
  const refreshToken = getCookie("REFRESH_TOKEN");

  config.headers.Authorization = token;
  config.headers.refreshToken = refreshToken;

  return config;
});
