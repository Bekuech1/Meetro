import { format } from "date-fns";
import { Calendar1 } from "iconsax-reactjs";
import React from "react";
import Alert from "../Alert";
import IconButton from "../Buttons/IconButton";
import TextButton from "../Buttons/TextButtons";
import LoadingSpinner from "../LoadingSpinner";
import Modal from "../Modal/Modal";
import { useModalContext } from "../Modal/ModalContext";
import { useNavigate } from "react-router";

  export default function CreateEventModal({event, loading, status, error, resetForm}) {
  const {close} = useModalContext();  
  const navigate = useNavigate();
  const handleBackToHome = () => {
    close();
    navigate("/home");
  } 
  return (
    <Modal.Window showIcon={false} name="create-event" onClose={() => {
      resetForm();
    }}>
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
                icon={<Calendar1 size={24} variant="Bold" color="#866AD2" />}
              />{
                event.startDate && (
                  <React.Fragment>
                    <p className="text-base">
                      {format(event.startDate, "EEEE, MMMM d, yyyy")}
                    </p>
                    <span className="text-[#8A9191]">{format(event.startDate, "h:mm aa")}</span>
                  </React.Fragment>
                )
              }
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
                    subtitle={error}
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
              onClick={handleBackToHome}
            />
            {status === "success" && <TextButton text="Share Event"  />}
          </div>
        )}
      </div>
    </Modal.Window>
  );
}
