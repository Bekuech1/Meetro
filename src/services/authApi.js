import API from "@/lib/axios";

export const authApi = {
  login: async credentials => {
    const loginResponse = await API.post("/auth/login", credentials);
    const { accessToken, refreshToken } = loginResponse.data;
    return { accessToken, refreshToken };
  },

  signup: async details => {
    const signupResponse = await API.post("/auth/signup", details);
    const { accessToken, refreshToken } = signupResponse.data;
    return {
      status: signupResponse.data.status,
      accessToken,
      refreshToken,
    };
  },

  logout: async () => {
    await API.post("/auth/logout");
  },

  getProfile: async () => {
    const profileResponse = await API.get("/auth/get-profile");
    return {
      user: profileResponse.data.data.user,
      userEventsCount: profileResponse.data.data.userEventsCount,
    };
  },

  refreshToken: async () => {
    const refreshResponse = await API.post("/auth/refresh-token");
    const { accessToken, refreshToken } = refreshResponse.data;
    return { accessToken, refreshToken };
  },

  forgotPassword: async email => {
    const forgotResponse = await API.post("/auth/forgot-password", { email });
    return forgotResponse.data;
  },

  verifyEmail: async ({ email, otp }) => {
    const verifyResponse = await API.post("/auth/verify-account", {
      email,
      otp,
    });
    return verifyResponse.data;
  },

  resendOtp: async email => {
    await API.post("/auth/resend-otp", { email });
  },

  resetPassword: async ({ token, newPassword, email }) => {
    const resetResponse = await API.patch(
      `/auth/reset-password?token=${token}&email=${email}`,
      {
        newPassword,
      }
    );
    return resetResponse.data;
  },

  googleAuth: async googleToken => {
    const response = await API.post("/auth/google-auth", {
      token: googleToken,
    });
    const { accessToken, refreshToken } = response.data;
    return { accessToken, refreshToken };
  },

  updateProfile: async data => {
    const response = await API.patch("/auth/update-profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  },
};
