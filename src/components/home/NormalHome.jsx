import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SiteBtn from "../Layout-conponents/SiteBtn";
import EventModal from "./EventModal";
import useEventStore from "@/stores/eventStore";

const NormalHome = () => {
  const navigate = useNavigate();
  const { fetchEvents } = useEventStore();

  const [groupedEvents, setGroupedEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    fetchEvents().then((res) => {
      if (res) {
        const grouped = groupEventsByDate(res);
        setGroupedEvents(grouped);
      }
    });
  }, []);

  const openModal = (id) => {
    setSelectedEventId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEventId(null);
  };

  const homeBtn = [
    {
      text: "all events",
      image: "/home-arrow-down.svg",
      onClick: () => navigate("/home"),
    },
    // {
    //   text: "march, 2025",
    //   image: "/home-arrow-down.svg",
    //   onClick: () => navigate("/home"),
    //   style: "md:flex hidden",
    // },
  ];

  const groupEventsByDate = (eventsArray) => {
    const grouped = {};

    eventsArray.forEach((event) => {
      const rawDate = event.date;
      if (!rawDate || typeof rawDate !== "string") return;

      const parsed = new Date(rawDate);
      if (isNaN(parsed)) return;

      const yyyy = parsed.getFullYear();
      const mm = String(parsed.getMonth() + 1).padStart(2, "0");
      const dd = String(parsed.getDate()).padStart(2, "0");
      const key = `${yyyy}-${mm}-${dd}`; // example: 2025-07-14

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(event);
    });

    return grouped;
  };


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
                onClick={() => openModal(event.id)}>
                <img
                  src={event?.imageKey || "/events-img.png"}
                  alt="event-img"
                  className="rounded-[8px] sm:w-[114px] sm:h-[104px] w-[70px] h-[64px]"
                />

                <ul className="w-full grid sm:gap-1 gap-2">
                  <li className="flex justify-between">
                    <h4 className="capitalize">{event.title}</h4>
                    <h6 className="satoshi text-[#8A9191] sm:hidden text-[10px]">
                      {event.relativeTime || "12 h"}
                    </h6>
                  </li>

                  {/* Host */}
                  <li className="flex gap-1 items-center">
                    <h6 className="text-[#8A9191] text-[10px] font-[700]">
                      host
                    </h6>
                    <img
                      src="/tiny-profile.png"
                      className="w-4 h-4 rounded-full"
                    />
                    <h6 className="text-black text-[10px] font-[500]">
                      {event.creator?.firstName || "unknown"}
                    </h6>
                  </li>

                  {/* Time */}
                  <li className="flex gap-1 items-center">
                    <img src="/event-timer.svg" className="w-4 h-4" />
                    <h6 className="text-[#8A9191] text-[10px] font-[700]">
                      {event.timeFrom}
                    </h6>
                  </li>

                  {/* Location */}
                  <li className="flex gap-1 items-center">
                    <img src="/event-location.svg" className="w-4 h-4" />
                    <h6 className="text-[#8A9191] text-[10px] font-[700]">
                      {event.location}
                    </h6>
                  </li>

                  {/* Going */}
                  <li className="flex gap-1 items-center">
                    <h6 className="text-[#8A9191] text-[10px] font-[700]">
                      going
                    </h6>
                    <img
                      src="/tiny-profile.png"
                      className="w-4 h-4 rounded-full"
                    />
                    <h6 className="text-black text-[10px] font-[500]">
                      {event.going || "no one yet"}
                    </h6>
                  </li>

                  {/* Manage Btn Mobile */}
                  <li className="sm:hidden">
                    <SiteBtn
                      name="manage"
                      colorPadding="bg-[#AEFC40] py-[4px] px-[16px] w-full"
                      onclick={() => navigate(`/event/${event.id}`)}
                    />
                  </li>
                </ul>

                  <section className="sm:flex hidden flex-col justify-between text-end h-[100px]">
                    <h6 className="text-[#8A9191] text-[12px] font-[500]">12hr</h6>
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
