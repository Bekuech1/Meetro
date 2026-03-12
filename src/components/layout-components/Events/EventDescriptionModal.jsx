import TextButton from "../Buttons/TextButtons";
import TextArea from "../Inputs/Textarea";
import Modal from "../Modal/Modal";
import { useModalContext } from "../Modal/ModalContext";

export default function EventDescriptionModal({ onSave }) {
  const { close } = useModalContext();

  return (
    <Modal.Window
      name="event-description"
      title="Give a Description of your Event"
    >
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
          <TextArea />
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <TextButton text="Cancel" variant="tertiary" onClick={close} />
            <TextButton text="Save" />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
