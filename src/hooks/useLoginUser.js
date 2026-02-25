import { randomProfileImage } from "@/lib/utils";
import { authApi } from "@/services/authApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";

export function useLoginUser({ onSuccess, onError }) {
  const { setUser, setAccessToken, setUserEventsCount, setLastFetchedProfile } =
    useAuthStore();

  const { mutate: loginMutate, isPending: loading } = useMutation({
    mutationFn: async loginData => {
      // Make login request
      const loginResponse = await authApi.login(loginData);
      // Store access token
      setAccessToken(loginResponse.accessToken);
      // Fetch user profile
      const getProfileResponse = await authApi.getProfile();
      // Set user in store
      const user = getProfileResponse.user;
      // Set random default photo
      if (!user?.photo) user.photo = randomProfileImage();
      setUser(user);
      // Set last fetched profile time
      setLastFetchedProfile(Date.now());
      // Set user events count in store
      setUserEventsCount(getProfileResponse.userEventsCount);
    },
    onSuccess: onSuccess || (() => {}),
    onError: onError || (() => {}),
  });

  return { loginMutate, loading };
}
