import { authApi } from "@/services/authApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { ArrowDown2, Sms, User, UserAdd } from "iconsax-reactjs";
import { useState } from "react";
import { useModalContext } from "../layout-components/Modal/ModalContext";
import { useMutation } from "@tanstack/react-query";
import InputIcon from "@/assets/icons/InputIcon";
import Alert from "../layout-components/Alert";
import TextButton from "../layout-components/Buttons/TextButtons";
import FormGroup from "../layout-components/Inputs/FormGroup";
import InputField from "../layout-components/Inputs/InputField";
import PasswordField from "../layout-components/Inputs/PasswordField";
import LoadingSpinner from "../layout-components/LoadingSpinner";
import GoogleButton from "./GoogleButton";
import IconButton from "../layout-components/Buttons/IconButton";
import { randomProfileImage } from "@/lib/utils";

export default function SignUpForm({ onSuccess, setForm }) {
  // Open email form
  const [open, setOpen] = useState(false);
  // Error message
  const [errorMessage, setErrorMessage] = useState(null);
  // Modal context
  const { close } = useModalContext();
  // Auth store
  const { setUser, setAccessToken, setRefreshToken, setLastFetchedProfile } =
    useAuthStore();

  const { mutate: signupMutate, isPending: loading } = useMutation({
    mutationFn: async signupData => {
      // Make signup request
      const signupResponse = await authApi.signup(signupData);
      // Store access token
      setAccessToken(signupResponse.accessToken);
      // Store refresh token
      setRefreshToken(signupResponse.refreshToken);
      // Fetch user profile
      const getProfileResponse = await authApi.getProfile();
      const user = getProfileResponse.user;
      // Set random default photo
      if (!user?.photo) user.photo = randomProfileImage();
      // Set user in store
      setUser(user);
      // Set last fetched profile time
      setLastFetchedProfile(Date.now());
    },
    onSuccess: async () => {
      // Close modal
      close();
      // Proceed after a short delay
      setTimeout(() => onSuccess?.(), 300);
    },
    onError: err => {
      // Set error message
      handleSetErrorMessage({
        type: "signup",
        message:
          err.response?.data?.message || "Signup failed. Please try again.",
      });
    },
  });

  // Handle setting errors
  const handleSetErrorMessage = data => {
    setErrorMessage(data);
  };

  const handleSignup = e => {
    // Prevent default form submission
    e.preventDefault();
    // Clear previous errors
    setErrorMessage(null);
    // Get form data
    const formData = Object.fromEntries(new FormData(e.target).entries());
    // Split name into first and last name
    const [firstName, lastName] = formData.name.split(" ");
    // Assign to formData
    formData.firstName = firstName;
    formData.lastName = lastName;

    // Prepare signup data
    const signupData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    // Call signup
    signupMutate(signupData);
  };

  return (
    <div className="satoshi font-bold text-sm">
      <IconButton
        className="pointer-events-none size-11! mb-6"
        variant="tertiary"
        icon={<UserAdd color="#077D8A" size={24} variant="Bold" />}
      />
      <h3 className="paytone text-[18px] mb-2 leading-[28px] font-normal">
        Create an Account
      </h3>
      <p className="text-[#8A9191]">Join the Meetro in seconds!</p>
      <div className="flex flex-col mt-4 gap-y-4">
        {/* Google Button */}
        <GoogleButton
          onSuccess={onSuccess}
          setError={handleSetErrorMessage}
          error={errorMessage}
        />
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
                required
                leftIcon={
                  <InputIcon>
                    <User size={16} color="#001010" variant="Bold" />
                  </InputIcon>
                }
              />
            </FormGroup>
            <FormGroup label="Drop your email here">
              <InputField
                required
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
              <PasswordField name="password" required />
            </FormGroup>
            {/* Alert message goes here */}
            {errorMessage && errorMessage?.type === "signup" && (
              <Alert
                type="error"
                title={errorMessage.message}
                onClick={() => setErrorMessage(null)}
              />
            )}
            <TextButton
              disabled={loading}
              text={loading ? <LoadingSpinner /> : "Let's gooo!"}
              className="sm:min-w-[123px] mt-3 mb-2 min-w-full"
            />
          </form>
        )}
        <p className="text-[#001010]">
          Already have an account?{" "}
          <button
            className="text-[#866AD2] cursor-pointer"
            type="button"
            onClick={() => setForm("login")}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}
