import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import config from "@config/config.json";
import useTokenStore from "@store/token.store";

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
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { refreshTokens } = useTokenStore.getState();
      return refreshTokens(error);
    }
    return Promise.reject(error);
  }
);

httpService
  .get("/user/find-by-username/Ruslan01")
  .then((response) => {
    console.log("Response.data:", response.data);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
