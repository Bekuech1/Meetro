import ConfirmationButton from "../Buttons/ConfirmationButton";
import AuthModal from "@/components/authentication/AuthModal";
import React from "react";
import { useConfirmAttendance } from "@/hooks/useConfirmAttendance";

function ConfirmAttendance({ event }) {
  const { isPending, selectedResponse, handleRespond } = useConfirmAttendance({
    event,
  });

  return (
    <React.Fragment>
      <ConfirmationButton
        variant="not-sure"
        onClick={() => {
          handleRespond("maybe");
        }}
        loading={isPending && selectedResponse === "maybe"}
        disabled={isPending}
      />
      <ConfirmationButton
        variant="going"
        onClick={() => {
          handleRespond("going");
        }}
        disabled={isPending}
        loading={isPending && selectedResponse === "going"}
      />
      <AuthModal
        onSuccess={() => {
          handleRespond(selectedResponse);
        }}
      />
    </React.Fragment>
  );
}

export default ConfirmAttendance;
