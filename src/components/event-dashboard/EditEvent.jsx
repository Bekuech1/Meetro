import API from "@/lib/axios";
import { useState } from "react";
import When from "../create-event/PopUps/When";
import Where from "../create-event/PopUps/Where";
import { LoadingSpinner } from "../create-event/Private";
import Description from "../create-event/PopUps/Description";
// import { useEffect, useState } from "react";

export default function EditEvent({ eventId }) {
  const eventData = eventId;
  const [loading, setLoading] = useState(false);
  // local editable state
  const [event, setEvent] = useState({
    title: eventData?.title?.S || "",
    description: eventData?.description?.S || "",
    date: eventData?.date?.S || "",
    timeFrom: eventData?.timeFrom?.S || "",
    timeTo: eventData?.timeTo?.S || "",
    location: {
      venue: eventData?.location?.M?.venue?.S || "",
      state: eventData?.location?.M?.state?.S || "",
      country: eventData?.location?.M?.country?.S || "",
      type: eventData?.location?.M?.type?.S || "offline",
    },
    dressCode: eventData?.dressCode?.S || "",
    imageKey: eventData?.imageKey?.S || "",
  });

  const [whenModal, setWhenModal] = useState(false);
  const [whereModal, setWhereModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false);

  const imagePath = eventData?.imageKey?.S
    ? new URL(eventData.imageKey.S, import.meta.env.VITE_IMAGE_URL).toString()
    : "/events-modal.png"; // or some placeholder

  const updateEvent = async () => {
    console.log("event data", event);
    setLoading(true);
    try {
      const response = await API.put(`/events/${eventId}/state`, event);
      console.log("Event updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-[950px] mx-auto flex gap-12">
      <div className="w-[349px] flex flex-col gap-4">
        <div>
          <h4 className="satoshi text-sm font-bold">Event Image</h4>
          <p className="text-[#8A9191] text-xs font-medium">
            Upload a JPEG or PNG file with a size of 2mb or less
          </p>
        </div>

        <img src={imagePath} alt="" className="rounded-3xl h-[349px]" />

        <p className="text-[#7A60BF] bg-[#F3F0FB] rounded-2xl p-2 text-xs font-medium">
          Images with a 1 : 1 ratio (a square) work best
        </p>
      </div>

      <div className="flex flex-col gap-8 w-[553px]">
        {/* input for data */}
        <div className="flex flex-col gap-6">
          {/* toggle for either public or private event */}
          {/* <div>
            <p className="">Shh...it's exclusive! Only those with the magic link can RSVP</p>
          </div> */}

          <div>
            <input
              type="text"
              value={event.title}
              onChange={e =>
                setEvent(prev => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="w-full bg-[#FFFFFE80] border border-white backdrop-blur-2xl paytone p-3 rounded-[12px] text-2xl"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-bold satoshi">Event Details</p>

            {/* input and modal for date and time */}
            <Input
              data={`${event.date}, ${event.timeFrom}`}
              icon={"/timer.svg"}
              onClick={() => setWhenModal(true)}
            />
            <When
              isVisible={whenModal}
              onClose={() => setWhenModal(false)}
              onSave={updatedWhen => {
                setEvent(prev => ({
                  ...prev,
                  date: updatedWhen.startDate,
                  timeFrom: updatedWhen.startTime,
                  timeTo: updatedWhen.endTime,
                }));
              }}
            />

            {/* input and modal for loaction */}
            <Input
              data={`${event.location.venue}, ${event.location.state}, ${event.location.country}`}
              icon={"/location-try.svg"}
              onClick={() => setWhereModal(true)}
            />
            <Where
              isVisible={whereModal}
              onClose={() => setWhereModal(false)}
              onSave={updatedLocation => {
                setEvent(prev => ({
                  ...prev,
                  location: {
                    venue: updatedLocation.venue,
                    state: updatedLocation.state,
                    country: prev.location.country, // keep existing country if not in modal
                    type: updatedLocation.locationType,
                  },
                }));
              }}
            />

            {/* description input */}
            <Input
              placeholder={"Description"}
              data={event.description}
              icon={"/note-text.svg"}
              onClick={() => setDescriptionModal(true)}
            />
            <Description
              isVisible={descriptionModal}
              onClose={() => setDescriptionModal(false)}
              onSave={updatedDescription => {
                setEvent(prev => ({
                  ...prev,
                  description: updatedDescription,
                }));
              }}
            />

            <Input
              placeholder={"Dress Code"}
              data={eventData?.dressCode?.S}
              icon={"/dress.svg"}
            />
          </div>

          <div>
            <div></div>

            <div className="flex flex-col p-2 gap-2 text-[#7A60BF] bg-[#F3F0FB] border border-[#D9D1F1] rounded-2xl">
              <div className="flex justify-between items-center">
                <p className="text-[16px] satoshi font-bold">
                  ✏️ Heads up, Creator!
                </p>
                <p className="text-sm font-bold satoshi">0/2 edits</p>
              </div>

              <p className="font-medium text-sm">
                You can update your event details but not forever 😅 <br />
                To keep things neat for your guests, you can only make up to 3
                major edits (like name, date, or location).
              </p>
            </div>
          </div>
        </div>

        {/* save and preview buttons */}
        <div className="flex gap-4">
          <button
            className="bg-[#E6F2F3] text-[#095256] paytone rounded-[60px] w-full p-3"
            disabled
          >
            View Preview
          </button>

          <button
            className="bg-[#011F0F] rounded-[60px] w-full p-3 text-[#AEFC40] paytone"
            onClick={updateEvent}
          >
            {loading ? <LoadingSpinner /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

const Input = ({ icon, data, placeholder, onClick }) => {
  return (
    <div
      className="w-full bg-[#FFFFFE80] border border-white backdrop-blur-2xl flex items-center gap-2 px-2 py-3 rounded-[12px]"
      onClick={onClick}
    >
      <img src={icon} alt="" className=" bg-white rounded-full p-1" />
      <input
        type="text"
        value={data}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none font-medium text-sm"
      />
    </div>
  );
};
