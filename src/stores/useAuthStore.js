import { create } from "zustand";

const isBrowser = typeof window !== "undefined";

export const useAuthStore = create((set) => ({
  accessToken: isBrowser ? localStorage.getItem("accessToken") : null,
  refreshToken: isBrowser ? localStorage.getItem("refreshToken") : null,
  idToken: isBrowser ? localStorage.getItem("idToken") : null,
  user: null,

  setAccessToken: (accessToken) => {
    if (isBrowser) localStorage.setItem("accessToken", accessToken);
    set({ accessToken });
  },

  setRefreshToken: (refreshToken) => {
    if (isBrowser) localStorage.setItem("refreshToken", refreshToken);
    set({ refreshToken });
  },

  setIdToken: (idToken) => {
    if (isBrowser) localStorage.setItem("idToken", idToken);
    set({ idToken });
  },

  setUser: (user) => set({ user }),

  logout: () => {
    if (isBrowser) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("idToken");
    }
    set({ user: null, accessToken: null, refreshToken: null, idToken: null });
  },
}));
