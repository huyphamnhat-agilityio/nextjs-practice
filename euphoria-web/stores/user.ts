import { User } from "@/interfaces";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type UserStore = {
  user: Omit<User, "password"> | undefined;
  setUser: (user: Omit<User, "password">) => void;
};

export const useUserStore = create(
  persist(
    immer<UserStore>((set) => ({
      user: undefined,
      setUser: (user: Omit<User, "password">) =>
        set((state) => {
          state.user = user;
        }),
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
