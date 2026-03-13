import TagButton from "../Buttons/TagButton";
import TextButton from "../Buttons/TextButtons";
import Modal from "../Modal/Modal";
import Radio from "../Selectors/Radio";
import FormGroup from "../Inputs/FormGroup";
import InputField from "../Inputs/InputField";
import { useState } from "react";
import { useModalContext } from "../Modal/ModalContext";

export default function EventDressCodeModal({ onSave, dressCodeData }) {
  const { close } = useModalContext();

  const initialDressCode = {
    type: dressCodeData?.type || "Casual",
    details: dressCodeData?.details || "",
  };

  const [newDressCode, setNewDressCode] = useState(initialDressCode);

  const resetValues = () => {
    setNewDressCode(initialDressCode);
  };

  const handleSave = () => {
    onSave(newDressCode);
    close();
  };

  return (
    <Modal.Window
      name="event-dress-code"
      title="Dress Code"
      onClose={resetValues}
    >
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-4">
            <h3 className="text-sm text-[#8A9191] font-medium">
              Select Preferred Dress Code
            </h3>
            <div className="flex flex-wrap gap-x-2 items-center">
              <TagButton
                leftImg={
                  <Radio
                    size="sm"
                    label="Casual"
                    checked={newDressCode.type === "Casual"}
                  />
                }
                className={`hover:bg-white ${newDressCode.type === "Casual" ? "!border-[#61B42D] [&_label]:text-[#61B42D]" : ""}`}
                onClick={() =>
                  setNewDressCode({
                    ...newDressCode,
                    type: "Casual",
                    details: "",
                  })
                }
              />
              <TagButton
                leftImg={
                  <Radio
                    size="sm"
                    label="Corporate"
                    checked={newDressCode.type === "Corporate"}
                  />
                }
                className={`hover:bg-white ${newDressCode.type === "Corporate" ? "!border-[#61B42D] [&_label]:text-[#61B42D]" : ""}`}
                onClick={() =>
                  setNewDressCode({
                    ...newDressCode,
                    type: "Corporate",
                    details: "",
                  })
                }
              />
              <TagButton
                leftImg={
                  <Radio
                    size="sm"
                    label="Traditional"
                    checked={newDressCode.type === "Traditional"}
                  />
                }
                className={`hover:bg-white ${newDressCode.type === "Traditional" ? "!border-[#61B42D] [&_label]:text-[#61B42D]" : ""}`}
                onClick={() =>
                  setNewDressCode({
                    ...newDressCode,
                    type: "Traditional",
                    details: "",
                  })
                }
              />
              <TagButton
                leftImg={
                  <Radio
                    size="sm"
                    label="Add Custom"
                    checked={newDressCode.type === "Custom"}
                  />
                }
                className={`hover:bg-white ${newDressCode.type === "Custom" ? "!border-[#61B42D] [&_label]:text-[#61B42D]" : ""}`}
                onClick={() =>
                  setNewDressCode({ ...newDressCode, type: "Custom" })
                }
              />
            </div>
            {newDressCode.type === "Custom" && (
              <FormGroup label="Custom Dress Code">
                <InputField
                  placeholder="Specify the dress code"
                  value={newDressCode.details}
                  onChange={e =>
                    setNewDressCode({
                      ...newDressCode,
                      details: e.target.value,
                    })
                  }
                />
              </FormGroup>
            )}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <TextButton
              text="Cancel"
              variant="tertiary"
              onClick={() => {
                close();
                resetValues();
              }}
            />
            <TextButton text="Save" onClick={handleSave} />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
