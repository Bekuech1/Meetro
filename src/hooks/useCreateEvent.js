import { useModalContext } from "@/components/Layout-conponents/Modal/ModalContext";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

export const useCreateEvent = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { setActive } = useModalContext();
  const handleCreateEvent = () => {
    if (!user) {
      setActive("auth");
    } else {
      navigate("/create-event");
    }
  };

  return { handleCreateEvent };
};
