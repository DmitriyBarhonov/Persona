import { create } from "zustand";
import { getErrorMessage } from "@/src/shared/api";
import {
  createUser,
  login,
  type CreateUserPayload,
  type LoginPayload,
} from "../api/userApi";

type User = {
  id: number;
  email: string;
};

type UserState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (payload: LoginPayload) => Promise<void>;
  register: (payload: CreateUserPayload) => Promise<void>;
  clearUser: () => void;
  clearError: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  signIn: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const user = await login(payload);
      set({ user, isLoading: false });
    } catch (err) {
      set({ isLoading: false, error: getErrorMessage(err) });
    }
  },

  register: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      await createUser(payload);
      set({ isLoading: false });
    } catch (err) {
      set({ isLoading: false, error: getErrorMessage(err) });
    }
  },

  clearUser: () => set({ user: null }),
  clearError: () => set({ error: null }),
}));
