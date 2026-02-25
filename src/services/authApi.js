import API from "@/lib/axios";

export const authApi = {
  login: async credentials => {
    const loginResponse = await API.post("/auth/login", credentials);
    const { accessToken } = loginResponse.data;
    return { accessToken };
  },

  signup: async details => {
    const signupResponse = await API.post("/auth/signup", details);
    return {
      status: signupResponse.data.status,
      accessToken: signupResponse.data.accessToken,
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
    const { accessToken } = refreshResponse.data;
    return { accessToken };
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
    const { accessToken } = response.data;
    return { accessToken };
  },
};
