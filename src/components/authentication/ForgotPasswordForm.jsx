import InputIcon from "@/assets/icons/InputIcon";
import IconButton from "../layout-components/Buttons/IconButton";
import FormGroup from "../layout-components/Inputs/FormGroup";
import InputField from "../layout-components/Inputs/InputField";
import TextButton from "../layout-components/Buttons/TextButtons";
import LoadingSpinner from "../layout-components/LoadingSpinner";
import TagButton from "../layout-components/Buttons/TagButton";
import Alert from "../layout-components/Alert";
import React, { useState, useEffect } from "react";
import { Lock1, Sms } from "iconsax-reactjs";
import { authApi } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [hasSent, setHasSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [canSend, setCanSend] = useState(true);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    // Only run timer if email has been sent
    if (!hasSent) return;
    // Start countdown
    if (timer === 0) {
      setCanSend(true);
      return;
    }
    // Disable resend until timer ends
    setCanSend(false);
    // Start interval
    const interval = setInterval(() => {
      setTimer(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, hasSent]);

  const { mutate: forgotPasswordMutate, isPending: loading } = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: ({ status }) => {
      if (status === "success") {
        // Reset timer
        setTimer(60);
        // Allow resend after timer
        setCanSend(false);
        // Indicate that email has been sent
        if (!hasSent) setHasSent(true);
      }
    },
    onError: err => {
      // Set error message
      setErrorMessage(
        err.response?.data?.message || "Failed to send email. Please try again."
      );
    },
  });

  const handleSend = () => {
    // Prevent multiple sends
    if (!canSend || !email) return;
    // Clear previous error
    setErrorMessage(null);
    // Call forgot password mutation
    forgotPasswordMutate(email);
  };
  return (
    <div className="satoshi font-bold text-sm">
      <IconButton
        className="pointer-events-none size-11! mb-6"
        variant="tertiary"
        icon={<Lock1 color="#077D8A" size={24} variant="Bold" />}
      />
      {!hasSent ? (
        <div>
          <h3 className="paytone text-[18px] mb-2 leading-[28px] font-normal">
            Forgot your password? No worries!
          </h3>
          <p className="text-[#8A9191] mb-8">
            No worries if you've forgotten your password! Just enter your email
            address below, and we'll send you a link to reset it. it's that
            simple!
          </p>
          <div className="mb-8">
            <FormGroup label="Drop your email here">
              <InputField
                type="email"
                placeholder="e.g. newman@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                name="email"
                required
                leftIcon={
                  <InputIcon>
                    <Sms size={16} color="#001010" variant="Bold" />
                  </InputIcon>
                }
              />
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
            disabled={loading}
            onClick={handleSend}
            text={loading ? <LoadingSpinner /> : "Continue"}
            className="sm:min-w-[123px] min-w-full"
          />
        </div>
      ) : (
        <div>
          <h3 className="paytone text-[18px] mb-2 leading-[28px] font-normal">
            Password reset email has been sent
          </h3>
          <p className="text-[#8A9191] mb-8">
            We sent a password reset email to{" "}
            <span className="text-[#001010]">{email}</span>. To reset your
            password, please check your inbox and click on the link.
          </p>
          {/* Resend email section */}
          <div className="flex justify-between items-center gap-3">
            <p>
              {canSend ? (
                <span className="text-[#001010]">
                  Didn't receive the email?
                </span>
              ) : (
                <React.Fragment>
                  Resend email in{" "}
                  <span className="text-[#06727E]">
                    00:{timer.toString().padStart(2, "0")}
                  </span>
                </React.Fragment>
              )}
            </p>
            {canSend && (
              <TagButton
                variant="light-purple"
                size="sm"
                text="Resend Email"
                className="satoshi"
                onClick={handleSend}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordForm;
