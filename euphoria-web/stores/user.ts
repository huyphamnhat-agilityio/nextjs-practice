import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User } from "@/interfaces/user";

export type UserStore = {
  user: Omit<User, "password"> | undefined;
  isFirstTimeLogin: boolean;
  setUser: (user: Omit<User, "password">) => void;
};

export const useUserStore = create(
  persist(
    immer<UserStore>((set) => ({
      user: undefined,
      accessToken: undefined,
      currentAddress: undefined,
      isFirstTimeLogin: true,
      setUser: (user: Omit<User, "password">) =>
        set((state) => {
          state.user = user;
        }),
      setAccessToken: (token: string) =>
        set((state) => {
          state.accessToken = token;
          state.isFirstTimeLogin = false;
        }),

      setUserAvatar: (avatar: string) =>
        set((state) => {
          if (state.user) {
            state.user.avatar = avatar;
          }
        }),
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
