import { randomProfileImage } from "@/lib/utils";
import { authApi } from "@/services/authApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

export function useRehydrateUser() {
  const refreshInterval = 15 * 60 * 1000; // 15 minutes
  const { accessToken, setUser, lastFetchedProfile, setLastFetchedProfile } =
    useAuthStore();

  useEffect(() => {
    const handleFocus = async () => {
      // If access token exists and profile was never fetched or is stale (older than 15 minutes)
      if (
        accessToken &&
        (!lastFetchedProfile ||
          Date.now() - lastFetchedProfile > refreshInterval)
      ) {
        try {
          const { user } = await authApi.getProfile();
          if (!user?.photo) user.photo = randomProfileImage();
          setUser(user);
          setLastFetchedProfile(Date.now());
        } catch {}
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [accessToken, setUser, lastFetchedProfile, setLastFetchedProfile]);
}
