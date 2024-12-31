import { httpService } from "@services/http.service";
import { handleHttpError } from "@utils/errors/handle-http.error";
import { AxiosError } from "axios";
import { create } from "zustand";

interface IUseTokenStore {
  isLoading: boolean;
  error: null | unknown;
  refreshTokens: (error: AxiosError) => void;
}

const useTokenStore = create<IUseTokenStore>((set) => ({
  isLoading: false,
  error: null,

  refreshTokens: (error: AxiosError) => {
    set({ isLoading: true, error: null });

    httpService
      .get("token/refresh-tokens")
      .then(({ data }) => {
        const accessToken: string = data.accessToken;
        if (!accessToken) {
          throw new Error("Токены не найдены");
        }
        localStorage.setItem("token", accessToken);
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return httpService.request(error.config);
      })
      .catch((error: unknown) => {
        handleHttpError(error, "Ошибка при попытке входа");
        localStorage.removeItem("token");
        set({ error });
        // какая-либо логика
      })
      .finally(() => {
        set({ isLoading: false });
      });
  }
}));

export default useTokenStore;
