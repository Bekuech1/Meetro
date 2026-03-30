import TextButton from "../Buttons/TextButtons";
import FormGroup from "../Inputs/FormGroup";
import InputField from "../Inputs/InputField";
import Modal from "../Modal/Modal";
import { useModalContext } from "../Modal/ModalContext";
import { useEffect, useState } from "react";

function EventEntryCodeModal({onSave, entryCodeData}) {
    const {close} = useModalContext();
    const [entryCode, setEntryCode] = useState(entryCodeData || "");
    const [validation, setValidation] = useState("");
    // Reset data
    const resetData = () => {
        setEntryCode(entryCodeData || "");
        setValidation("");
    }
    // Handle save
    const handleSave = () => {
        if (validateEntryCode()) {
            onSave(entryCode);
            close();
        }
    }

    // Update entry code when the modal is opened
    useEffect(() => {
        if(entryCodeData){
            setEntryCode(entryCodeData);
        }
    }, [entryCodeData]);

    // Validate entry code
    const validateEntryCode = () => {
        if (entryCode.trim() === "") {
            setValidation("Entry code is required.");
            return false;
        }
        setValidation("");
        return true;
    }
  return (
       <Modal.Window
      name="event-entry-code"
      title="Entry Code"
      onClose={resetData}
    >
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
          <FormGroup
          label="Entry Code"
            message={
              validation
                ? {
                    text: validation,
                    type: "error",
                  }
                : null
            }
          >
    <InputField placeholder="Set an Entry Code" value={entryCode} onChange={(e) => setEntryCode(e.target.value.toUpperCase())} />
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
  )
}

export default EventEntryCodeModal;