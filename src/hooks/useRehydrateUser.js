import { randomProfileImage } from "@/lib/utils";
import { authApi } from "@/services/authApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

export function useRehydrateUser() {
  const refreshInterval = 15 * 60 * 1000; // 15 minutes
  const {
    accessToken,
    setUser,
    setUserEventsCount,
    lastFetchedProfile,
    setLastFetchedProfile,
  } = useAuthStore();

  useEffect(() => {
    const handleFocus = async () => {
      // If access token exists and profile was never fetched or is stale (older than 15 minutes)
      if (
        accessToken &&
        (!lastFetchedProfile ||
          Date.now() - lastFetchedProfile > refreshInterval)
      ) {
        try {
          const { user, userEventsCount } = await authApi.getProfile();
          if (!user?.photo) user.photo = randomProfileImage();
          setUser(user);

          setUserEventsCount(userEventsCount);
          setLastFetchedProfile(Date.now());
        } catch {}
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [
    accessToken,
    setUser,
    lastFetchedProfile,
    setLastFetchedProfile,
    setUserEventsCount,
  ]);
}
