import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/stores/useAuthStore";

export function isTokenExpired(token) {
  const logout = useAuthStore.getState().logout;
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true; // If no exp, treat as expired
    return Date.now() >= exp * 1000; // Convert exp to milliseconds
  } catch {
    logout();
    return true; // If decoding fails, treat as expired
  }
}

// export function decodeToken(token) {
//   try {
//     return jwtDecode(token);
//   } catch (error) {
//     console.error("Failed to decode token:", error);
//     return null;
//   }
// }