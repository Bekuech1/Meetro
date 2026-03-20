import IconButton from "../layout-components/Buttons/IconButton";
import TextButton from "../layout-components/Buttons/TextButtons";
import Modal from "../layout-components/Modal/Modal";
import { Calendar1, Copy, Send2, TickCircle } from "iconsax-reactjs";
import { format } from "date-fns";
import { useState } from "react";

export default function ShareEventModal({ event }) {
  const [copied, setCopied] = useState(false);
  const eventUrl = `${window.location.origin}/events/${event.slug}`;
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Check out this event: ${event.title}`,
          url: eventUrl,
        });
      } catch (err) {
        // Optionally handle share error
        console.error("Error sharing:", err);
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // Optionally handle copy error
      console.error("Error copying to clipboard:", err);
    }
  };
  return (
    <Modal.Window showIcon={false} name="share-event">
      <div className="flex flex-col gap-y-12 satoshi font-medium text-[#001010]">
        <div className="flex flex-col gap-y-4">
          <div className="size-[154px] rounded-[24px] overflow-hidden">
            <img className="size-full object-cover block" src={event.image} />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="paytone font-normal text-[24px] leading-[32px]">
              {event.title}
            </h2>
            <div className="flex gap-2 items-center flex-wrap">
              <IconButton
                variant="tertiary"
                className="pointer-events-none"
                icon={<Calendar1 size={24} variant="Bold" color="#866AD2" />}
              />
              <p className="text-base">
                {format(event.startDate, "EEEE, MMMM d, yyyy")}
              </p>
              <span className="text-[#8A9191]">
                {format(event.startDate, "h:mm a")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-x-4">
          <TextButton
            text="Share Event"
            variant="tertiary"
            rightImg={<Send2 size={16} variant="Bold" />}
            onClick={handleShare}
          />
          <TextButton
            text={copied ? "Copied" : "Copy Link"}
            variant="tertiary"
            rightImg={
              copied ? (
                <TickCircle size={16} variant="Bold" />
              ) : (
                <Copy size={16} variant="Bold" />
              )
            }
            onClick={handleCopy}
          />
        </div>
      </div>
    </Modal.Window>
  );
}
