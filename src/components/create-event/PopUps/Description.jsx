import React, { useState } from "react";
import InputModals from "../InputModals";
import TextOnlyInput from "../PopUps/Popup components/TextOnlyInput";

const Description = ({ isVisible, onClose, onSave }) => {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (value) => {
    setDescription(value);
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
      title="event description"
      onSave={handleSave}
      hidden="hidden"
    >
      <div className="w-full h-fit grid gap-4 fix">
        <div className="w-full h-fit flex gap-4"></div>
      </div>
      <div></div>
    </InputModals>
  );
};

export default Description;
