import { Trash } from "iconsax-reactjs";
import { useModalContext } from "../Modal/ModalContext";
import IconButton from "../Buttons/IconButton";
import Modal from "../Modal/Modal";
import Alert from "../Alert";
import TextButton from "../Buttons/TextButtons";

export default function DeleteEventModal({ eventId, showAlert = false }) {
  // Modal context
  const { setActive } = useModalContext();
  return (
    <Modal.Window name="delete-event">
      <div className="satoshi font-bold text-sm">
        <IconButton
          className="pointer-events-none size-11! mb-6"
          variant="tertiary"
          icon={<Trash color="#077D8A" size={24} variant="Bold" />}
        />
        <h3 className="paytone text-[18px] mb-2 leading-[28px] font-normal">
          Are you sure you want to delete this event?
        </h3>
        <p className="text-[#8A9191]">
          This action is permanent and cannot be undone.
          <br />
          All attendees will be notified, and the event will be removed from
          public view.
        </p>
        {showAlert && (
          <div className="mt-4">
            <Alert
              type="info"
              option="outline"
              title="Deleting this event will automatically cancel all contributions and initiate refunds where applicable."
            />
          </div>
        )}
        <div className="flex mt-12 gap-4">
          <TextButton
            variant="tertiary"
            text="No, Cancel"
            onClick={() => setActive(null)}
          />
          <TextButton variant="red" text="Yes, Delete" />
        </div>
      </div>
    </Modal.Window>
  );
}
