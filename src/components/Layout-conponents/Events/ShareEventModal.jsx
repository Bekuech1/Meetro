import { Calendar1, Copy, Send2 } from "iconsax-reactjs";
import { format } from "date-fns";
import IconButton from "../Buttons/IconButton";
import Modal from "../Modal/Modal";
import TextButton from "../Buttons/TextButtons";

// Example event
const event = {
  img: "/events-modal.png",
  name: "Lorem ipsum dolor sit amet consectetur",
  date: new Date("2025-03-01T16:30:00"),
  time: "16:30pm",
};

export default function ShareEventModal() {
  return (
    <Modal.Window showIcon={false} name="share-event">
      <div className="flex flex-col gap-y-12 satoshi font-medium text-[#001010]">
        <div className="flex flex-col gap-y-4">
          <div className="size-[154px] rounded-[24px] overflow-hidden">
            <img className="size-full object-cover block" src={event.img} />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="paytone font-normal text-[24px] leading-[32px]">
              Lorem ipsum dolor sit amet consectetur.
            </h2>
            <div className="flex gap-2 items-center flex-wrap">
              <IconButton
                variant="tertiary"
                icon={<Calendar1 size={24} variant="Bold" color="#866AD2" />}
              />
              <p className="text-base">
                {format(event.date, "EEEE, MMMM d, yyyy")}
              </p>
              <span className="text-[#8A9191]">{event.time}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-x-4">
          <TextButton
            text="Share Event"
            variant="tertiary"
            rightImg={<Send2 size={16} variant="Bold" />}
          />
          <TextButton
            text="Copy Link"
            variant="tertiary"
            rightImg={<Copy size={16} variant="Bold" />}
          />
        </div>
      </div>
    </Modal.Window>
  );
}
