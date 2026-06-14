import { useModalContext } from "@/components/layout-components/Modal/ModalContext";
import { eventsApi } from "@/services/eventsApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useConfirmAttendance = ({ event }) => {
  const [selectedResponse, setSelectedResponse] = useState(null);
  const queryClient = useQueryClient();
  const { mutate: confirm, isPending } = useMutation({
    mutationFn: responseStatus =>
      eventsApi.confirmAttendance(event._id, responseStatus),
    onSuccess: () => {
      queryClient.invalidateQueries(["event", event.slug]);
      queryClient.invalidateQueries(["user-events"]);
      queryClient.invalidateQueries(["userEventsCount"]);
    },
  });

  const { user } = useAuthStore();
  const { setActive } = useModalContext();

  const handleRespond = responseStatus => {
    setSelectedResponse(responseStatus);

    if (!user) {
      setActive("auth");
      return;
    }

    if (event.chipInDetails) {
      setActive("pay-chip-in");
      return;
    }

    confirm(responseStatus);
  };

  return { isPending, selectedResponse, handleRespond };
};
