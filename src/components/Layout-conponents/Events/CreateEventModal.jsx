import { Calendar1 } from "iconsax-reactjs";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import React from "react";
import IconButton from "../Buttons/IconButton";
import Modal from "../Modal/Modal";
import TextButton from "../Buttons/TextButtons";
import Alert from "../Alert";
import LoadingSpinner from "../LoadingSpinner";

// Example event
const event = {
  img: "/events-modal.png",
  name: "Lorem ipsum dolor sit amet consectetur",
  date: new Date("2025-03-01T16:30:00"),
  time: "16:30pm",
};

export default function CreateEventModal() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    function createEvent() {
      setLoading(true);
      setTimeout(() => {
        setStatus("success");
        setLoading(false);
      }, 5000);
    }
    createEvent();
  }, []);

  return (
    <Modal.Window showIcon={false} name="create-event">
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
            {loading ? (
              <Alert
                type="info"
                customIcon={<LoadingSpinner borderColor="border-[#7A60BF]" />}
                title="Creating Event"
                option="outline"
              />
            ) : (
              <React.Fragment>
                {status === "success" ? (
                  <Alert
                    type="success"
                    option="outline"
                    title="Event has been created successfully"
                  />
                ) : (
                  <Alert
                    type="error"
                    option="outline"
                    title="Failed to create event"
                    subtitle="The event failed to create for this reason, please try again"
                  />
                )}
              </React.Fragment>
            )}
          </div>
        </div>
        {!loading && (
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <TextButton
              text="Back to Home"
              variant={`${status === "success" ? "tertiary" : "primary"}`}
            />
            {status === "success" && <TextButton text="Share Event" />}
          </div>
        )}
      </div>
    </Modal.Window>
  );
}
