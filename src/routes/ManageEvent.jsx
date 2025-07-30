import EditEvent from "@/components/event-dashboard/EditEvent";
import GuestList from "@/components/event-dashboard/GuestList";
import ShareEvent from "@/components/event-dashboard/ShareEvent";
import API from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// this is the page for added mangement feature to each Events
export default function ManageEventPage() {
  const { eventId } = useParams();
  console.log(useParams());
  const [eventData, setEventData] = useState(null);

  const [activeTab, setActiveTab] = useState("guests");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await API.get(`/events/${eventId}`);
        const event = response.data;
        setEventData(event);
        console.log("evet data:", event);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEvent();
  }, [eventId]);

  return (
    <>
      <section className="bg-white  ">
        <div className="md:w-[950px] mx-auto flex flex-col p-4 gap-4 md:pt-10 md:px-20 md:pb-6 md:gap-2">
          <div className="flex items-center justify-between ">
            <img
              src="/arrow-left.svg"
              alt=""
              onClick={() => window.history.back()}
              className="cursor-pointer"
            />

            <div className="flex gap-4 md:hidden">
              <div className="h-7 w-7 pt-1 flex items-center justify-center bg-[#F0F0F0] rounded-full cursor-pointer">
                <ShareEvent eventId={eventId} />
              </div>

              <img
                src="/delete.svg"
                alt="delete-icon"
                className="w-7 h-7 md:w-auto md:h-auto"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col gap-2 ">
              <h2 className="text-[#001010] capitalize text-2xl paytone">
                {eventData?.title?.S}
              </h2>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <img src="/location.svg" alt="" />
                  <p className="text-sm font-medium text-[#8A9191] capitalize">
                    {eventData?.location?.M?.venue?.S},{" "}
                    {eventData?.location?.M?.state?.S},{" "}
                    {eventData?.location?.M?.country?.S}{" "}
                  </p>
                </div>
                <div className="flex items-center">
                  <img src="/timer.svg" alt="" />
                  <p className="text-sm font-medium text-[#8A9191] capitalize">
                    {eventData?.timeFrom?.S}
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex gap-4 items-center ">
              <div className="h-10 w-10 p-2 pt-4 flex items-center justify-center bg-[#F0F0F0] rounded-full cursor-pointer">
                <ShareEvent eventId={eventId} />
              </div>

              <img
                src="/delete.svg"
                alt="delete-icon"
                className="w-7 h-7 md:w-auto md:h-auto"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            {/* tab toggle */}
            <div className="flex bg-[#FFFFFEFC] w-full md:w-auto border border-[#E6F2F3] md:border-none md:backdrop-blur-[32px] md:shadow-[0px_4px_24px_0px_#00000014] gap-2 rounded-[20px] p-0.5">
              <button
                className={`${
                  activeTab === "eventDetails"
                    ? "bg-[#AEFC40]"
                    : "bg-[#FFFFFEFC]"
                } text-[#010E1F] py-1 px-2 rounded-3xl text-xs font-bold satoshi w-full md:w-auto`}
                onClick={() => handleTabChange("eventDetails")}
              >
                Event Details
              </button>
              <button
                className={`${
                  activeTab === "guests" ? "bg-[#AEFC40] " : "bg-[#FFFFFEFC] "
                } text-[#010E1F] py-1 px-2 rounded-3xl text-xs font-bold satoshi w-full md:w-auto`}
                onClick={() => handleTabChange("guests")}
              >
                Guests
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-[642px] px-4 pb-10 pt-6 bg-[#F0F0F0]">
        {activeTab === "eventDetails" && <EditEvent />}
        {activeTab === "guests" && (
          <GuestList guests={eventData?.attendees?.L || []} />
        )}
      </section>
    </>
  );
}
