import { ArrowDown2, Sms } from "iconsax-reactjs";
import { useEffect, useState } from "react";
import { useModalContext } from "../Modal/ModalContext";
import { useAuthStore } from "@/stores/useAuthStore";
import InputIcon from "@/assets/icons/InputIcon";
import Modal from "../Modal/Modal";
import TextButton from "../Buttons/TextButtons";
import FormGroup from "../Inputs/FormGroup";
import InputField from "../Inputs/InputField";
import PasswordField from "../Inputs/PasswordField";
import GoogleButton from "./GoogleButton";
import API from "@/lib/axios";
import Alert from "../Alert";

export default function LoginModal({ onSuccess }) {
  // Open email form
  const [open, setOpen] = useState(false);
  // Modal context
  const { setActive, close } = useModalContext();

  // Loading state
  const [loading, setLoading] = useState(false);

  // Error
  const [error, setError] = useState(null);

  // Auth store
  const { setUser, setAccessToken, user, setRefreshToken, setIdToken } =
    useAuthStore();

  // Handle login
  const handleLogin = async e => {
    // Prevent default form submission
    e.preventDefault();

    // Get form data
    const formData = Object.fromEntries(new FormData(e.target).entries());

    try {
      // Set error to null
      setError(null);
      // Set loading state
      setLoading(true);
      // Make login request
      const response = await API.post("/login", formData);

      // Extract tokens from response
      const { accessToken, idToken, refreshToken } = response.data;

      // Store tokens
      setAccessToken(accessToken);
      setIdToken(idToken);
      setRefreshToken(refreshToken);

      // Fetch user profile
      const userProfile = await API.get("/profile");

      // Set user in store
      if (userProfile) setUser(userProfile.data);
    } catch (error) {
      console.log(error);
      setError(
        error?.response?.data?.error || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call onSuccess callback when user is set
    if (user) {
      close();
      setTimeout(() => {
        onSuccess?.();
      }, 300);
    }
  }, [user]);
  return (
    <Modal.Window name="login">
      {/* Login form or content goes here */}
      <div className="satoshi font-bold text-sm">
        <h3 className="paytone text-[18px] mb-2 leading-[28px] font-normal">
          Log In
        </h3>
        <p className="text-[#8A9191]">Welcome back! We saved you a spot.</p>
        <div className="flex flex-col mt-4 gap-y-4">
          {/* Google Button */}
          <GoogleButton />
          {/* Email Button */}
          {!open ? (
            <TextButton
              variant="secondary"
              text="Continue with Email"
              className="min-w-full sm:min-w-0"
              rightImg={
                <ArrowDown2 variant="Outline" size={16} color="#011F0F" />
              }
              onClick={() => setOpen(true)}
            />
          ) : (
            <form className="flex flex-col gap-y-3" onSubmit={handleLogin}>
              <FormGroup label="Drop your email here">
                <InputField
                  type="email"
                  placeholder="e.g. newman@gmail.com"
                  name="email"
                  required
                  leftIcon={
                    <InputIcon>
                      <Sms size={16} color="#001010" variant="Bold" />
                    </InputIcon>
                  }
                />
              </FormGroup>
              <FormGroup label="Create a password">
                <PasswordField name="password" required />
              </FormGroup>
              {/* Alert message goes here */}
              {error && (
                <Alert
                  type="error"
                  title={error}
                  onClick={() => setError(null)}
                />
              )}
              <button
                className="cursor-pointer bg-transparent text-[#866Ad2] self-start text-sm font-bold"
                type="button"
              >
                Forgot Password?
              </button>
              <TextButton
                type="submit"
                disabled={loading}
                text={loading ? "Loading..." : "Let's gooo!"}
                className="sm:min-w-[123px] mt-3 mb-2 min-w-full"
              />
            </form>
          )}
          <p className="text-[#001010]">
            New to Meetro?{" "}
            <button
              className="text-[#866AD2] cursor-pointer"
              type="button"
              onClick={() => setActive("signup")}
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </Modal.Window>
  );
}
