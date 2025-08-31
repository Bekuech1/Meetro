import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import API from "./axios";
import { isTokenExpired } from "@/utils/authUtils";

export function useRehydrateAuth() {
  // const setUser = useAuthStore((state) => state.setUser);
  const { idToken, logout, setUser} = useAuthStore.getState();

  useEffect(() => {
    if (!idToken || isTokenExpired(idToken)) {
      logout();
      return;
    }
    
    // const user = decodeToken(idToken);
    // if (user) {
    //   setUser(user);
    // }
    
    else {
      console.warn("Could not decode idToken. Falling back to /profile");
      API.get("/profile")
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }    
  }, []);
}
