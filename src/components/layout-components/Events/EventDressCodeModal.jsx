import { useState } from "react";
import { useModalContext } from "../Modal/ModalContext";
import TagButton from "../Buttons/TagButton";
import TextButton from "../Buttons/TextButtons";
import Modal from "../Modal/Modal";
import Radio from "../Selectors/Radio";
import FormGroup from "../Inputs/FormGroup";
import InputField from "../Inputs/InputField";

export default function EventDressCodeModal({ onSave }) {
  const { close } = useModalContext();

  const [dressCode, setDressCode] = useState("");
  const [customText, setCustomText] = useState("");

  return (
    <Modal.Window name="event-dress-code" title="Dress Code">
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
                    checked={dressCode === "casual"}
                  />
                }
                className={`${dressCode === "casual" ? "!border-[#61B42D] [&_label]:text-[#61B42D]" : ""}`}
                onClick={() => setDressCode("casual")}
              />
              <TagButton
                leftImg={
                  <Radio
                    size="sm"
                    label="Corporate"
                    checked={dressCode === "corporate"}
                  />
                }
                className={`${dressCode === "corporate" ? "!border-[#61B42D] [&_label]:text-[#61B42D]" : ""}`}
                onClick={() => setDressCode("corporate")}
              />
              <TagButton
                leftImg={
                  <Radio
                    size="sm"
                    label="Traditional"
                    checked={dressCode === "traditional"}
                  />
                }
                className={`${dressCode === "traditional" ? "!border-[#61B42D] [&_label]:text-[#61B42D]" : ""}`}
                onClick={() => setDressCode("traditional")}
              />
              <TagButton
                leftImg={
                  <Radio
                    size="sm"
                    label="Add Custom"
                    checked={dressCode === "custom"}
                  />
                }
                className={`${dressCode === "custom" ? "!border-[#61B42D] [&_label]:text-[#61B42D]" : ""}`}
                onClick={() => setDressCode("custom")}
              />
            </div>
            {dressCode === "custom" && (
              <FormGroup label="Custom Dress Code">
                <InputField
                  placeholder="Specify the dress code"
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                />
              </FormGroup>
            )}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <TextButton text="Cancel" variant="tertiary" onClick={close} />
            <TextButton text="Save" />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
