// import { useNavigate } from "react-router";
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
        localStorage.removeItem("auth-storage"); // Clear localStorage
        // localStorage.clear(); // Clear all localStorage
        // window.location.href = "/login"; // Redirect to login
        // navigate("/login"); // Redirect to login
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
