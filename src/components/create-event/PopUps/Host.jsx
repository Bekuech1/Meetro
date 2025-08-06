import React, { useState } from "react";
import InputModals from "../InputModals";
import TextOnlyInput from "../PopUps/Popup components/TextOnlyInput";
import { useAuthStore } from "@/stores/useAuthStore";

const Host = ({ isVisible, onClose, onSave }) => {
  const user = useAuthStore((state) => state.user);
  const [hostName, setHostName] = useState(
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : ""
  );

  const handleHostNameChange = (value) => {
    setHostName(value);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(hostName); // Pass the host name to the parent component
    }
    onClose(); // Close the modal after saving
  };

  return (
    <InputModals
      isVisible={isVisible}
      onClose={onClose}
      title="Host"
      onSave={handleSave}
      hidden="hidden"
    >
      <div className="w-full h-fit flex gap-4">
        <div className="flex gap-1 items-center justify-center">
          <img
            src="/crown.svg"
            alt="Crown icon"
            className="size-4"
            onError={(e) => {
              // Fallback if crown.svg fails to load
              e.target.style.display = "none";
            }}
          />
          <p className="text-[16px] font-bold satoshi text-[#8A9191]">Host</p>
        </div>
        <div className="flex-1">
          <TextOnlyInput
            value={hostName}
            onChange={handleHostNameChange}
            placeholder="Enter your name"
            showLeftIcon={false}
            showRightIcon={false}
            rounded="rounded-[12px]"
          />
        </div>
      </div>
      <div></div>
    </InputModals>
  );
};

export default Host;
