import { create } from "zustand";
import { IUser } from "@interfaces/user.interface";
import userService from "@services/user.service";
import { handleHttpError } from "@utils/errors/handle-http.error";

interface IUseUserStore {
  users: IUser[];
  selectedUser: IUser | null;
  isLoading: boolean;
  error: null | unknown;
  fetchUsers: () => void;
  fetchUserById: (id: string) => void;
  fetchUserByUsername: (username: string) => void;
  fetchUserByEmail: (email: string) => void;
  fetchUserByPhone: (phone: string) => void;
  createUser: (user: Partial<IUser>) => void;
  updateUser: (id: string, user: Partial<IUser>) => void;
  deleteUser: (id: string) => void;
}

const useUserStore = create<IUseUserStore>((set) => ({
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const users = await userService.findAll();
      set({ users });
    } catch (error: unknown) {
      handleHttpError(error, "Ошибка при загрузке списка пользователей");
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await userService.findById(id);
      set({ selectedUser: user });
    } catch (error: unknown) {
      handleHttpError(error, "Ошибка при загрузке пользователя");
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserByUsername: async (username: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await userService.findByUsername(username);
      set({ selectedUser: user });
    } catch (error: unknown) {
      handleHttpError(error, "Ошибка при поиске пользователя по имени");
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserByEmail: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await userService.findByEmail(email);
      set({ selectedUser: user });
    } catch (error: unknown) {
      handleHttpError(error, "Ошибка при поиске пользователя по email");
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserByPhone: async (phone: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await userService.findByPhone(phone);
      set({ selectedUser: user });
    } catch (error: unknown) {
      handleHttpError(error, "Ошибка при поиске пользователя по телефону");
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  createUser: async (user: Partial<IUser>) => {
    set({ isLoading: true, error: null });
    try {
      const newUser = await userService.create(user);
      set((state) => ({ users: [...state.users, newUser] }));
    } catch (error: unknown) {
      handleHttpError(error, "Ошибка при создании пользователя");
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser: async (id: string, user: Partial<IUser>) => {
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await userService.update(id, user);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updatedUser : u)),
        selectedUser: updatedUser
      }));
    } catch (error: unknown) {
      handleHttpError(error, "Ошибка при обновлении пользователя");
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteUser: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await userService.remove(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        selectedUser: null
      }));
    } catch (error: unknown) {
      handleHttpError(error, "Ошибка при удалении пользователя");
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useUserStore;
