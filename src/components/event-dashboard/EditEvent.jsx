import API from "@/lib/axios";
// import { useEffect, useState } from "react";

export default function EditEvent({ eventId }) {
  // const [eventData, setEventData] = useState(null);
  const eventData = eventId;
  console.log(eventId);

  const imagePath = eventData?.imageKey?.S
    ? new URL(eventData.imageKey.S, import.meta.env.VITE_IMAGE_URL).toString()
    : "/events-modal.png"; // or some placeholder

  // const updateEvent = async (updatedData) => {
  //   try {
  //     const response = await API.put(`/events/${eventId}/state`, updatedData);
  //     console.log("Event updated successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error updating event:", error);
  //   }
  // };

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
              value={eventData?.title?.S}
              className="w-full bg-[#FFFFFE80] border border-white backdrop-blur-2xl paytone p-3 rounded-[12px] text-2xl"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-bold satoshi">Event Details</p>

            <Input
              data={`${eventData?.date?.S}, ${eventData?.timeFrom?.S}`}
              icon={"/timer.svg"}
            />

            <Input
              data={`${eventData?.location?.M?.venue?.S}, ${eventData?.location?.M?.state?.S}, ${eventData?.location?.M?.country?.S}`}
              icon={"/location-try.svg"}
            />

            <Input placeholder={"Description"} data={eventData?.description?.S} icon={"/note-text.svg"} />
            
            <Input placeholder={"Dress Code"} data={eventData?.dressCode?.S} icon={"/dress.svg"}/>
          </div>

          <div>
            <div></div>

            <div className="flex flex-col p-2 gap-2 text-[#7A60BF] bg-[#F3F0FB] border border-[#D9D1F1] rounded-2xl">
              <div className="flex justify-between items-center">
                <p className="text-[16px] satoshi font-bold">
                  ✏️ Heads up, Creator!
                </p>
                <p className="text-sm font-bold satoshi">0/3 edits</p>
              </div>

              <p className="font-medium text-sm">
                You can update your event details but not forever 😅 <br />
                To keep things neat for your guests, you can only make up to 3 major
                edits (like name, date, or location).
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

          <button className="bg-[#011F0F] rounded-[60px] w-full p-3 text-[#AEFC40] paytone">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

const Input = ({ icon, data, placeholder }) => {
  return (
    <div className="w-full bg-[#FFFFFE80] border border-white backdrop-blur-2xl flex items-center gap-2 px-2 py-3 rounded-[12px]">
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
