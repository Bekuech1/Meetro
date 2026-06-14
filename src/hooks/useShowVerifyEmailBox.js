import { useEffect } from "react";
import { useModalContext } from "@/components/layout-components/Modal/ModalContext";
import { useAuthStore } from "@/stores/useAuthStore";

export const useShowVerifyEmailBox = () => {
  const { user } = useAuthStore();
  const { setActive } = useModalContext();

  useEffect(() => {
    // Only show if user is logged in and not verified
    if (user?.email && !user.verified) {
      const timeout = setTimeout(() => {
        setActive("verify-email");
      }, 1000); // Show after 1 second

      // Cleanup timeout if component unmounts
      return () => clearTimeout(timeout);
    }
  }, [user, setActive]);
};
