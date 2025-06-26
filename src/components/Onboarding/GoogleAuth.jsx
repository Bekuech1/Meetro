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
    onSuccess: async (tokenResponse) => {
      console.log("Google tokenResponse:", tokenResponse);

      const accessToken = tokenResponse.access_token;

      if (!accessToken) {
        console.error("No access token received.");
        return;
      }

      try {
        // fetch user info from Google
        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        ).then((res) => res.json());

        console.log("Google user info:", userInfo);

        // send this info or accessToken to your backend for verification & session creation
        const response = await API.post("/google-signin", { accessToken });

        setIdToken(response.data.idToken);
        setUser(response.data.user);
        navigate("/home");
      } catch (error) {
        console.error("Google login failed:", error);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
    flow: "implicit",
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
