import { useState } from "react";
import { useModalContext } from "../Modal/ModalContext";
import TextButton from "../Buttons/TextButtons";
import TextArea from "../Inputs/TextArea";
import Modal from "../Modal/Modal";

export default function EventDescriptionModal({ onSave, descriptionData }) {
  const { close } = useModalContext();
  const [description, setDescription] = useState(descriptionData || "");

  const resetData = () => {
    setDescription(descriptionData || "");
  };

  const handleSave = () => {
    onSave(description);
    close();
  };

  return (
    <Modal.Window
      name="event-description"
      title="Give a Description of your Event"
      onClose={resetData}
    >
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
          <TextArea
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <TextButton
              text="Cancel"
              variant="tertiary"
              onClick={() => {
                close();
                resetData();
              }}
            />
            <TextButton text="Save" onClick={handleSave} />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
