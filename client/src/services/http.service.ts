import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
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
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const { refreshTokens } = useTokenStore();
      refreshTokens(error);
    }

    return Promise.reject(error);
  }
);
