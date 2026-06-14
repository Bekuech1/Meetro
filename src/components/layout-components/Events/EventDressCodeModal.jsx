import TagButton from "../Buttons/TagButton";
import TextButton from "../Buttons/TextButtons";
import Modal from "../Modal/Modal";
import Radio from "../Selectors/Radio";
import FormGroup from "../Inputs/FormGroup";
import InputField from "../Inputs/InputField";
import { useEffect, useState } from "react";
import { useModalContext } from "../Modal/ModalContext";

export default function EventDressCodeModal({ onSave, dressCodeData }) {
  const { close } = useModalContext();

  const initialDressCode = {
    type: dressCodeData?.type || "Casual",
    details: dressCodeData?.details || "",
  };

  const [newDressCode, setNewDressCode] = useState(initialDressCode);

  // Reset values
  const resetValues = () => {
    setNewDressCode(initialDressCode);
  };

  const [validation, setValidation] = useState({
    dressCode: "",
  });

  // Validation function for dress code
  const validateDressCode = () => {
    const errors = {};
    if (newDressCode.type == "Custom" && !newDressCode.details.trim()) {
      errors.dressCode = "Dress code details are required.";
    }
    setValidation(errors);
    return Object.keys(errors).length === 0;
  };

  // Reset values when modal opens with new data
  useEffect(() => {
    resetValues();
  }, [dressCodeData]);

  // Handle save action
  const handleSave = () => {
    if (validateDressCode()) {
      onSave(newDressCode);
      close();
    }
  };

  // Helper to set dress code type
  const handleSetDressCodeType = type => {
    setNewDressCode({
      type,
      details: type === "Custom" ? newDressCode.details : "",
    });
    setValidation(prev => ({ ...prev, dressCode: "" }));
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
            <div className="flex flex-wrap gap-2 items-center">
              <TagButton
                leftImg={
                  <Radio
                    size="sm"
                    label="Casual"
                    checked={newDressCode.type === "Casual"}
                  />
                }
                className={`hover:bg-white ${newDressCode.type === "Casual" ? "!border-[#61B42D] [&_label]:text-[#61B42D]" : ""}`}
                onClick={() => handleSetDressCodeType("Casual")}
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
                onClick={() => handleSetDressCodeType("Corporate")}
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
                onClick={() => handleSetDressCodeType("Traditional")}
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
                onClick={() => handleSetDressCodeType("Custom")}
              />
            </div>
            {newDressCode.type === "Custom" && (
              <FormGroup
                label="Custom Dress Code"
                message={
                  validation.dressCode
                    ? {
                        type: "error",
                        text: validation.dressCode,
                      }
                    : null
                }
              >
                <InputField
                  placeholder="Specify the dress code"
                  value={newDressCode.details}
                  onChange={e => {
                    setNewDressCode({
                      ...newDressCode,
                      details: e.target.value,
                    });
                    setValidation(prev => ({ ...prev, dressCode: "" }));
                  }}
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
