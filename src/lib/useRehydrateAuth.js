import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/stores/useAuthStore";
import API from "./axios";

export function useRehydrateAuth() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const idToken = localStorage.getItem("idToken");

    if (!idToken) return;

    try {
      const user = jwtDecode(idToken);
      setUser(user);
    } catch (err) {
      console.warn("Could not decode idToken. Falling back to /profile");

      API.get("/profile")
        .then((res) => setUser(res.data))
        .catch((error) => {
          console.error("Failed to load user profile:", error);
        });
    }
  }, []);
}
