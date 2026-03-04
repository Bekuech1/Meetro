import MeetroLogoAlt from "@/assets/icons/MeetroLogoAlt";
import IconButton from "@/components/layout-components/Buttons/IconButton";
import TextButton from "@/components/layout-components/Buttons/TextButtons";
import FormGroup from "@/components/layout-components/Inputs/FormGroup";
import PasswordField from "@/components/layout-components/Inputs/PasswordField";
import LoadingSpinner from "@/components/layout-components/LoadingSpinner";
import InputField from "@/components/layout-components/Inputs/InputField";
import InputIcon from "@/assets/icons/InputIcon";
import Alert from "@/components/layout-components/Alert";
import Footer from "@/components/event-dashboard/Footer";
import React, { useEffect, useState } from "react";
import { authApi } from "@/services/authApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { Lock1, Sms, User } from "iconsax-reactjs";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import { useLoginUser } from "@/hooks/useLoginUser";

function ResetPassword() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState(null);
  const [form, setForm] = useState("reset-password");
  const [searchParams, setSearchParams] = useSearchParams();

  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  // Get token and email from URL parameters
  useEffect(() => {
    // Get token and email from URL parameters
    const tokenParam = searchParams.get("token");
    const emailParam = searchParams.get("email");

    if (tokenParam && emailParam) {
      // Set token and email state
      setToken(tokenParam);
      setEmail(emailParam);
      // Remove token and email from URL for security
      setSearchParams({}, { replace: true });
    }
  }, [setSearchParams, navigate]);

  const { loginMutate, loading: loginLoading } = useLoginUser({
    onSuccess: () => {
      // Navigate to dashboard
      navigate("/home");
    },
    onError: err => {
      // Set error message
      setErrorMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
    },
  });

  const { mutate: resetPasswordMutate, isPending: resetLoading } = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: ({ status }) => {
      // Switch to login form on success
      if (status === "success") {
        // Clear token
        setToken(null);
        // Switch to login form
        setForm("login");
      }
    },
    onError: err => {
      // Set error message
      setErrorMessage(
        err.response?.data?.message ||
        "Failed to reset password. Please try again."
      );
    },
  });

  const handleResetPassword = async e => {
    // Prevent default form submission
    e.preventDefault();
    if (!email || !token) {
      setErrorMessage("Invalid password reset link.");
      return;
    }
    // Clear previous error
    setErrorMessage(null);
    // Get form data
    const formData = Object.fromEntries(new FormData(e.target).entries());
    // Call reset password mutation
    resetPasswordMutate({
      token,
      newPassword: formData.newPassword,
      email,
    });
  };

  const handleLogin = e => {
    // Prevent default form submission
    e.preventDefault();
    // Clear previous error
    setErrorMessage(null);
    // Get form data
    const formData = Object.fromEntries(new FormData(e.target).entries());
    // Call login mutation
    loginMutate({
      email: formData.email,
      password: formData.password,
    });
  };

  // If user is logged in, redirect to dashboard
  if (user) {
    return <Navigate replace to="/home" />;
  }
  return (
    <React.Fragment>
      <div className="flex flex-col min-h-dvh bg-[#F0F0F0]">
        <div className="sticky top-0 z-50 bg-[#F0F0F0]">
          <div className="max-w-[1440px] satoshi py-3 px-4 md:px-8 mx-auto w-full  gap-4 flex-wrap flex flex-col min-[380px]:flex-row items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <MeetroLogoAlt />
              <span className="bg-linear-to-r satoshi flex justify-center items-center from-[#BCFF5C] to-[#C0A8FF] text-[8px] font-[700] min-w-[26px] size-fit capitalize px-1 h-[14px] leading-[14px] rounded-2xl text-[#011F0F]">
                Beta
              </span>
            </div>
          </div>
        </div>
        <main className="flex-1 px-4 justify-center items-center flex flex-col">
          <div className="satoshi font-bold text-sm max-w-[394px] w-full mx-auto">
            {/* Reset Password Form */}
            {form === "reset-password" && (
              <form onSubmit={handleResetPassword}>
                <IconButton
                  className="pointer-events-none size-11! mb-6"
                  variant="tertiary"
                  icon={<Lock1 color="#077D8A" size={24} variant="Bold" />}
                />
                <h3 className="paytone text-[18px] mb-2 leading-[28px] font-normal">
                  Please enter a new password
                </h3>
                <p className="text-[#8A9191] mb-8">
                  Create a strong password using a mix of letters, numbers, and
                  special characters for better security.
                </p>
                <FormGroup label="Create a password">
                  <PasswordField name="newPassword" required />
                </FormGroup>
                {/* Alert message goes here */}
                {errorMessage && (
                  <div className="mt-8">
                    <Alert
                      type="error"
                      title={errorMessage}
                      onClick={() => setErrorMessage(null)}
                    />
                  </div>
                )}
                <TextButton
                  type="submit"
                  disabled={resetLoading}
                  text={
                    resetLoading ? <LoadingSpinner /> : "Continue to Sign In"
                  }
                  className="sm:min-w-[123px] mt-8 min-w-full"
                />
              </form>
            )}
            {/* Login Form */}
            {form === "login" && (
              <form onSubmit={handleLogin}>
                <IconButton
                  className="pointer-events-none size-11! mb-6"
                  variant="tertiary"
                  icon={<User color="#077D8A" size={24} variant="Bold" />}
                />
                <h3 className="paytone text-[18px] mb-2 leading-[28px] font-normal">
                  Login
                </h3>
                <p className="text-[#8A9191] mb-8">Sign into your account.</p>
                <div className="mb-8 flex flex-col gap-y-3">
                  <FormGroup label="Drop your email here">
                    <InputField
                      type="email"
                      placeholder="e.g. newman@gmail.com"
                      name="email"
                      defaultValue={email || ""}
                      required
                      leftIcon={
                        <InputIcon>
                          <Sms size={16} color="#001010" variant="Bold" />
                        </InputIcon>
                      }
                    />
                  </FormGroup>
                  <FormGroup label="Enter your password">
                    <PasswordField name="password" required />
                  </FormGroup>
                </div>
                {/* Alert message goes here */}
                {errorMessage && (
                  <div className="mb-8">
                    <Alert
                      type="error"
                      title={errorMessage}
                      onClick={() => setErrorMessage(null)}
                    />
                  </div>
                )}
                <TextButton
                  type="submit"
                  disabled={loginLoading}
                  text={loginLoading ? <LoadingSpinner /> : "Let's gooo!"}
                  className="sm:min-w-[123px] mt-3 mb-2 min-w-full"
                />
              </form>
            )}
          </div>
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default ResetPassword;
