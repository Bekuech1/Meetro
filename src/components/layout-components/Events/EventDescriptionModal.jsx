import TextButton from "../Buttons/TextButtons";
import TextArea from "../Inputs/TextArea";
import Modal from "../Modal/Modal";
import FormGroup from "../Inputs/FormGroup";
import { useState } from "react";
import { useModalContext } from "../Modal/ModalContext";

export default function EventDescriptionModal({ onSave, descriptionData }) {
  const { close } = useModalContext();
  const [description, setDescription] = useState(descriptionData || "");
  const [validation, setValidation] = useState("");

  const resetData = () => {
    setDescription(descriptionData || "");
    setValidation("");
  };

  const handleSave = () => {
    if (validateDescription()) {
      onSave(description);
      close();
    }
  };

  const validateDescription = () => {
    if (description.trim() === "") {
      setValidation("Description is required.");
      return false;
    }
    setValidation("");
    return true;
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
          <FormGroup
            message={
              validation
                ? {
                    text: validation,
                    type: "error",
                  }
                : null
            }
          >
            <TextArea
              maxLength={500}
              value={description}
              onChange={e => {
                setDescription(e.target.value);
                setValidation("");
              }}
              className="input"
            />
          </FormGroup>
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
