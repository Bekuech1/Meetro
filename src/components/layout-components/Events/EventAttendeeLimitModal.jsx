
import IconButton from "../Buttons/IconButton";
import TagButton from "../Buttons/TagButton";
import TextButton from "../Buttons/TextButtons";
import Modal from "../Modal/Modal";
import { AddCircle, MinusCirlce } from "iconsax-reactjs";
import { useEffect, useState } from "react";
import { useModalContext } from "../Modal/ModalContext";

function EventAttendeeLimitModal({onSave, attendeeLimitData}) {
    const {close} = useModalContext();
    const [attendeeLimit, setAttendeeLimit] = useState(attendeeLimitData || 10);
    // Reset data
    const resetData = () => {
        setAttendeeLimit(attendeeLimitData || 10);
    }
    // Handle save
    const handleSave = () => {
            onSave(attendeeLimit);
            close();
    }

    // Update attendee limit when the modal is opened
    useEffect(() => {
        if(attendeeLimitData){
            setAttendeeLimit(attendeeLimitData);
        }
    }, [attendeeLimitData]);

  return (
           <Modal.Window
      name="event-attendee-limit"
      title="Attendee Limit"
      onClose={resetData}
    >
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
            {/* Attendee limit counter */}
            <div className="flex items-center justify-center gap-2">
                <IconButton icon={<MinusCirlce variant="Bold" size={24} />} variant="tertiary" onClick={() => setAttendeeLimit(attendeeLimit > 1 ? attendeeLimit - 1 : 1)} className="size-11 sm:size-11" />
                <TagButton text={attendeeLimit} className="pointer-events-none h-11 satoshi min-w-[86px]" />
                <IconButton icon={<AddCircle variant="Bold" size={24} />} variant="tertiary" onClick={() => setAttendeeLimit(attendeeLimit + 1)} className="size-11 sm:size-11" />
            </div>
            {/* Save buttons */}
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

export default EventAttendeeLimitModal