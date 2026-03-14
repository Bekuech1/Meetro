import Illustration from "@/assets/icons/Illustration";
import TextButton from "../layout-components/Buttons/TextButtons";
import { Link } from "react-router";
import { useState } from "react";
import EventDetailsModal from "../layout-components/EventDetailsModal";

const NoEvents = ({ hasEvents = false, message = null }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Your JSON Event Object
  const eventData = {
    title: "Lagos Tech Meetup 2026",
    date: "May 18, 2026",
    time: "16:30pm",
    dressCode: "Lingerie",
    location: "Yaba, Lagos, Nigeria",
    latitude: 6.5095,
    longitude: 3.3713,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
    description: "An event bringing together Nigerian developers, founders, and designers to discuss emerging technologies and startup innovation. Join us for keynote speeches, networking sessions, and hands-on workshops centered around building scalable tech in Africa."
  };
  return (
    <div className="flex flex-col justify-center flex-1">
      <div className="flex flex-col items-center gap-6 ">
        {!hasEvents && <Illustration />}
        <div className="text-center mx-auto max-w-[456px]">
          <h1 className="paytone font-normal text-[#06727E] text-2xl leading-[17px] mb-4"
            onClick={() => setIsModalOpen(true)}>
            No Events
          </h1>
          <p className="font-medium text-[#8A9191] satoshi">
            {message ||
              "Looks like there's nothing happening right now. Why not be the first to create an event?"}
          </p>
        </div>
        <Link to="/create-event">
          <TextButton text="Create Event" className="h-11! !text-base" />
        </Link>
      </div>
      <EventDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={eventData}
      />
    </div>
  );
};

export default NoEvents;
