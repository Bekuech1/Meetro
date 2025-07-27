import React, { useState } from "react";
import API from "@/lib/axios";
import { ModalText } from "../home/EventModal";

const ShareEvent = ({ eventId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const togglePopup = async () => {
    if (!isOpen) {
      try {
        setIsLoading(true);

        // Fetch event details
        const eventResponse = await API.get(`/events/${eventId}`);
        setEventDetails(eventResponse.data);

        // Create share link
        const shareResponse = await API.post(`/shares`, { eventId });
        const { shareId } = shareResponse.data;

        // Construct new share URL
        const shareUrlWithRef = `${window.location.origin}/event/${eventId}?ref=share_${shareId}`;
        setShareUrl(shareUrlWithRef);

        // Update browser URL (without page reload)
        const newPath = `/event/${eventId}?ref=share_${shareId}`;
        window.history.pushState({}, "", newPath);

        console.log("Share URL:", shareUrlWithRef);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to share event");
      } finally {
        setIsLoading(false);
      }
    }

    setIsOpen((prev) => !prev);
  };

  const copyToClipboard = () => {
    // navigator.clipboard.writeText(window.location.href);
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000); // Hide after 2 seconds
  };

  return (
    <div className="satoshi">
      <button onClick={togglePopup}>
        <img
          src="/icons/share-event.svg"
          alt="Share event"
          className="w-7 h-7 md:w-auto md:h-auto"
        />
      </button>

      {isOpen && (
        <div className="w-screen h-screen bg-[#00000080] fixed inset-0 flex items-end md:items-center md:justify-center z-50">
          <div className="w-full md:w-[546px] h-fit relative">
            {/* main shar pop up */}
            {/* <div className="w-full  bg-[#FFFFFFD9]  backdrop-blur-xl shadow-sm shadow-[#028E4B1A]"> */}
            <div className="bg-[#FFFFFFE5] backdrop-blur-xl border border-[#FFFFFE] md:rounded-3xl overflow-clip rounded-[12px] flex flex-col items-center justify-center">
              <div className="md:w-80 pt-9 pb-6 flex flex-col items-center justify-center gap-4">
                <img
                  src={eventDetails?.imageUrl?.S || "/events-modal.png"}
                  alt="Event"
                  className="w-[219px] h-[219px] rounded-xl border-2 border-[#FFFFFF]"
                />

                <div className="flex flex-col items-center gap-2">
                  <h2 className="paytone text-2xl capitalize">{eventDetails?.title?.S}</h2>

                  <div className="flex gap-2">
                    <ModalText
                      img={"/calendar.svg"}
                      text={eventDetails?.date?.S}
                    />
                    <ModalText
                      img={"/timer.svg"}
                      text={eventDetails?.timeFrom?.S}
                    />
                  </div>
                </div>
              </div>

              {/* copy btn below */}
              <div className="flex items-center justify-center w-full bg-[#FFFFFF] h-20">
                {!copied ? (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center gap-1 bg-[#AEFC40] py-2 px-3 rounded-3xl"
                  >
                    <p className="font-bold text-[12px] text-[#011F0F]">
                      Copy Link
                    </p>{" "}
                    <img src="/link.svg" alt="Copy" className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="bg-[#011F0F] text-[#AEFC40] px-3 py-2 flex gap-4 rounded-full items-center justify-center">
                    <p className="">Copied</p>
                    <img src="/tick-circle.svg" alt="" />
                  </div>
                )}

                {/* </div> */}
              </div>
            </div>

            {/* Close Button */}
            <img
              src="/closePopup.svg"
              alt="Close"
              className="h-12 hidden md:block w-12 absolute -top-10 -right-10 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareEvent;
