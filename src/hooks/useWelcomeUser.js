import dayjs from "dayjs";
import { useModalContext } from "@/components/layout-components/Modal/ModalContext";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

export const useWelcomeUser = () => {
  const { user } = useAuthStore();
  const { setActive, active } = useModalContext();
  const isVerified = user?.verified;

  useEffect(() => {
    // Show welcome modal only for unverified users within 24 hours of account creation
    if (user && isVerified) {
      // Generate unique key for localStorage
      const welcomeKey = `welcome_shown_${user.email}`;
      // Check if welcome modal has been shown before
      const hasSeenWelcome = localStorage.getItem(welcomeKey);
      // Calculate account age in hours
      const accountAge = dayjs().diff(dayjs(user.createdAt), "hours");

      // Show welcome modal if not seen and account is less than 24 hours old
      if (!hasSeenWelcome && !active && accountAge < 24) {
        setTimeout(() => {
          setActive("welcome");
          localStorage.setItem(welcomeKey, "true");
        }, 1000);
      }
    }
  }, [user, isVerified, setActive, active]);
};
