import { ArrowDown2, Sms, User } from "iconsax-reactjs";
import { useEffect, useState } from "react";
import { useModalContext } from "../Modal/ModalContext";
import { useAuthStore } from "@/stores/useAuthStore";
import InputIcon from "@/assets/icons/InputIcon";
import TextButton from "../Buttons/TextButtons";
import FormGroup from "../Inputs/FormGroup";
import InputField from "../Inputs/InputField";
import PasswordField from "../Inputs/PasswordField";
import Modal from "../Modal/Modal";
import GoogleButton from "./GoogleButton";
import API from "@/lib/axios";
import Alert from "../Alert";

export default function SignUpModal({ onSuccess }) {
  // Open email form
  const [open, setOpen] = useState(false);

  // Error state
  const [error, setError] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Modal context
  const { setActive, close } = useModalContext();

  // Auth store
  const { setUser, setAccessToken, user, setRefreshToken, setIdToken } =
    useAuthStore();

  const handleSignup = async e => {
    // Prevent default form submission
    e.preventDefault();
    try {
      // Set loading state
      setLoading(true);
      // Get form data
      const formData = Object.fromEntries(new FormData(e.target).entries());

      // Split full name into first and last name
      const [firstName, lastName] = formData.name.split(" ");
      // Assign to formData
      formData.firstName = firstName;
      formData.lastName = lastName;
      // Remove the original name field
      delete formData.name;
      // Signup request
      await API.post("/signup", formData);

      // Login request
      const response = await API.post("/login", {
        email: formData.email,
        password: formData.password,
      });

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
      setError(
        error?.response?.data?.error || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      // Close the signup modal
      close();

      // Call onSuccess callback after a short delay
      setTimeout(() => {
        onSuccess?.();
      }, 300);
    }
  }, [user]);
  return (
    <Modal.Window name="signup">
      {/* Signup form or content goes here */}
      <div className="satoshi font-bold text-sm">
        <h3 className="paytone text-[18px] mb-2 leading-[28px] font-normal">
          Create an Account
        </h3>
        <p className="text-[#8A9191]">Join the Meetro in seconds!</p>
        <div className="flex flex-col mt-4 gap-y-4">
          {/* Google Button */}
          <GoogleButton />
          {/* Email Button */}
          {!open ? (
            <TextButton
              variant="secondary"
              text="Sign up with Email"
              rightImg={
                <ArrowDown2 variant="Outline" size={16} color="#011F0F" />
              }
              onClick={() => setOpen(true)}
            />
          ) : (
            <form className="flex flex-col gap-y-3" onSubmit={handleSignup}>
              <FormGroup label="What's your name?">
                <InputField
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  leftIcon={
                    <InputIcon>
                      <User size={16} color="#001010" variant="Bold" />
                    </InputIcon>
                  }
                />
              </FormGroup>
              <FormGroup label="Drop your email here">
                <InputField
                  type="email"
                  placeholder="e.g. newman@gmail.com"
                  name="email"
                  leftIcon={
                    <InputIcon>
                      <Sms size={16} color="#001010" variant="Bold" />
                    </InputIcon>
                  }
                />
              </FormGroup>
              <FormGroup label="Create a password">
                <PasswordField name="password" />
              </FormGroup>
              {/* Alert message goes here */}
              {error && (
                <Alert
                  type="error"
                  title={error}
                  onClick={() => setError(null)}
                />
              )}
              <TextButton
                disabled={loading}
                text={loading ? "Loading..." : "Let's gooo!"}
                className="sm:min-w-[123px] mt-3 mb-2 min-w-full"
              />
            </form>
          )}
          <p className="text-[#001010]">
            Already have an account?{" "}
            <button
              className="text-[#866AD2] cursor-pointer"
              type="button"
              onClick={() => setActive("login")}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </Modal.Window>
  );
}
