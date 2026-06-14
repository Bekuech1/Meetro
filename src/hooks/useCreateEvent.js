import { useModalContext } from "@/components/layout-components/Modal/ModalContext";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

export const useCreateEvent = () => {
  const { user } = useAuthStore();
  const { setActive } = useModalContext();
  const navigate = useNavigate();
  // Handle create event action
  const handleCreateEvent = () => {
    // If user is not logged in, show auth modal
    if (!user) {
      setActive("auth");
    } else {
      // Navigate to dashboard
      navigate("/home");
    }
  };

  return { handleCreateEvent };
};
