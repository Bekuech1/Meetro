import DownloadEvent from "@/components/event-dashboard/DownloadEvent";
import Eventdetails from "@/components/event-dashboard/Eventdetails";
import EventInfo from "@/components/event-dashboard/EventInfo";
import ShareEvent from "@/components/event-dashboard/ShareEvent";
import React from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { eventId } = useParams();

  return (
    <div className="bg-[#F0F0F0] relative">
      {/* background ellipses */}
      <div className="absolute flex justify-between items-center w-full h-fit -top-[250px] bg-transparent">
        {/* <!-- Left Ellipse --> */}
        <div className="size-[345px] bg-[#AEFC40] rounded-full opacity-80 blur-[250px]"></div>

        {/* <!-- Middle Ellipse --> */}
        <div className="size-[345px] bg-[#866AD2] rounded-full blur-[250px] opacity-80 mt-[100px]"></div>

        {/* <!-- Right Ellipse --> */}
        <div className="size-[345px] bg-[#077D8A] rounded-full blur-[250px] opacity-80"></div>
      </div>

      <div className="relative z-10 w-full lg:w-[950px] md:min-h-[700px] p-4 pb-12 mx-auto">
        {/* back button */}
        <div className="flex justify-between items-center gap-2">
          <button onClick={() => window.history.back()}>
            <img src="/arrow-left.svg" alt="" />
          </button>

          <div className="flex gap-2 md:hidden">
            <div className="h-7 w-7 flex items-center justify-center bg-white rounded-full cursor-pointer">
              <ShareEvent eventId={eventId} />
            </div>
            {/* <DownloadEvent /> */}
          </div>
        </div>

        {/* event details is coming from this info component */}
        <div>
          <EventInfo eventId={eventId} />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
