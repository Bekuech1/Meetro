import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    set => ({
      accessToken: null,
      user: null,
      userEventsCount: {
        hosted: 0,
        attended: 0,
      },
      lastFetchedProfile: null,
      setAccessToken: accessToken => set({ accessToken }),
      setUser: user => set({ user }),
      setUserEventsCount: userEventsCount => set({ userEventsCount }),
      setLastFetchedProfile: lastFetchedProfile => set({ lastFetchedProfile }),
    }),
    {
      name: "auth-storage", // LocalStorage key
      partialize: state => ({
        accessToken: state.accessToken,
        user: state.user,
        userEventsCount: state.userEventsCount,
        lastFetchedProfile: state.lastFetchedProfile,
      }),
    }
  )
);
