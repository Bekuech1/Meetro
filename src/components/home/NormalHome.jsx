import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventsBtn from "./EventsBtn";
import SiteBtn from "../Layout-conponents/SiteBtn";
import EventModal from "./EventModal";
import useEventStore from "@/stores/eventStore";

const NormalHome = () => {
  const navigate = useNavigate();
  const { events: groupedEvents, fetchEvents } = useEventStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const openModal = (eventId) => {
    setSelectedEventId(eventId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEventId(null);
    setIsModalOpen(false);
  };

  const homeBtn = [
    {
      text: "all events",
      image: "/home-arrow-down.svg",
      onClick: () => navigate("/home"),
    },
    {
      text: "march, 2025",
      image: "/home-arrow-down.svg",
      onClick: () => navigate("/home"),
      style: "md:flex hidden",
    },
  ];

  // const safeToTime = (value) => {
  //   const date = new Date(value);
  //   return isNaN(date)
  //     ? "Invalid time"
  //     : date.toLocaleTimeString("en-US", {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       });
  // };

  // imageUrl is defined in your environment variables
  // and event.imageKey is a valid S3 key
  // const imageUrl = import.meta.env.VITE_IMAGE_URL;
  // const imagePath = `${imageUrl.replace(
  //   /\/$/,
  //   ""
  // )}/${event?.imageKey?.S?.replace(/^\//, "")}`;

  return (
    <main className="bg-[#F0F0F0] relative min-h-[90vh] w-full grid gap-[43px] md:px-20 px-4 py-10">
      <div className="grid md:w-[680px] w-full mx-auto gap-6 z-10">
        <section className="flex justify-between items-center">
          <h1 className="paytone capitalize text-[#055962] sm:text-[30px] text-[20px] font-[400]">
            my events
          </h1>
          <div className="flex gap-4">
            {homeBtn.map((item, index) => (
              <EventsBtn
                key={index}
                onClick={item.onClick}
                image={item.image}
                text={item.text}
                style={item.style}
              />
            ))}
          </div>
        </section>

        {Object.entries(groupedEvents)
          .sort((a, b) => new Date(b[0]) - new Date(a[0]))
          .map(([date, events]) => (
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
                    <li className="flex justify-between text-black text-[14px] sm:text-[16px] font-[700] sm:font-[500]">
                      <h4 className="capitalize">{event.title}</h4>
                      <h6 className="satoshi text-[#8A9191] sm:hidden text-[10px]">
                        {event.relativeTime || "12 h"}
                      </h6>
                    </li>

                    <li className="flex gap-1 items-center">
                      <h6 className="text-[#8A9191] font-[700] text-[10px]">
                        host
                      </h6>
                      <img
                        src="/tiny-profile.png"
                        alt=""
                        className="w-4 h-4 rounded-full"
                      />
                      <h6 className="text-black font-[500] text-[10px]">
                        {event.creator?.firstName || "unknown"}
                      </h6>
                    </li>

                    <li className="flex gap-1 items-center">
                      <img
                        src="/event-location.svg"
                        alt=""
                        className="w-4 h-4"
                      />
                      <h6 className="text-[#8A9191] font-[700] text-[10px]">
                        {event.location}
                      </h6>
                    </li>

                    <li className="flex gap-1 items-center">
                      <img src="/event-timer.svg" alt="" className="w-4 h-4" />
                      <h6 className="text-[#8A9191] font-[700] text-[10px]">
                        {event.timeFrom}
                        {/* {safeToTime(event.date)} */}
                        {/* {event.endDate && ` - ${safeToTime(event.endDate)}`} */}
                      </h6>
                    </li>

                    <li className="flex gap-1 items-center">
                      <h6 className="text-[#8A9191] font-[700] text-[10px]">
                        going
                      </h6>
                      <img
                        src="/tiny-profile.png"
                        alt=""
                        className="w-4 h-4 rounded-full"
                      />
                      <h6 className="text-black font-[500] text-[10px]">
                        {event.going || "no one yet"}
                      </h6>
                    </li>

                    <li className="sm:hidden">
                      <SiteBtn
                        name="manage"
                        colorPadding="bg-[#AEFC40] py-[4px] px-[16px] w-full"
                        onclick={() => navigate(`/event/${event.id}`)}
                      />
                    </li>
                  </ul>

                  <section className="sm:flex hidden flex-col justify-between text-end h-[100px]">
                    <h6 className="text-[#8A9191] text-[12px] font-[500]"></h6>
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

      {/* Gradient background blur ellipses */}
      <div className="absolute flex justify-between items-center w-full -top-[250px]">
        <div className="size-[345px] bg-[#AEFC40] rounded-full opacity-80 blur-[250px]"></div>
        <div className="size-[345px] bg-[#866AD2] rounded-full blur-[250px] opacity-80 mt-[100px]"></div>
        <div className="size-[345px] bg-[#077D8A] rounded-full blur-[250px] opacity-80"></div>
      </div>
    </main>
  );
};

export default NormalHome;
