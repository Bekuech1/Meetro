import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SiteBtn from "../Layout-conponents/SiteBtn";
import EventModal from "./EventModal";
import useEventStore from "@/stores/eventStore";

const NormalHome = () => {
  const navigate = useNavigate();
  const { fetchEvents, shouldRefetch } = useEventStore();

  const [groupedEvents, setGroupedEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const groupEventsByDate = (eventsArray) => {
    const grouped = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const event of eventsArray) {
      const rawDate = event.date;
      if (!rawDate || typeof rawDate !== "string") continue;

      // Remove weekday: "Tuesday, August 5, 2025" → "August 5, 2025"
      const cleanedDateStr = rawDate.replace(/^.*?,\s*/, "");
      const parsed = new Date(cleanedDateStr);
      if (isNaN(parsed)) continue;

      parsed.setHours(0, 0, 0, 0); // Remove time component

      if (parsed < today) continue;

      // Format date key using local time (not UTC)
      const yyyy = parsed.getFullYear();
      const mm = String(parsed.getMonth() + 1).padStart(2, "0");
      const dd = String(parsed.getDate()).padStart(2, "0");
      const key = `${yyyy}-${mm}-${dd}`; // e.g., 2025-08-04

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(event);
    }

    const sortedGrouped = Object.keys(grouped)
      .sort((a, b) => new Date(a) - new Date(b))
      .reduce((acc, date) => {
        acc[date] = grouped[date];
        return acc;
      }, {});

    return sortedGrouped;
  };

  useEffect(() => {
    fetchEvents().then((res) => {
      if (res) {
        console.log("Fetched events details:", res);
        const grouped = groupEventsByDate(res);
        setGroupedEvents(grouped);
      }
    });
  }, [shouldRefetch]);

  const openModal = (id) => {
    setSelectedEventId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEventId(null);
  };

  // const homeBtn = [
  //   {
  //     text: "all events",
  //     image: "/home-arrow-down.svg",
  //     onClick: () => navigate("/home"),
  //   },
  // {
  //   text: "march, 2025",
  //   image: "/home-arrow-down.svg",
  //   onClick: () => navigate("/home"),
  //   style: "md:flex hidden",
  // },
  // ];

  return (
    <main className="bg-[#F0F0F0] relative min-h-[90vh] w-full grid gap-[43px] md:px-20 px-4 py-10">
      <div className="grid md:w-[680px] w-full h-fit mx-auto gap-6 z-10">
        <section className="flex h-fit">
          <h1 className="paytone capitalize text-[#055962] sm:text-[30px] text-[20px] font-[400]">
            my events
          </h1>
          {/* <div className="flex gap-4">
            {homeBtn.map((item, index) => (
              <EventsBtn
                key={index}
                onClick={item.onClick}
                image={item.image}
                text={item.text}
                style={item.style}
              />
            ))}
          </div> */}
        </section>

        {/* No events message */}
        {Object.keys(groupedEvents).length === 0 && (
          <section className="text-center mt-10 text-[#8A9191] text-sm font-semibold">
            <p className="mb-4">
              You have no upcoming events. All your events are in the past.
            </p>
            <SiteBtn
              name="Create a new event"
              colorPadding="bg-[#AEFC40] py-2 px-6 mt-4"
              onclick={() => navigate("/create-event")}
            />
          </section>
        )}

        {/* Events by grouped date */}
        {Object.entries(groupedEvents).map(([date, events]) => (
          <div key={date} className="grid gap-4">
            <div>
              <h5 className="satoshi capitalize text-black text-[16px] font-[900]">
                {new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </h5>
              <p className="satoshi text-[#8A9191] text-[14px] font-[700]">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </p>
            </div>

            {events.map((event) => (
              <section
                key={event.id}
                className="bg-[#FCFEF9]/50 backdrop-blur-[40px] rounded-[16px] p-3 flex gap-[10px] border border-white cursor-pointer"
                onClick={() => openModal(event.id)}
              >
                <div className="shrink-0 w-[70px] h-[64px] md:w-[114px] md:h-[104px]">
                  <img
                    src={
                      event?.imageUrl?.S
                        ? `${import.meta.env.VITE_IMAGE_URL}/${event.imageUrl.S}`
                        : "/events-img.png"
                    }
                    alt="event-img"
                    className="w-full h-full object-cover rounded-[8px]"
                  />
                </div>

                <ul className="w-full grid sm:gap-[2px] gap-[2px] satoshi">
                  <li className="flex justify-between">
                    <h4 className="capitalize satoshi text-[#001010] text-base font-medium leading-tight">
                      {event.title}
                    </h4>
                    <h6 className="satoshi text-[#8A9191] sm:hidden text-[10px]">
                      {timeAgo(event?.createdAt)}
                    </h6>
                  </li>

                  {/* Host */}
                  <li className="flex gap-1 items-center">
                    <h6 className="text-[#8A9191] text-xs font-bold capitalize satoshi">
                      host
                    </h6>
                    <img
                      src="/tiny-profile.png"
                      className="w-4 h-4 rounded-full"
                    />
                    <h6 className="text-black text-xs font-medium capitalize">
                      {event.creator?.firstName}
                    </h6>
                  </li>

                  {/* Time */}
                  <li className="flex gap-1 items-center">
                    <img src="/event-timer.svg" className="w-4 h-4" />
                    <h6 className="text-[#8A9191] text-xs font-medium">
                      {event.timeFrom}
                    </h6>
                  </li>

                  {/* Location */}
                  <li className="flex gap-1 items-center">
                    <img src="/event-location.svg" className="w-4 h-4" />
                    <h6 className="text-[#8A9191] text-xs font-medium capitalize">
                      {`${event?.location?.venue?.S}, ${event?.location?.state?.S}`}
                    </h6>
                  </li>

                  {/* Going */}
                  <li className="flex gap-1 items-center">
                    <h6 className="text-[#8A9191] text-xs font-bold capitalize satoshi">
                      going
                    </h6>
                    <img
                      src="/tiny-profile.png"
                      className="w-4 h-4 rounded-full"
                    />
                    <h6 className="text-black text-xs font-medium">
                      {formatAttendeesDisplay(event.attendees)}
                    </h6>
                  </li>

                  {/* Manage Btn Mobile */}
                  <li className="sm:hidden">
                    <SiteBtn
                      name="manage"
                      colorPadding="bg-[#AEFC40] py-2 px-4 w-full mt-[2px]"
                      onclick={() => navigate(`/event/${event.id}`)}
                    />
                  </li>
                </ul>

                <section className="sm:flex hidden flex-col justify-between text-end h-[100px]">
                  <h6 className="text-[#8A9191] text-[12px] font-[500]">
                    {timeAgo(event?.createdAt)}
                  </h6>
                  <SiteBtn
                    name="manage"
                    colorPadding="bg-[#AEFC40] py-[4px] px-[16px]"
                    onclick={() => navigate(`/event/${event.id}`)}
                  />
                </section>
              </section>
            ))}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <EventModal eventId={selectedEventId} closeModal={closeModal} />
      )}
    </main>
  );
};

export default NormalHome;

// helper function to format attendees display
const formatAttendeesDisplay = (attendees = []) => {
  // Step 1: Filter only "yes"
  const yesAttendees = attendees.filter((a) => a.response === "yes");

  // Step 2: Deduplicate by userId
  const uniqueYes = Array.from(
    new Map(yesAttendees.map((a) => [a.userId, a])).values()
  );

  // Step 3: Get first names
  const firstNames = uniqueYes.map((a) => a.name.split(" ")[0]);

  if (firstNames.length === 0) return "no one going yet";

  const displayNames = firstNames.slice(0, 2).join(", ");
  const extraCount = firstNames.length - 2;

  return extraCount > 0 ? `${displayNames} +${extraCount}` : displayNames;
};

function timeAgo(createdAt) {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now - created; // difference in ms
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 5) return `${diffWeeks}w ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${diffYears}y ago`;
}
