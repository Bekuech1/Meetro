import { useAuthStore } from "@/stores/useAuthStore";
import { useState, useEffect } from "react";
import { ShieldTick } from "iconsax-reactjs";
import { useModalContext } from "../layout-components/Modal/ModalContext";
import { authApi } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";
import Modal from "../layout-components/Modal/Modal";
import OTP from "../layout-components/Inputs/OTP";
import TextButton from "../layout-components/Buttons/TextButtons";
import LoadingSpinner from "../layout-components/LoadingSpinner";
import TagButton from "../layout-components/Buttons/TagButton";
import Alert from "../layout-components/Alert";
import IconButton from "../layout-components/Buttons/IconButton";

function VerifyEmailModal() {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { setActive } = useModalContext();
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    setCanResend(false);
    const interval = setInterval(() => {
      setTimer(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const {
    mutate: verifyMutate,
    isPending: loading,
    error,
  } = useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: ({ status }) => {
      // Check if verification was successful
      if (status === "success") {
        // Update user store
        setUser({ ...user, verified: true });
        // Close modal and proceed
        setActive(null);
      }
    },
    onError: err => {
      // Set error message
      setErrorMessage(
        err.response?.data?.message || "Verification failed. Please try again."
      );
    },
  });

  const { mutate: resendMutate } = useMutation({
    mutationFn: authApi.resendOtp,
    onSuccess: () => {
      // Reset timer
      setTimer(60);
      setCanResend(false);
    },
    onError: err => {
      // Handle error silently
      setErrorMessage(
        err.response?.data?.message ||
          "Failed to resend code. Please try again."
      );
    },
  });

  const handleVerify = () => {
    // Prevent submission if OTP is incomplete
    if (otp.length !== 6) return;
    // Clear previous error
    setErrorMessage(null);
    // Call verify email API
    verifyMutate({ otp, email: user.email });
  };

  const handleResend = () => {
    if (!canResend) return;
    // Clear previous error
    setErrorMessage(null);
    // Call resend OTP API
    resendMutate({ email: user.email });
  };

  return (
    <Modal.Window name="verify-email" showCloseButton={false}>
      <div className="satoshi font-bold text-sm">
        <IconButton
          className="pointer-events-none size-11! mb-6"
          variant="tertiary"
          icon={<ShieldTick color="#077D8A" size={24} variant="Bold" />}
        />
        <h3 className="paytone text-[18px] mb-2 leading-[28px] font-normal">
          Verify your email
        </h3>
        <p className="text-[#8A9191]">
          We sent a verification code to{" "}
          <span className="text-[#001010]">{user?.email}</span>. To verify your
          email address, please check your inbox and enter the code below.
        </p>
        {/* OTP component */}
        <div className="mt-8 mb-8">
          <OTP
            onChange={code => {
              setErrorMessage(null);
              setOtp(code);
            }}
            error={!!error}
          />
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
        {/* Verify button */}
        <TextButton
          disabled={loading}
          text={loading ? <LoadingSpinner /> : "Verify"}
          className="sm:min-w-[123px] mb-8 min-w-full"
          onClick={handleVerify}
        />
        {/* Resend code section */}
        <div className="flex justify-between items-center gap-3">
          <p>
            Resend code in{" "}
            <span className="text-[#06727E]">
              00:{timer.toString().padStart(2, "0")}
            </span>
          </p>
          {canResend && (
            <TagButton
              onClick={handleResend}
              variant="light-purple"
              size="sm"
              text="Resend Code"
              className="satoshi"
            />
          )}
        </div>
      </div>
    </Modal.Window>
  );
}

export default VerifyEmailModal;
