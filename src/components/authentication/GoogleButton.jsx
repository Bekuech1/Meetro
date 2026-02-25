import { authApi } from "@/services/authApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { useModalContext } from "../layout-components/Modal/ModalContext";
import { randomProfileImage } from "@/lib/utils";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import Alert from "../layout-components/Alert";

export default function GoogleButton({ onSuccess, setError, error }) {
  const { setAccessToken, setUser, setUserEventsCount, setLastFetchedProfile } =
    useAuthStore();
  const { close } = useModalContext();

  const { mutate: googleLoginMutation, isPending: loading } = useMutation({
    mutationFn: async googleToken => {
      const response = await authApi.googleAuth(googleToken);
      // Set access token
      setAccessToken(response.accessToken);
      // Fetch user profile
      const getProfileResponse = await authApi.getProfile();
      // Set random default photo
      const user = getProfileResponse.user;
      if (!user?.photo) user.photo = randomProfileImage();
      // Set user in store
      setUser(user);
      // Set last fetched profile time
      setLastFetchedProfile(Date.now());
      // Set user events count
      setUserEventsCount(getProfileResponse.userEventsCount);
    },
    onSuccess: () => {
      // Close modal
      close();
      // Proceed after a short delay
      setTimeout(() => onSuccess?.(), 300);
    },
    onError: error => {
      setError({
        type: "google",
        message:
          error.response?.data?.message ||
          "Google login failed. Please try again.",
      });
    },
  });

  // Initialize Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: tokenResponse => {
      // Call mutation with Google token
      googleLoginMutation(tokenResponse.access_token);
    },
    onError: error => {
      // Set error message
      setError({
        type: "google",
        message:
          error.response?.data?.message ||
          "Google sign in failed. Please try again.",
      });
    },
  });

  return (
    <div className="flex flex-col gap-3">
      {/* * Error Alert */}
      {error && error?.type === "google" && (
        <Alert
          type="error"
          title={error.message}
          onClick={() => setError(null)}
        />
      )}
      <button
        type="button"
        disabled={loading}
        aria-busy={loading}
        onClick={() => {
          // Clear previous error
          setError(null);
          // Call google login
          googleLogin();
        }}
        className={`flex items-center paytone transition-all font-medium capitalize gap-[6px] rounded-full border w-fit min-w-[208px] bg-white border-[#E5E7E3] h-9 px-4 py-3 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#E5E7E3]"}`}
      >
        {/* Spinner */}
        {loading && (
          <span
            className="h-4 w-4 mr-[6px] animate-spin rounded-full border-2 border-gray-300 border-t-gray-700"
            aria-hidden="true"
          />
        )}

        <span className="text-sm font-medium">
          {loading ? "Signing in…" : "Continue with Google"}
        </span>
        {/* Google icon */}
        <span className="ml-auto">
          <GoogleIcon size={20} />
        </span>
      </button>
    </div>
  );
}
