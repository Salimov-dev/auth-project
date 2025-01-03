import {
  IAccessDecodedToken,
  ILogin,
  IRegister
} from "@interfaces/auth.interface";
import authService from "@services/auth.service";
import { handleHttpError } from "@utils/errors/handle-http.error";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

interface IUseAuthStore {
  isAuth: boolean;
  authUser: IAccessDecodedToken;
  isLoading: boolean;
  error: null | unknown;
  login: (loginData: ILogin) => void;
  register: (registerData: ILogin) => void;
}

const useAuthStore = create<IUseAuthStore>((set) => ({
  isAuth: false,
  authUser: null,
  isLoading: false,
  error: null,

  login: (loginData: ILogin) => {
    set({ isLoading: true, error: null });

    authService
      .login(loginData)
      .then((data) => {
        const accessToken: string = data.accessToken;

        if (!accessToken) {
          throw new Error("Токены не найдены");
        }

        set({ isAuth: true });

        localStorage.setItem("token", accessToken);

        const decodedToken: IAccessDecodedToken = jwtDecode(accessToken);

        delete decodedToken.exp;
        delete decodedToken.iat;

        set({ authUser: decodedToken });
      })
      .catch((error: unknown) => {
        handleHttpError(error, "Ошибка при попытке входа");
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },

  register: (registerData: IRegister) => {
    set({ isLoading: true, error: null });

    authService
      .register(registerData)
      .then((data) => {
        console.log("data register", data);
      })
      .catch((error: unknown) => {
        handleHttpError(error, "Ошибка при попытке регистрации");
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },

  logout: () => {
    set({ isLoading: true, error: null });
    authService
      .logout()
      .catch((error: unknown) => {
        handleHttpError(error, "Ошибка при попытке выхода");
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  }
}));

export default useAuthStore;
