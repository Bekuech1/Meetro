import { ArrowDown2, Sms, User } from "iconsax-reactjs";
import { useState } from "react";
import { useModalContext } from "@/components/layout-components/Modal/ModalContext";
import { useLoginUser } from "@/hooks/useLoginUser";
import InputIcon from "@/assets/icons/InputIcon";
import Alert from "../layout-components/Alert";
import TextButton from "@/components/layout-components/Buttons/TextButtons";
import FormGroup from "@/components/layout-components/Inputs/FormGroup";
import InputField from "@/components/layout-components/Inputs/InputField";
import PasswordField from "@/components/layout-components/Inputs/PasswordField";
import LoadingSpinner from "@/components/layout-components/LoadingSpinner";
import GoogleButton from "@/components/authentication/GoogleButton";
import IconButton from "../layout-components/Buttons/IconButton";

export default function LoginForm({ onSuccess, setForm }) {
  // Open email form
  const [open, setOpen] = useState(false);
  // Error message
  const [errorMessage, setErrorMessage] = useState(null);
  // Modal context
  const { close } = useModalContext();

  const { loginMutate, loading } = useLoginUser({
    onSuccess: () => {
      // Close modal
      close();
      setTimeout(() => onSuccess?.(), 300);
    },
    onError: err => {
      handleSetErrorMessage({
        type: "login",
        message:
          err.response?.data?.message || "Login failed. Please try again.",
      });
    },
  });

  // Handle setting errors
  const handleSetErrorMessage = data => {
    setErrorMessage(data);
  };

  // Handle login
  const handleLogin = e => {
    // Prevent default form submission
    e.preventDefault();
    // Clear previous error
    setErrorMessage(null);
    // Get form data
    const formData = Object.fromEntries(new FormData(e.target).entries());

    // Call login
    loginMutate({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="satoshi font-bold text-sm">
      <IconButton
        className="pointer-events-none size-11! mb-6"
        variant="tertiary"
        icon={<User color="#077D8A" size={24} variant="Bold" />}
      />
      <h3 className="paytone text-[18px] mb-2 leading-[28px] font-normal">
        Log In
      </h3>
      <p className="text-[#8A9191]">Welcome back! We saved you a spot.</p>
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
            <FormGroup label="Enter your password">
              <PasswordField name="password" required />
            </FormGroup>
            {/* Alert message goes here */}
            {errorMessage && errorMessage?.type === "login" && (
              <Alert
                type="error"
                title={errorMessage.message}
                onClick={() => setErrorMessage(null)}
              />
            )}
            <button
              className="cursor-pointer bg-transparent text-[#866Ad2] self-start text-sm font-bold"
              type="button"
              onClick={() => setForm("forgot-password")}
            >
              Forgot Password?
            </button>
            <TextButton
              type="submit"
              disabled={loading}
              text={loading ? <LoadingSpinner /> : "Let's gooo!"}
              className="sm:min-w-[123px] mt-3 mb-2 min-w-full"
            />
          </form>
        )}
        <p className="text-[#001010]">
          New to Meetro?{" "}
          <button
            className="text-[#866AD2] cursor-pointer"
            type="button"
            onClick={() => setForm("signup")}
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}
