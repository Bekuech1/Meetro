import { useModalContext } from "@/components/layout-components/Modal/ModalContext";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import dayjs from "dayjs";

const CURRENT_VERSION = __APP_VERSION__;
export const useChangelog = () => {
  const { user } = useAuthStore();
  const { setActive } = useModalContext();

  useEffect(() => {
    if (user) {
      const welcomeKey = `welcome_shown_${user.email}`;
      const hasSeenWelcome = localStorage.getItem(welcomeKey);
      const accountAge = dayjs().diff(dayjs(user.createdAt), "hours");

      // Skip changelog for new users
      if (!hasSeenWelcome && accountAge < 24) return;

      const versionKey = `changelog_${user.email}`;
      const lastSeenVersion = localStorage.getItem(versionKey);

      if (lastSeenVersion !== CURRENT_VERSION) {
        setTimeout(() => {
          setActive("changelog");
          localStorage.setItem(versionKey, CURRENT_VERSION);
        }, 1000);
      }
    }
  }, [user, setActive]);
};
