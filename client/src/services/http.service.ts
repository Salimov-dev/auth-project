import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import config from "@config/config.json";

export const httpService = axios.create({
  baseURL: config.baseURL,
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

httpService.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("error.response", error);
      const cookies = document.cookie;
      console.log("cookies", cookies);
    }

    return Promise.reject(error);
  }
);

httpService
  .get("/user/find-by-username/Ruslan01")
  .then((response) => {
    console.log("Response:", response);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
