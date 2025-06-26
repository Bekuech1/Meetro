import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      idToken: null,
      user: null,

      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setIdToken: (idToken) => set({ idToken }),
      setUser: (user) => set({ user }),

      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          idToken: null,
          user: null,
        });
      },
    }),
    {
      name: "auth-storage", // LocalStorage key
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        idToken: state.idToken,
        user: state.user,
      }),
    }
  )
);
