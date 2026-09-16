import { create } from "zustand";

type UserState = {
  id: number | null;
  email: string | null;
};

export const useUserStore = create<UserState>(() => ({
  id: null,
  email: null,
}));
