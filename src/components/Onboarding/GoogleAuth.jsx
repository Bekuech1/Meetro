import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import API from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

const GoogleAuth = () => {
  const setIdToken = useAuthStore((state) => state.setIdToken);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const response = await API.post("/google-signin", {
          idToken: credentialResponse.credential,
        });

        setIdToken(response.data.idToken);
        setUser(response.data.user);
        navigate("/home");
      } catch (error) {
        console.error("Google login failed:", error);
      }
    },
    flow: "auth-code",
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,

    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });
  return (
    <div>
      <button
        onClick={() => login()}
        className="paytone text-sm rounded-[60px] flex justify-center gap-3 text-center items-center w-[343px] sm:w-[312px] h-[36px] bg-white text-[#095256] px-6">
        <span>Continue with Google</span>
        <FcGoogle />
      </button>
    </div>
  );
};

export default GoogleAuth;
