import React, { useState } from "react";
import axios from "axios";

const ShareEvent = ({ eventId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shareUrl, setShareUrl] = useState("");

  const togglePopup = async () => {
    if (!isOpen) {
      try {
        setIsLoading(true);
        // Fetch event details
        const eventResponse = await axios.get(
          `https://ujc35n5wgi.execute-api.eu-north-1.amazonaws.com/dev/events/${eventId}`
        );
        setEventDetails(eventResponse.data);
        
        // Create share link
        const shareResponse = await axios.post(
          `https://ujc35n5wgi.execute-api.eu-north-1.amazonaws.com/dev/shares`,
          { eventId }
        );
        setShareUrl(shareResponse.data.shareUrl);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to share event");
      } finally {
        setIsLoading(false);
      }
    }
    setIsOpen(!isOpen);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
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
        <div className="w-screen h-screen bg-[#00000080] fixed inset-0 flex items-end md:items-start md:justify-center z-50">
          <div className="w-full md:w-[432px] h-fit flex gap-2">
            <div className="w-full md:w-[432px] md:mt-40 md:rounded-3xl overflow-clip">
              <div className="flex items-center justify-between bg-white py-3 px-4 rounded-t-3xl shadow-sm shadow-[#028E4B1A] : 0px 4px 24px 0px #028E4B1A">
                <p className="font-bold text-sm text-[#010E1F]">
                  Send out invite
                </p>

                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 text-sm text-gray-500 hover:text-gray-700 md:hidden"
                >
                  <img src="/close-circle.svg" alt="Close" />
                </button>
              </div>

              <div className="py-6 px-4 bg-[#FFFFFFD9] backdrop-blur-xl shadow-sm shadow-[#028E4B1A]">
                {isLoading ? (
                  <div className="flex justify-center items-center py-10">
                    <p>Loading event details...</p>
                  </div>
                ) : error ? (
                  <div className="text-red-500 text-center py-4">{error}</div>
                ) : (
                  <div className="bg-[#FFFFFE80] backdrop-blur-xl border border-[#FFFFFE] rounded-[12px] p-2 flex gap-2 items-center">
                    <div>
                      <img
                        src={eventDetails?.imageUrl?.S || "/events-img.png"}
                        alt="Event"
                        className="w-[41.8px] h-[38px] rounded-xl"
                      />
                    </div>

                    <div className="flex items-center justify-between w-full">
                      <div>
                        <p className="font-bold text-sm">
                          {eventDetails?.title?.S || "Event"}
                        </p>
                        <p>
                          {eventDetails?.date?.S
                            ? new Date(eventDetails.date.S).toLocaleString()
                            : "Date not specified"}
                        </p>
                      </div>

                      <button
                        onClick={copyToClipboard}
                        className="flex items-center justify-center gap-1 bg-[#AEFC40] py-2 px-3 rounded-3xl"
                      >
                        <p className="font-bold text-[12px] text-[#011F0F]">
                          Copy Link
                        </p>{" "}
                        <img src="/link.svg" alt="Copy" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Close Button */}
            <img
              src="/closePopup.svg"
              alt="Close"
              className="h-12 hidden md:block w-12 relative top-36 right-2 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareEvent;