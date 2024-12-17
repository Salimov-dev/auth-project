import axios, { InternalAxiosRequestConfig } from "axios";

export const httpService = axios.create({
  baseURL: "http://localhost:5000/api/",
  params: {},
  withCredentials: true
});

httpService.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  }
);
