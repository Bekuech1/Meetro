import React, {useState} from "react";
import InputModals from "../InputModals";
import DressCodeSelector from "./Popup components/DressCodeSelector";

const DressCode = ({ isVisible, onClose, onSave }) => {
  const [dressCode, setDressCode] = useState("");

  if (!isVisible) return null;

  const handleSave = () => {
    onSave(dressCode);
    onClose();
  };

  return (
    <InputModals
      title="dress code"
      isVisible={isVisible}
      onClose={onClose}
      onSave={handleSave}
      hidden="hidden"
    >
      <DressCodeSelector value={dressCode} onChange={setDressCode} />
      <div></div>
    </InputModals>
  );
};

export default DressCode;
