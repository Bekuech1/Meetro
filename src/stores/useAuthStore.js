import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    set => ({
      accessToken: null,
      user: null,
      lastFetchedProfile: null,
      setAccessToken: accessToken => set({ accessToken }),
      setUser: user => set({ user }),
      setLastFetchedProfile: lastFetchedProfile => set({ lastFetchedProfile }),
    }),
    {
      name: "auth-storage", // LocalStorage key
      partialize: state => ({
        accessToken: state.accessToken,
        user: state.user,
        lastFetchedProfile: state.lastFetchedProfile,
      }),
    }
  )
);
